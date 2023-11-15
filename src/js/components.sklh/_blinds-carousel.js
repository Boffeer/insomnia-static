// import Swiper, { Navigation, Autoplay, Pagination, Thumbs, EffectFade, Grid } from "swiper";
import Swiper, { Navigation, Pagination, EffectCreative } from "swiper";

window.addEventListener('DOMContentLoaded', (event) => {
	const blindsCarousel = document.querySelectorAll('.blinds-carousel');
	if (blindsCarousel.length == 0) return;


	blindsCarousel.forEach((carousel, index) => {
		const uniqueClass = `blinds-carousel-${index}`;
		carousel.classList.add(uniqueClass);

		const swiperConfig = {
		  	modules: [Navigation, Pagination, EffectCreative],
			slidesPerView: 1,

			pagination: {
			    el: `.${uniqueClass} .blinds-carousel__pagination`,
			    clickable: true,
			},
			navigation: {
			    nextEl: `.${uniqueClass} .blinds-carousel__button-next`,
			    prevEl: `.${uniqueClass} .blinds-carousel__button-prev`,
			},

			breakpoints: {
				962: {
					slidesPerView: 3,
					slidesPerGroup: 3,
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
				}
			}
		}

		let blindsCarouselSwiper = new Swiper(`.${uniqueClass} .blinds-carousel-swiper`, swiperConfig);
	})


});


