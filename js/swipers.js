'use strict'

document.addEventListener("DOMContentLoaded", () => {
  const updateLabels = ({ el, slides, realIndex: i, params: { loop } }) => {
    let insertLabel = el.querySelector('[data-insert-label]');
    let insertNextLabel = el.querySelector('[data-insert-next-label]');

    const count = el.querySelectorAll('.swiper-slide:not(.swiper-slide-duplicate)').length;
    const next = loop
        ? el.querySelector(`[data-swiper-slide-index="${(i + 1) % count}"]`)
        : slides[i + 1];

    insertLabel.textContent = next ? next.dataset.nextLabel : '';
    insertNextLabel.textContent = next ? next.dataset.label : '';
  }
  const removeClass = (swiper) => {
    const activeBullet = swiper.el.querySelector('.swiper-pagination-bullet-active');
    const progress = swiper.el.querySelector('.progress');
    const introBottom = swiper.el.querySelector('[data-intro-bottom]');
    progress.classList.remove("animate");
    introBottom.classList.remove('animate');
    activeBullet.classList.remove('animate');
  }
  const addClass = (swiper) => {
    const activeBullet = swiper.el.querySelector('.swiper-pagination-bullet-active');
    const progress = swiper.el.querySelector('.progress');
    const introBottom = swiper.el.querySelector('[data-intro-bottom]');
    progress.classList.add("animate");
    introBottom.classList.add('animate');
    activeBullet.classList.add('animate');
  }

  const swiperIntroSingle = new Swiper('[data-intro-swiper]', {
    loop: true,
    effect: 'fade',
    speed: 1500,
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
        updateLabels(this)
        setTimeout(removeClass, 0, this);
        setTimeout(addClass, 0, this);
      },
      slideChange() {
        updateLabels(this)
      },
      slideChangeTransitionStart() {
        removeClass(this);
      },
      slideChangeTransitionEnd() {
        addClass(this);
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

  // Инициализация слайдера с фото в статьях
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
