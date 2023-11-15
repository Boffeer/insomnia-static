import Swiper, { Navigation, Autoplay, Pagination, EffectFade, } from "swiper";

window.addEventListener('DOMContentLoaded', (event) => {
	const offerCarousel = document.querySelector('.offer-carousel');
	if (!offerCarousel) return;

	const autoplaySpeed = 7000;
	let offerCarouselSwiper = new Swiper(".offer-carousel-swiper", {
	  modules: [Navigation, Pagination, EffectFade, Autoplay],
	  speed: 350,
	  loop: false,
    watchOverflow: true,
	  autoplay: {
	  	delay: autoplaySpeed,
	  },
		autoHeight: true,
	  pagination: {
	    el: ".offer-carousel-pagination",
	    clickable: true,
	  },
	  navigation: {
	    nextEl: ".offer-carousel-button-next",
	    prevEl: ".offer-carousel-button-prev",
	  },
    on: {
      init: function() {
        if (!this.params.watchOverflow && this.slides.length <= 1) {
          this.navigation.destroy();
        }
      },
      resize: function() {
        if (!this.params.watchOverflow && this.slides.length <= 1 && !this.navigation.enabled) {
          this.navigation.init();
        }
      }
    }
	});

});
