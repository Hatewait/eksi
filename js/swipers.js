'use strict'

document.addEventListener("DOMContentLoaded", () => {
  const updateLabels = ({ el, slides, realIndex: i, params: { loop } }) => {
    let insertNextText = el.querySelector('[data-intro-next-insert-text]');
    let insertCurrentText = el.querySelector('[data-intro-current-insert-text]');

    const count = el.querySelectorAll('.swiper-slide:not(.swiper-slide-duplicate)').length;
    const next = loop
        ? el.querySelector(`[data-swiper-slide-index="${(i + 1) % count}"]`)
        : slides[i + 1];

    insertNextText.textContent = next ? next.querySelector('[data-intro-next-text]').textContent : '';
    insertCurrentText.textContent = next ? next.querySelector('[data-intro-current-text]').textContent : '';
  }
  const removeClass = (progress, introBottom, activeBullet) => {
    progress.classList.remove("animate");
    introBottom.classList.remove('animate');
    activeBullet.classList.remove('animate');
  }

  const addClass = (progress, introBottom, activeBullet) => {
    progress.classList.add("animate");
    introBottom.classList.add('animate');
    activeBullet.classList.add('animate');
  }

  const swiperIntroSingle = new Swiper('[data-intro-swiper]', {
    loop: true,
    effect: 'fade',
    speed: 2000,
    fadeEffect: {
      crossFade: true
    },
    slidesPerView: 1,
    autoplay: {
      delay: 9500,
    },

    pagination: {
      el: '.swiper-custom-pagination',
      type: 'bullets',
      clickable: true,
      bulletClass: 'swiper-pagination-bullet',
      bulletActiveClass: 'swiper-pagination-bullet-active',
      renderBullet: function(index, className) {
        return '<span class="' + className + ' swiper-pagination-bullet--svg-animation"><svg width="64" height="64" viewBox="0 0 64 64"><circle class="svg__circle" cx="30" cy="30" r="20" fill="none" stroke-width="20"></circle><circle class="svg__circle-inner" cx="30" cy="30" r="20" stroke-width="10"></circle></svg></span>';
      },
    },

    navigation: {
      nextEl: "[data-intro-next]",
    },

    on: {
      init() {
        const activeBullet = this.el.querySelector('.swiper-pagination-bullet-active');
        const progress = this.el.querySelector('.progress');
        const introBottom = this.el.querySelector('[data-intro-bottom]');

        setTimeout(updateLabels, 0, this);
        removeClass(progress, introBottom, activeBullet);
        addClass(progress, introBottom, activeBullet);
      },
      slideChange() {
        updateLabels(this);
      },
      slideChangeTransitionStart() {
        const activeBullet = this.el.querySelector('.swiper-pagination-bullet-active');
        const progress = this.el.querySelector('.progress');
        const introBottom = this.el.querySelector('[data-intro-bottom]');
        removeClass(progress, introBottom, activeBullet);
      },
      slideChangeTransitionEnd() {
        const activeBullet = this.el.querySelector('.swiper-pagination-bullet-active');
        const progress = this.el.querySelector('.progress');
        const introBottom = this.el.querySelector('[data-intro-bottom]');
        addClass(progress, introBottom, activeBullet);
      },
    },

  });


  const swiperDecision = new Swiper('[data-decision-swiper]', {
    loop: true,
    speed: 900,

    navigation: {
      nextEl:  "[data-decision-next]",
      prevEl:  "[data-decision-prev]",
      lockClass: 'swiper-nav__lock',
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
      lockClass: 'swiper-nav__lock',
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



  const swiperSingle = new Swiper('[data-single-swiper]', {
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
      lockClass: 'swiper-nav__lock',
    },
  });


  // slider in product card

  const calculateSlides = (swiper) => {
    const moreButton = document.querySelector('[data-slider-more]');
    const amountEl = moreButton.querySelector('[data-length]');
    const slides = swiper.el.querySelectorAll('.swiper-slide');
    const amountOfVisible = [...slides].filter(slide => slide.classList.contains('swiper-slide-visible'));
    amountEl.innerHTML = String(swiper.slides.length - amountOfVisible.length);
  }
  const swiperProductCardThumbs = new Swiper('[data-product-thumbs-swiper]', {
    slidesPerView: 3,
    //slideVisibleClass: 'swiper-slide-visible',
    watchSlidesProgress: true,
    loop: false,
    breakpoints: {
      0: {
        slidesPerView: 2,
        direction: "horizontal",
        spaceBetween: 16,
      },
      728: {
        slidesPerView: 2,
        direction: "vertical",
        spaceBetween: 24,
      },
      1281: {
        slidesPerView: 4,
        direction: "vertical",
        spaceBetween: 24,
        /*slidesPerView: 3,*/
      },
    },

    on: {
      afterInit: function () {
        calculateSlides(this)
      },

      breakpoint: function () {
        calculateSlides(this)
      }
    },
  });


  const swiperProductCard = new Swiper('[data-product-swiper]', {
   // direction: "horizontal",
    slidesPerView: 1,

    thumbs: {
      swiper: swiperProductCardThumbs,
    },

    breakpoints: {
      0: {
        // при 0px и выше
        direction: "horizontal",
        //slidesPerView: 1,
      },
      728: {
        // при 768px и выше
        direction: "vertical",
        //slidesPerView: 1,
      },
      1281: {
        // при 768px и выше
        direction: "vertical",
      },
    },

  });



  const swiperSearchLayout = new Swiper('[data-search-layout-swiper]', {
    navigation: {
      nextEl:  "[data-search-layout-next]",
      prevEl:  "[data-search-layout-prev]",
      lockClass: 'swiper-nav__lock',
    },

    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 16,
      },

      728: {
        slidesPerView: 2,
        spaceBetween: 24,
      },

      1281: {
        slidesPerView: 3,
        spaceBetween: 24,
      },
    }
  });

});
