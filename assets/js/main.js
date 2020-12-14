window.onload = () => {
  const main = {
    init: function () {
      this.slide();
      this.randomMonth();
      this.menu ();
      this.widgets ();
      this.lazy ();
    },
    slide: function () {
      const slideHome = document.querySelector(".slide-home");
      if (!slideHome) {
        return false;
      }
      const images = document.querySelectorAll(".slide-home__item");
      images.forEach((images, index) => {
        images.style.cssText = `background: url('./images/slide-${
          index + 1
        }.jpg'); height:100%;  background-position: center center;
                background-repeat: no-repeat;
                background-size: cover;
              }`;
      });
      function slider() {
        let slides = [...document.querySelectorAll(".slide-home__item")];
        let buttonNext = document.querySelector(".button-next");
        let buttonPrev = document.querySelector(".button-prev");
        buttonNext.addEventListener("click", slideNext);
        buttonPrev.addEventListener("click", slidePrev);
        function slideNext() {
          let slideActive = document.querySelector('.slide--active');
          let index = 0 ; 
          for (index ; slideActive = slideActive.previousElementSibling; index++){};
          //check last div 
          console.log(index);
          if (index < slides.length - 1) {
            slides.forEach(slide=>{
              slide.classList.remove('slide--active');
              slides[index].nextElementSibling.classList.add('slide--active');
            })
          } else {
            slides.forEach(slide=>{
              slide.classList.remove('slide--active');
              slides[0].classList.add('slide--active');
            })
          }
        }
        function slidePrev () {
          let slideActive = document.querySelector('.slide--active');
          let index = 0 ; 
          for (index ; slideActive = slideActive.previousElementSibling; index++){};
          console.log(index);
          if (index == 0 ) {
            let slideLength = slides.length - 1 ; 
            slides.forEach(slide=>{
              slide.classList.remove('slide--active');
              slides[slideLength].classList.add('slide--active');
            })
          } else {
            slides.forEach(slide=>{
              slide.classList.remove('slide--active');
              slides[index].previousElementSibling.classList.add('slide--active');
            })
          }
        }
      }
      slider();
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
        const buttonMenu = document.querySelector('.head__button');
        const menu = document.querySelector('.head__nav .nav');
        const cart = document.querySelector('.head__cart');
        const icon = document.querySelector('.head__icon');
        console.log(cart);
        // event 
        buttonMenu.addEventListener('click',showMenu)
        // function
        function showMenu () {
            menu.classList.toggle('nav--active');
            buttonMenu.classList.toggle('head__button--active');
            cart.classList.toggle('head__cart--active');
            icon.classList.toggle('head__icon--active');
        }
    },
    widgets: function () {
        const button = document.querySelector('.button-widgets');
        const iconHead = document.querySelector('.head__icon');
        const removeBtn = document.querySelector('.widgets-side__button');
        button.addEventListener('click',widgetsShow);
        iconHead.addEventListener('click',widgetsShow);
        removeBtn.addEventListener('click',widgetsHide);
        function widgetsShow () {
            const widgets = document.querySelector('.widgets-side');
            const ovl = document.querySelector('.main-ovl');
            widgets.classList.add('widgets-side--active');
            ovl.classList.add('main-ovl--active');
        }
        function widgetsHide () {
            const widgets = document.querySelector('.widgets-side');
            const ovl = document.querySelector('.main-ovl');
            widgets.classList.remove('widgets-side--active');
            ovl.classList.remove('main-ovl--active');
        }
    },
    lazy: function () {
        const imageObserver = new IntersectionObserver ((entry, imgObserver)=>{
            entry.forEach((entry=>{
                if(entry.isIntersecting) {
                    const lazyImage = entry.target
                    console.log('lazy loadding',lazyImage);
                    lazyImage.src = lazyImage.dataset.src
                    lazyImage.classList.remove("lazy-img")
                    imgObserver.unobserve (lazyImage);
                }
            }))
        },{
            threshold: 0
        });
        const arr = [...document.querySelectorAll ('.lazy-img')];
        arr.forEach ((v) => { 
            imageObserver.observe (v); 
        }) 
    },
  };
  main.init();
};
