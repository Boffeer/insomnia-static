"use strict"
import Swiper, { Navigation, Pagination, EffectCreative } from "swiper";

window.addEventListener('DOMContentLoaded', (event) => {

  function initCarousel() {
    const carousel = document.querySelector('.training-carousel');

    if (!carousel) return;

    const swiperConfig = {
      autoHeight: true,
      speed: 450,
      slidesPerView: 2.2,
      slidesPerGroup: 2,
      modules: [Navigation, Pagination, EffectCreative],
      spaceBetween: 20,

      pagination: {
        el: `.training-carousel__pagination`,
        clickable: true,
      },

      lazy: {
        loadPrevNext: true, // pre-loads the next image to avoid showing a loading placeholder if possible
        loadPrevNextAmount: 2 //or, if you wish, preload the next 2 images
      },

      breakpoints: {
        992: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 30,
        }
      }
    }

    let swiperCarousel = new Swiper(`.training-carousel__swiper`, swiperConfig);
    swiperCarousel.slideTo(0);
  }

  initCarousel();
  window.barba.hooks.after((e) => {
    if (!e.next.url.path.includes('training')) return;

    setTimeout(() => {
      initCarousel();
    }, 100)
  });
});
