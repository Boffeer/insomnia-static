"use strict"
import Swiper, { Navigation, Pagination, EffectCreative } from "swiper";

window.addEventListener('DOMContentLoaded', (event) => {
	const accordionCarousel = document.querySelector('.accordion-carousel');

	if (!accordionCarousel) return;

	const CLASSES = {
		card: 'news-card',
		active: 'active',
		inited: 'is-init',
	}

	const carouselCards = accordionCarousel.querySelectorAll('.accordion-carousel__slide .news-card');
	function initCards(cards) {
		cards.forEach(card => {
			if (card.classList.contains(CLASSES.inited)) return;

			card.addEventListener('mouseover', () => {
				cards.forEach(card => card.classList.remove(CLASSES.active))
				card.classList.add(CLASSES.active)
			});
			// card.addEventListener('mouseleave', () => {
			// 	card.classList.remove(CLASSES.active)
			// })

			card.classList.add(CLASSES.inited);
		})
		cards[0].classList.add(CLASSES.active);
	}


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

	function initSwiper() {
		let swiperDestroyed = isSwiperDestroyed();

	  if (window.innerWidth > RERENDER_BREAKPOINT && swiperDestroyed) {
	    accordionSwiper = new Swiper('.accordion-carousel__swiper', swiperConfig);
	  } else if (window.innerWidth <= RERENDER_BREAKPOINT && !swiperDestroyed) {
	    // accordionSwiper = new Swiper('.accordion-carousel__swiper', swiperConfig);
	  	const destroy = accordionSwiper.destroy();
	  }
	}
	window.addEventListener('resize', function() {
	  initSwiper();
	});
	initSwiper();


	initCards(carouselCards)
});