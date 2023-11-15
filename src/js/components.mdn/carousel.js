import Swiper, { Navigation, Autoplay, Pagination, Thumbs, EffectFade, Grid } from "swiper";

window.addEventListener('DOMContentLoaded', (event) => {
	const carousel = document.querySelector('.carousel');
	if (!carousel) return;

	let carouselSwiper = new Swiper(".carousel-swiper", {
	  modules: [Navigation, Pagination, EffectFade],
	  speed: 350,
		autoHeight: true,
		spaceBetween: 20,
		slidesPerGroup: 2,
		slidesPerView: 2,
	  pagination: {
	    el: ".carousel-pagination",
	    clickable: true,
	  },
	  navigation: {
	    nextEl: ".carousel-button-next",
	    prevEl: ".carousel-button-prev",
	  },
	  breakpoints: {
	  	1100: {
	  		slidesPerView: 3,
				spaceBetween: 30,
				allowTouchMove: false,
	  	}
	  },
	});
});
