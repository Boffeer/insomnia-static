"use strict"
import Swiper, { Navigation, Pagination, EffectCreative } from "swiper";

window.addEventListener('DOMContentLoaded', (event) => {

	function initCarousel() {
    const carousel = document.querySelector('.single-article-carousel');
    if (!carousel) return;

    const swiperConfig = {
      autoHeight: true,
      speed: 450,
      slidesPerView: 1,
      modules: [Navigation, Pagination, EffectCreative],
      spaceBetween: 100,
      effect: "creative",
      creativeEffect: {
        prev: {
          shadow: true,
          translate: ["-20%", 0, -1],
          opacity: 0,
        },
        next: {
          translate: ["130%", 0, 0],
        },
      },

      navigation: {
        nextEl: ".single-article-carousel__button-next",
        prevEl: ".single-article-carousel__button-prev",
      },
      lazy: {
        loadPrevNext: true, // pre-loads the next image to avoid showing a loading placeholder if possible
        loadPrevNextAmount: 2 //or, if you wish, preload the next 2 images
      },
    }

    let articleCarousel = new Swiper(`.single-article-carousel__swiper`, swiperConfig);
  }

  initCarousel();
  window.barba.hooks.after((e) => {
    setTimeout(() => {
      initCarousel();
    }, 100)
  });
});
