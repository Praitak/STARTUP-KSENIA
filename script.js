document.addEventListener("DOMContentLoaded", function () {
  // Регистрация формы купона
  document
    .getElementById("registration-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      var email = document.getElementById("email").value;
      var name = document.getElementById("name").value;
      if (email !== "" && name !== "") {
        document.getElementById("coupon-status").textContent =
          "Promocja: 15% zniżki";
      } else {
        document.getElementById("coupon-status").textContent =
          "Promocja: Nie aktywowana";
      }
    });

  // Коды для работы корзины
  const products = document.querySelectorAll(".product");
  const cartItems = document.querySelector(".cart-items");
  const totalPrice = document.getElementById("total-price");
  const clearCartBtn = document.querySelector(".clear-cart");
  const buyBtn = document.querySelector(".buy-btn");
  const checkoutModal = document.getElementById("checkout-modal");
  const checkoutList = document.getElementById("checkout-list");
  const confirmPurchaseBtn = document.getElementById("confirm-purchase");

  let total = 0;
  let itemCount = 0; // Добавляем переменную для отслеживания количества продуктов в корзине
  const cart = [];

  const toggleButtons = document.querySelectorAll(".toggle-section");

  toggleButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const section = button.closest(".section");
      const productsInSection = section.querySelectorAll(".product");
      productsInSection.forEach(function (product) {
        product.classList.toggle("hidden"); // Переключаем класс hidden для каждого товара
      });
      button.textContent =
        button.textContent === "Pokazać" ? "Ukryć" : "Pokazać"; // Изменяем текст кнопки
    });
  });

  // Custom Hot Dog section
  const addCustomHotdogBtn = document.querySelector(".add-custom-hotdog");
  addCustomHotdogBtn.addEventListener("click", function () {
    if (itemCount < 8) {
      const sausage = document.getElementById("sausage").value;
      const sauce = document.getElementById("sauce").value;

      if (sausage && sauce) {
        const customHotdogPrice = 8.0;
        total += customHotdogPrice;
        totalPrice.textContent = total.toFixed(2) + " zł";
        cart.push({
          name: "Hot Dog (" + sausage + " + " + sauce + ")",
          price: customHotdogPrice,
        });
        itemCount++;
      } else {
        alert("Пожалуйста, выберите как сосиску, так и соус.");
      }
    } else {
      alert("Już dodałeś maksymalną ilość.");
    }
  });

  products.forEach(function (product) {
    const addToCartBtn = product.querySelector(".add-to-cart");
    const name = product.getAttribute("data-name");

    addToCartBtn.addEventListener("click", function () {
      const priceMatch = product.textContent.match(/(\d+\.\d+)/); // Ищем число с десятичной точкой в тексте товара
      if (!priceMatch) {
        alert("Не удалось найти цену товара.");
        return;
      }
      const price = parseFloat(priceMatch[0]);

      if (itemCount < 8) {
        total += price;
        totalPrice.textContent = total.toFixed(2) + " zł";
        itemCount++;
        cart.push({ name, price });
      } else {
        alert("Już dodałeś maksymalną ilość.");
      }
    });
  });

  clearCartBtn.addEventListener("click", function () {
    total = 0;
    totalPrice.textContent = total.toFixed(2) + " zł";
    itemCount = 0; // Обнуляем количество продуктов при очистке корзины
    cart.length = 0; // Очищаем корзину
  });

  buyBtn.addEventListener("click", function () {
    if (cart.length === 0) {
      alert("Dodaj coś do zamówienia.");
      return;
    }
    // Вычислим общую сумму покупки и обновим соответствующий элемент на странице
    totalPrice.textContent = total.toFixed(2) + " zł"; // Добавляем символы zł
    // Откроем модальное окно для завершения покупки
    checkoutList.innerHTML = "";
    cart.forEach(function (item) {
      const li = document.createElement("li");
      li.textContent = item.name + " - " + item.price.toFixed(2) + " zł";
      checkoutList.appendChild(li);
    });
    checkoutModal.style.display = "flex";
  });

  confirmPurchaseBtn.addEventListener("click", function () {
    const verificationCode = document.getElementById("verification-code").value;
    if (verificationCode.length === 6) {
      const randomCode = generateRandomCode(8);
      alert("Dziękujemy za zakup! Twój kod: " + randomCode);
      checkoutModal.style.display = "none";
      cartItems.innerHTML = "";
      total = 0;
      totalPrice.textContent = total.toFixed(2);
      itemCount = 0; // Обнуляем количество продуктов после покупки
      cart.length = 0; // Очищаем корзину
    } else {
      alert("Wpisz kod BLIK");
    }
  });

  // Функция для генерации случайного кода
  function generateRandomCode(length) {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  // Закрытие модального окна при клике вне его
  checkoutModal.addEventListener("click", function (event) {
    if (event.target === checkoutModal) {
      checkoutModal.style.display = "none";
    }
  });
});
