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


const sliderThumbs = new Swiper('[data-product-video-thumbs-swiper]', {
  slidesPerView: 2,
  mousewheelControl: true,

  freeMode: true,
  breakpoints: {
    0: {
      // при 0px и выше
      slidesPerView: 2,
      direction: "vertical",
      spaceBetween: 16,
    },
    728: {
      // при 768px и выше
      direction: "horizontal",
      spaceBetween: 24,
    },
    1281: {
      // при 768px и выше
      direction: "vertical",
      spaceBetween: 24,
      /*slidesPerView: 3,*/
    },
  }
});

// Инициализация слайдера изображений
const productVideoSwiper = new Swiper('[data-product-video-swiper]', {
 // direction: "vertical",
  slidesPerView: 1,
  spaceBetween: 32,

  thumbs: {
    swiper: sliderThumbs
  },
  breakpoints: {
    0: {
      // при 0px и выше
      direction: "horizontal",
      slidesPerView: 1,
    },
    728: {
      // при 768px и выше
      direction: "horizontal",
      slidesPerView: 1,
    },
    1281: {
      // при 768px и выше
      direction: "vertical",
      //autoHeight: true,
      calculateHeight:true,
      slidesPerView: 1,
      slidesPerGroup: 1,
    },
  },

  on: {
    init: function () {
      const activeSlide = this.slides[this.activeIndex];
      playVideoOnHover(activeSlide);
      stopVideoOnMouseLeave(activeSlide);

      const slider = document.querySelector('[data-product-video-swiper]');
      const currentSlide = this.slides[this.activeIndex];
      const currentSlideItem = currentSlide.children[0];
      console.log(currentSlideItem.clientHeight)
      //slider.style.height = currentSlideItem.clientHeight + "px";
    },
  },
});


productVideoSwiper.on('slideChange', function (swiper) {
  const activeSlide = swiper.slides[swiper.activeIndex];
  stopVideoOnPrevSlide(swiper);
  playVideoOnHover(activeSlide);
  stopVideoOnMouseLeave(activeSlide);

  const slider = document.querySelector('[data-product-video-swiper]');
  const currentSlide = swiper.slides[swiper.activeIndex];
  //const currentSlideItem = currentSlide.children[0];
  //slider.style.height = currentSlideItem.clientHeight + "px";
});
