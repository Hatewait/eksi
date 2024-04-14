'use strict'

Fancybox.bind('[data-fancybox]', {});

// 2. This code loads the IFrame Player API code asynchronously.
const tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.

function onYouTubeIframeAPIReady() {
  const container = document.querySelectorAll('.video-container');
  for (let i = 0; i < container.length; i++) {
    let player = container[i].querySelector('.video-iframe');
    const button = container[i].querySelector('.video-play');
    player = new YT.Player(player, {
      videoId: container[i].dataset.id,
      events: {
        onReady: (event) => {

        }
      },
      playerVars: {
        'controls': 0,
      },
    });

    button.addEventListener('click', function() {
      switch (player.getPlayerState()) {
        case 1:
          player.stopVideo();
          break;
        default:
          player.playVideo();
          break;
      }
    })
  }
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
let done = false;
function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.PLAYING && !done) {
    setTimeout(stopVideo, 6000);
    done = true;
  }
}
function stopVideo() {
  player.stopVideo();
}

function muteVideo() {
  player.mute();
}

const playVideoOnHover = (slide) => {
  slide.addEventListener('mouseover', () => {
    const isVideoCurrent = slide.querySelector('.video-container');
    if (isVideoCurrent) {
      YT.get(isVideoCurrent.querySelector('iframe').id).playVideo();
      YT.get(isVideoCurrent.querySelector('iframe').id).mute();
    }
  })
}

const stopVideoOnMouseLeave = (slide) => {
  slide.addEventListener('mouseleave', () => {
    const isVideoCurrent = slide.querySelector('.video-container');
    if (isVideoCurrent) {
      YT.get(isVideoCurrent.querySelector('iframe').id).stopVideo();
    }
  })
}

const stopVideoOnPrevSlide = (swiper) => {
  const isVideo = swiper.slides[swiper.previousIndex].querySelector('.video-container');
  if (isVideo) {
    YT.get(isVideo.querySelector('iframe').id).stopVideo()
  }
}

// Инициализация слайдера с видео в карточке
const productVideoSwiper = new Swiper('[data-product-video-swiper]', {
  slidesPerView: 1,
  loop: true,
  effect: 'fade',
  speed: 2000,
  fadeEffect: {
    crossFade: true
  },

  navigation: {
    nextEl:  "[data-product-video-next]",
    prevEl:  "[data-product-video-prev]",
    lockClass: 'swiper-nav__lock',
  },
  on: {
    init: function () {
      const activeSlide = this.slides[this.activeIndex];
      playVideoOnHover(activeSlide);
      stopVideoOnMouseLeave(activeSlide);
    },
  },
});

productVideoSwiper.on('slideChange', function (swiper) {
  const activeSlide = swiper.slides[swiper.activeIndex];
  stopVideoOnPrevSlide(swiper);
  playVideoOnHover(activeSlide);
  stopVideoOnMouseLeave(activeSlide);
});

// Инициализация слайдера с фото в карточке
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
      slidesPerView: 3,
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
