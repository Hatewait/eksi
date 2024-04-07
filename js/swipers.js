'use strict'

document.addEventListener("DOMContentLoaded", () => {
  const progress = document.querySelector('.progress');

  const swiperIntroSingle = new Swiper('[data-intro-swiper]', {
    loop: true,
    effect: 'fade',
    speed: 2000,
    fadeEffect: {
      crossFade: true
    },
    slidesPerView: 1,
    /*autoplay: {
      delay: 5000,
    },*/

    pagination: {
      el: '.swiper-custom-pagination',
      type: 'bullets',
      clickable: true,
      bulletClass: 'swiper-pagination-bullet',
      bulletActiveClass: 'swiper-pagination-bullet-active',
      renderBullet: function(index, className) {
        return '<span class="' + className + ' swiper-pagination-bullet--svg-animation"><svg width="70" height="70" viewBox="0 0 70 70"><circle class="svg__circle" cx="30" cy="30" r="20" fill="none" stroke-width="20"></circle><circle class="svg__circle-inner" cx="30" cy="30" r="20" stroke-width="10"></circle></svg></span>';
      },

    },

    navigation: {
      nextEl: "[data-intro-next]",
    },

    on: {
      init() {
        setTimeout(updateLabels, 0, this);
        progress.classList.remove("animate");
        progress.classList.add("animate");
      },
      slideChange() {
        updateLabels(this);
        console.log('333')
      },
      slideChangeTransitionStart() {
        progress.classList.remove("animate");
        console.log('jjj')
      },
      slideChangeTransitionEnd() {
        progress.classList.add("animate");
      }
    },

  });



  function updateLabels({ el, slides, realIndex: i, params: { loop } }) {
    let insertNextText = el.querySelector('[data-intro-next-insert-text]');
    let insertCurrentText = el.querySelector('[data-intro-current-insert-text]');

    const count = el.querySelectorAll('.swiper-slide:not(.swiper-slide-duplicate)').length;
    const next = loop
            ? el.querySelector(`[data-swiper-slide-index="${(i + 1) % count}"]`)
            : slides[i + 1];

    insertNextText.textContent = next ? next.querySelector('[data-intro-next-text]').textContent : '';
    insertCurrentText.textContent = next ? next.querySelector('[data-intro-current-text]').textContent : '';
  }

  const swiperDecision = new Swiper('[data-decision-swiper]', {
    loop: true,
    speed: 900,

    navigation: {
      nextEl:  "[data-decision-next]",
      prevEl:  "[data-decision-prev]",
    },

    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 1.5,
        spaceBetween: 16,
      },

      728: {
        slidesPerView: 2.5,
        spaceBetween: 24,
      },

      1281: {
        slidesPerView: 3.2,
        spaceBetween: 24,
      },
    }
  });


  const swiperLeaderSingle = new Swiper('[data-leader-swiper]', {
    loop: true,
    effect: 'fade',
    speed: 2000,
    fadeEffect: {
      crossFade: true
    },
    slidesPerView: 1,
    //autoplay: true,


    navigation: {
      nextEl:  "[data-leader-next]",
      prevEl:  "[data-leader-prev]",
    },

  });

  const swiperLogo = new Swiper('[data-logo-swiper]', {
    loop: true,
    speed: 900,

    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 3.5,
        spaceBetween: 16,
      },

      728: {
        slidesPerView: 3.5,
        spaceBetween: 24,
      },

      1281: {
        slidesPerView: 8,
        spaceBetween: 48,
      },
    }
  });


  /*swiperIntroSingle.on('slideChange', () => {
    function animateElements(tl, el, animateOptions) {
      tl.from(el, animateOptions)
    }

    const tl = gsap.timeline();
    const animateOptions = {
      opacity: 0,
      duration: 0.5,
      x: 500
    }

    const activeIndex = swiperIntroSingle.activeIndex;
    const activeSlide = document.querySelector(`.intro__swiper .swiper-slide:nth-child(${activeIndex + 1})`);

    console.log(activeSlide)

    const slideTitle = activeSlide.querySelector('[data-gsap-title]');
    const slideText = activeSlide.querySelector('[data-gsap-text]');
    const slideList = activeSlide.querySelector('[data-gsap-list]');
    const slideLink = activeSlide.querySelector('[data-gsap-link]');


    animateElements(tl, slideTitle, animateOptions);
    animateElements(tl, slideText, animateOptions);
    animateElements(tl, slideList, animateOptions);
    animateElements(tl, slideLink, animateOptions);
  })



*/


  const sliderThumbs = new Swiper(".slider__thumbs .swiper", {
    // ищем слайдер превью по селектору
    // задаем параметры
    direction: "vertical", // вертикальная прокрутка
    slidesPerView: 3, // показывать по 3 превью
    spaceBetween: 24, // расстояние между слайдами

    freeMode: true, // при перетаскивании превью ведет себя как при скролле
    breakpoints: {
      // условия для разных размеров окна браузера
      0: {
        // при 0px и выше
        direction: "horizontal" // горизонтальная прокрутка
      },
      768: {
        // при 768px и выше
        direction: "vertical" // вертикальная прокрутка
      }
    }
  });
// Инициализация слайдера изображений
  const sliderImages = new Swiper(".slider__images .swiper", {
    direction: "vertical", // вертикальная прокрутка
    slidesPerView: 1, // показывать по 1 изображению
    spaceBetween: 32, // расстояние между слайдами
    navigation: {
      // задаем кнопки навигации
      nextEl: ".slider__next", // кнопка Next
      prevEl: ".slider__prev" // кнопка Prev
    },
    thumbs: {
      // указываем на превью слайдер
      swiper: sliderThumbs // указываем имя превью слайдера
    },
    breakpoints: {
      // условия для разных размеров окна браузера
      0: {
        // при 0px и выше
        direction: "horizontal" // горизонтальная прокрутка
      },
      768: {
        // при 768px и выше
        direction: "vertical" // вертикальная прокрутка
      }
    }
  });


  const swiper = new Swiper('[data-single-swiper]', {
    loop: true,
    effect: 'fade',
    speed: 2000,
    fadeEffect: {
      crossFade: true
    },
    slidesPerView: 1,

    navigation: {
      nextEl:  "[data-single-next]",
      prevEl:  "[data-single-prev]",
    },
  });

});
