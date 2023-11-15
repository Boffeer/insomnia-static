window.addEventListener('DOMContentLoaded', (event) => {
	const maxHeightedCarousels = [...document.querySelectorAll('.b_swiper--max-height')];

	function calcSliderHeight() {
		maxHeightedCarousels.forEach(carousel => {
			const swiper = carousel.querySelector('.swiper');
			if (!swiper) return;

			const slides = swiper.querySelectorAll('.swiper-slide');
			let slidesHeights = [];
			slides.forEach((slide) => {
				slidesHeights.push(slide.getBoundingClientRect().height);
			})
			const maxSlideHeight = Math.max(...slidesHeights);
			slides.forEach(slide => {
				slide.style.height = `${maxSlideHeight}px`;
			})
		})
	}

	let previousWidth = window.innerWidth;
	window.addEventListener('resize', function() {
	  const currentWidth = window.innerWidth;
	  if (currentWidth === previousWidth) return;

	  calcSliderHeight();
	  previousWidth = currentWidth;
	});
	calcSliderHeight();

});
