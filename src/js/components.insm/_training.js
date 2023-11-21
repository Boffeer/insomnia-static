"use strict"
import Swiper, { Navigation, Pagination, EffectCreative } from "swiper";

window.addEventListener('DOMContentLoaded', (event) => {
	const carousel = document.querySelector('.training-carousel');

	if (!carousel) return;

	const swiperConfig = {
		autoHeight: true,
		speed: 450,
		slidesPerView: 3,
		modules: [Navigation, Pagination, EffectCreative],
		spaceBetween: 30,
		// effect: "creative",
		// creativeEffect: {
		// 	prev: {
		// 		shadow: true,
		// 		translate: ["-20%", 0, -1],
		// 		opacity: 0,
		// 	},
		// 	next: {
		// 		translate: ["130%", 0, 0],
		// 	},
		// },

		pagination: {
			el: `.training-carousel__pagination`,
			clickable: true,
		},


		lazy: {
		    loadPrevNext: true, // pre-loads the next image to avoid showing a loading placeholder if possible
		    loadPrevNextAmount: 2 //or, if you wish, preload the next 2 images
		},
	}

	let swiperCarousel = new Swiper(`.training-carousel__swiper`, swiperConfig);
	swiperCarousel.slideTo(0);
});