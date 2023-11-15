import Swiper, { Navigation, Pagination, EffectCreative } from "swiper";

window.addEventListener('DOMContentLoaded', (event) => {
	const problemsCarousel = document.querySelector('.team-carousel');
	if (!problemsCarousel) return;

	const teamCarousels = document.querySelectorAll('.team-carousel');

	teamCarousels.forEach((carousel, index) => {

		const uniqueClass = `team-carousel-${index}`
		carousel.classList.add(uniqueClass);

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

		  pagination: {
		    el: `.${uniqueClass} .team-carousel__pagination`,
		    clickable: true,
		  },
		  navigation: {
		    nextEl: `.${uniqueClass} .team-carousel__button-next`,
		    prevEl: `.${uniqueClass} .team-carousel__button-prev`,
		  },

		  lazy: {
		    loadPrevNext: true, // pre-loads the next image to avoid showing a loading placeholder if possible
		    loadPrevNextAmount: 2 //or, if you wish, preload the next 2 images
		  },
		}

		let problemsSwiper = new Swiper(`.${uniqueClass} .team-carousel__swiper`, swiperConfig);
	})


});
