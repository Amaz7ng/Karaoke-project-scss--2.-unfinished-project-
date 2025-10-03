document.addEventListener("DOMContentLoaded", function () {
  // Бургер-меню
  const burgerBtn = document.querySelector(".burger-button");
  const burgerMenu = document.querySelector(".burger-menu");
  const closeBtn = document.querySelector(".burger-menu__close");
  const body = document.body;

  if (burgerBtn && burgerMenu && closeBtn) {
    // Открытие меню
    burgerBtn.addEventListener("click", function () {
      this.classList.toggle("is-active");
      burgerMenu.classList.toggle("is-active");
      body.classList.toggle("menu-open");
    });

    // Закрытие меню
    closeBtn.addEventListener("click", function () {
      burgerMenu.classList.remove("is-active");
      burgerBtn.classList.remove("is-active");
      body.classList.remove("menu-open");
    });

    // Закрытие при клике на overlay
    burgerMenu.addEventListener("click", function (e) {
      if (e.target.classList.contains("burger-menu__overlay")) {
        this.classList.remove("is-active");
        burgerBtn.classList.remove("is-active");
        body.classList.remove("menu-open");
      }
    });

    // Закрытие при клике на ссылки
    const menuLinks = burgerMenu.querySelectorAll("a");
    menuLinks.forEach((link) => {
      link.addEventListener("click", function () {
        burgerMenu.classList.remove("is-active");
        burgerBtn.classList.remove("is-active");
        body.classList.remove("menu-open");
      });
    });
  }

  // Анимация кнопки "Подняться вверх"
  const bounceButton = document.querySelector(".footer-button");

  if (bounceButton) {
    bounceButton.addEventListener("mouseenter", () => {
      // Удаляем класс если он уже есть (для перезапуска анимации)
      bounceButton.classList.remove("bounce-animation");

      // Принудительный reflow для перезапуска анимации
      void bounceButton.offsetWidth;

      // Добавляем класс с анимацией
      bounceButton.classList.add("bounce-animation");
    });

    // Автоматически удаляем класс после завершения анимации
    bounceButton.addEventListener("animationend", () => {
      bounceButton.classList.remove("bounce-animation");
    });

    // Плавный скролл к верху страницы
    bounceButton.addEventListener("click", function (e) {
      e.preventDefault();

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // Функция для управления выдвигающимися блоками
  function initFooterIcons() {
    const iconTriggers = document.querySelectorAll(".footer__icon-trigger");
    let activeTrigger = null;

    iconTriggers.forEach((trigger) => {
      trigger.addEventListener("click", function (e) {
        e.stopPropagation();

        // Если уже активный триггер, закрываем его
        if (activeTrigger && activeTrigger !== this) {
          activeTrigger.classList.remove("active");
        }

        // Переключаем текущий триггер
        this.classList.toggle("active");

        // Обновляем активный триггер
        if (this.classList.contains("active")) {
          activeTrigger = this;
        } else {
          activeTrigger = null;
        }
      });
    });

    // Закрытие по клику вне области
    document.addEventListener("click", function (e) {
      if (activeTrigger && !activeTrigger.contains(e.target)) {
        activeTrigger.classList.remove("active");
        activeTrigger = null;
      }
    });

    // Закрытие при скролле
    window.addEventListener("scroll", function () {
      if (activeTrigger) {
        activeTrigger.classList.remove("active");
        activeTrigger = null;
      }
    });
  }

  // Инициализация выдвигающихся иконок
  initFooterIcons();
});
