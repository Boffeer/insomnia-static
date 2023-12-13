"use strict"
import Swiper, { Navigation, Pagination, EffectCreative } from "swiper";

window.addEventListener('DOMContentLoaded', (event) => {

	const CLASSES = {
		card: 'news-card',
		active: 'active',
		inited: 'is-init',
	}

	function initCards() {
    const carouselCards = [...document.querySelectorAll('.accordion-carousel__slide .news-card')];
		carouselCards.forEach(card => {
			if (card.classList.contains(CLASSES.inited)) return;

			card.addEventListener('mouseover', () => {
				carouselCards.forEach(card => card.classList.remove(CLASSES.active))
				card.classList.add(CLASSES.active)
			});
			// card.addEventListener('mouseleave', () => {
			// 	card.classList.remove(CLASSES.active)
			// })

			card.classList.add(CLASSES.inited);
		})
    const slugCard = carouselCards.find(card => window.location.pathname.replace('/news/', '').replaceAll('/', '') === (card.dataset.slug));
    if (slugCard) {
      slugCard.classList.add(CLASSES.active);
      return;
    }
    if (carouselCards.length === 0) return;
		carouselCards[0].classList.add(CLASSES.active);
	}


	function initSwiper() {
    const accordionCarousel = document.querySelector('.accordion-carousel');
    if (!accordionCarousel) return;
    if (accordionCarousel.classList.contains(CLASSES.inited)) return;
    const RERENDER_BREAKPOINT = 991;
    const swiperConfig = {
      autoHeight: true,
      speed: 450,
      slidesPerView: 1,
      modules: [Navigation, Pagination, EffectCreative],
      spaceBetween: 100,
      effect: "creative",
      creativeEffect: {
        prev: {
          shadow: false,
          translate: ["-20%", 0, -1],
          opacity: 0,
        },
        next: {
          translate: ["130%", 0, 0],
        },
      },
      on: {
        slideChange: function() {
          if (!this.slides[this.activeIndex].querySelector('.active')) {
            this.el.querySelectorAll('.news-card').forEach(card => card.classList.remove('active'))
            this.slides[this.activeIndex].querySelector('.news-card').classList.add('active');
          }
        },
        init: function () {
          setTimeout(() => {
            if (!this.el.querySelector('.active')) {
              this.slides[0].querySelector('.news-card').classList.add('active');
            }
          }, 300);
        }
      },


      pagination: {
        el: `.accordion-carousel__pagination`,
        clickable: true,
      },

      lazy: {
        loadPrevNext: true, // pre-loads the next image to avoid showing a loading placeholder if possible
        loadPrevNextAmount: 2 //or, if you wish, preload the next 2 images
      },

    }
    let accordionSwiper = new Swiper('.accordion-carousel__swiper', swiperConfig);

    function isSwiperDestroyed() {
      let swiperDestroyed = accordionSwiper.destroyed === true;
      return swiperDestroyed;
    }
    function switchSwiper() {
      let swiperDestroyed = isSwiperDestroyed();

      if (window.innerWidth > RERENDER_BREAKPOINT && swiperDestroyed) {
        accordionSwiper = new Swiper('.accordion-carousel__swiper', swiperConfig);
      } else if (window.innerWidth <= RERENDER_BREAKPOINT && !swiperDestroyed) {
        // accordionSwiper = new Swiper('.accordion-carousel__swiper', swiperConfig);
        const destroy = accordionSwiper.destroy();
      }
    }

    if (accordionCarousel.classList.contains(CLASSES.inited)) {
      window.addEventListener('resize', function() {
        switchSwiper();
      });
    }
    switchSwiper();
    accordionCarousel.classList.add(CLASSES.inited);
  }

  initSwiper();
  initCards();

  window.barba.hooks.after((e) => {
    setTimeout(() => {
      initSwiper();
      initCards();
    }, 100)
  });
});
