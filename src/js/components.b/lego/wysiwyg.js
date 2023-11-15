"use strict"

import Swiper, { Navigation, Autoplay, Pagination, Thumbs } from "swiper";

const carousels = document.querySelectorAll('.wp-block-gallery');
const carouselClasses = {
	block: "wysiwyg-carousel"
}

function getSwiperConfig(swpierClasses) {
	const {nextButtonClass, prevButtonClass, bulletsClass} = swpierClasses;

	let swiperConfig = {
		loop: true,
		modules: [Navigation, Pagination],

		centeredSlides: true,
		centerInsufficientSlides: true,
		centeredSlidesBounds: true,
		slidesPerView: 1.16,
		spaceBetween: 10,

		breakpoints: {
			769: {
				spaceBetween: 40,
				slidesPerView: 1.5,
			}
		}
	}

	if (nextButtonClass || prevButtonClass) {
		swiperConfig.navigation = {};
	}
	if (nextButtonClass) {
		swiperConfig.navigation.nextEl = `.${nextButtonClass}`;
	}
	if (prevButtonClass) {
		swiperConfig.navigation.prevEl = `.${prevButtonClass}`;
	}
	if (bulletsClass) {
		swiperConfig.pagination = {
	    el: `.${bulletsClass}`,
	    clickable: true,
	  }
	}

	return swiperConfig;
}

function makeWysiwygCarousels(carousels, cssClasses) {
	carousels.forEach((carousel, carouselIndex) => {
	  carousel.classList.add('swiper');

	  const carouselClass = `${cssClasses.block}-${carouselIndex}`
	  carousel.classList.add(carouselClass);


	  const carouselContent = carousel.innerHTML;
	  carousel.innerHTML = '';

	  const swiperWrapper = document.createElement('div');
	  swiperWrapper.classList.add('swiper-wrapper')

	  carousel.append(swiperWrapper);

	  swiperWrapper.innerHTML = carouselContent;

	  carousel.querySelectorAll('figure').forEach(slide => {
	    slide.classList.add('swiper-slide');
	  })

	  const nav = document.createElement('div');
	  nav.classList.add('b_swiper__nav')
	  carousel.append(nav);

	  const bullets = document.createElement('div');
	  const bulletsClass = `swiper-pagination-${carouselIndex}`
	  bullets.classList.add('swiper-pagination')
	  bullets.classList.add(bulletsClass)

	  const prevButton = document.createElement('div')
	  const prevButtonClass = `swiper-button-prev-${carouselIndex}`
	  prevButton.classList.add('swiper-button-prev')
	  prevButton.classList.add(prevButtonClass)
	  carousel.append(prevButton);

	  const nextButton = document.createElement('div')
	  const nextButtonClass = `swiper-button-next-${carouselIndex}`
	  nextButton.classList.add('swiper-button-next')
	  nextButton.classList.add(nextButtonClass)

	  nav.append(prevButton);
	  nav.append(bullets);
	  nav.append(nextButton);

	  new Swiper(`.${carouselClass}`, getSwiperConfig({
	  	nextButtonClass,
	  	prevButtonClass,
	  	bulletsClass,
	  }));

	})
}

window.addEventListener('DOMContentLoaded', (event) => {
	makeWysiwygCarousels(carousels, carouselClasses);
});