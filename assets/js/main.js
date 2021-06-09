window.onload = () => {
  const main = {
    init: function () {
      this.slider();
      this.randomMonth();
      this.menu();
      this.widgets();
      this.lazy();
    },
    slider: function () {
      let slide = document.querySelector(".slide");
      if (!slide) return;
      let slides = [...document.querySelectorAll(".slide__item ")];

      const buttonNext = document.querySelector(".button-next");
      const buttonPrev = document.querySelector(".button-prev");

      function slideNext() {
        let idx = 0;
        let activeItem = document.querySelector(".slide__item--active");

        for (idx; (activeItem = activeItem.previousElementSibling); idx++) {}

        if (idx < slides.length - 1) {
          slides.forEach((itemSlide) => {
            itemSlide.classList.remove("slide__item--active");
            slides[idx].nextElementSibling.classList.add("slide__item--active");
          });
        } else {
          slides.forEach((itemSlide) => {
            itemSlide.classList.remove("slide__item--active");
            slides[0].classList.add("slide__item--active");
          });
        }
      }
      const slidePrev = () => {
        let idx = 0;
        let activeItem = document.querySelector(".slide__item--active");
        for (idx; (activeItem = activeItem.previousElementSibling); idx++) {}
        if (idx === 0) {
          slides.forEach((itemSlide) => {
            itemSlide.classList.remove("slide__item--active");
            slides[slides.length - 1].classList.add("slide__item--active");
          });
        } else {
          slides.forEach((itemSlide) => {
            itemSlide.classList.remove("slide__item--active");
            slides[idx].previousElementSibling.classList.add(
              "slide__item--active"
            );
          });
        }
      };

      buttonNext.addEventListener("click", slideNext);
      buttonPrev.addEventListener("click", slidePrev);
    },
    randomMonth: function () {
      const arrRandom = ["June 24", "July 25", "July 24", "July 22", "July 14"];
      let random = Math.floor(Math.random() * 5);
      const date = new Date();
      const year = date.getFullYear();
      const updates = [...document.querySelectorAll(".update-year")];
      updates.forEach((update) => {
        update.innerText = `${arrRandom[random]}, ${year}`;
      });
    },
    menu: function () {
      // variable
      const buttonMenu = document.querySelector(".head__button");
      const menu = document.querySelector(".head__nav .nav");
      const cart = document.querySelector(".head__cart");
      const icon = document.querySelector(".head__icon");
      console.log(cart);
      // event
      buttonMenu.addEventListener("click", showMenu);
      // function
      function showMenu() {
        menu.classList.toggle("nav--active");
        buttonMenu.classList.toggle("head__button--active");
        cart.classList.toggle("head__cart--active");
        icon.classList.toggle("head__icon--active");
      }
    },
    widgets: function () {
      const button = document.querySelector("#button-widgets");
      const iconHead = document.querySelector(".head__icon");
      const removeBtn = document.querySelector(".widgets-side__button");
      button.addEventListener("click", widgetsShow);
      iconHead.addEventListener("click", widgetsShow);
      removeBtn.addEventListener("click", widgetsHide);
      function widgetsShow() {
        const widgets = document.querySelector(".widgets-side");
        const ovl = document.querySelector(".main-ovl");
        widgets.classList.add("widgets-side--active");
        ovl.classList.add("main-ovl--active");
      }
      function widgetsHide() {
        const widgets = document.querySelector(".widgets-side");
        const ovl = document.querySelector(".main-ovl");
        widgets.classList.remove("widgets-side--active");
        ovl.classList.remove("main-ovl--active");
      }
    },
    lazy: function () {
      const imageObserver = new IntersectionObserver(
        (entry, imgObserver) => {
          entry.forEach((entry) => {
            if (entry.isIntersecting) {
              const lazyImage = entry.target;
              lazyImage.src = lazyImage.dataset.src;
              lazyImage.classList.remove("lazy-img");
              imgObserver.unobserve(lazyImage);
            }
          });
        },
        {
          threshold: 0,
        }
      );
      const arr = [...document.querySelectorAll(".lazy-img")];
      arr.forEach((v) => {
        imageObserver.observe(v);
      });
    },
  };
  main.init();
};
