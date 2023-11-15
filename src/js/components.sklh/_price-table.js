// import Swiper, { Navigation, Autoplay, Pagination, Thumbs, EffectFade, Grid } from "swiper";
import Swiper, { Navigation, Pagination, EffectCreative } from "swiper";

window.addEventListener('DOMContentLoaded', (event) => {
	const priceTable = document.querySelectorAll('.price-table');
	if (priceTable.length == 0) return;

	const RERENDER_BREAKPOINT = 601;
	const swiperConfig = {
	  	modules: [Navigation, Pagination, EffectCreative],
		spaceBetween: 50,
		slidesPerView: 1,
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
	    	el: '.price-table__pagination',
	    	clickable: true,
	  	},
	}

	let priceTableSwiper = new Swiper('.price-table-swiper', swiperConfig);

	function isSwiperDestroyed() {
		let swiperDestroyed = priceTableSwiper.destroyed === true;
	  	return swiperDestroyed;
	}

	function initSwiper() {
		let swiperDestroyed = isSwiperDestroyed();

	  if (window.innerWidth > RERENDER_BREAKPOINT && !swiperDestroyed) {
	  	const destroy = priceTableSwiper.destroy();
	    // console.log('destroy', destroy);
	  } else if (window.innerWidth <= RERENDER_BREAKPOINT && swiperDestroyed) {
	    priceTableSwiper = new Swiper('.price-table-swiper', swiperConfig);
	    // console.log('built', priceTableSwiper)
	  }
	}

	window.addEventListener('resize', function() {
	  initSwiper();
	});
	initSwiper();


	const priceCards = [...document.querySelectorAll('.price-table-slide')];
	const tariffModal = document.querySelector('.modal#tariff');
	const tariffModalTitleNode = tariffModal.querySelector('.modal__title')
	const tariffModalTitleText = tariffModalTitleNode.innerHTML;

	priceCards.forEach((tariff, index) => {
		const buttonMore = tariff.querySelector('.price-table-slide__button-more');
		const tariffName = tariff.querySelector('.price-table-slide__title').innerText;
		buttonMore.addEventListener('click', () => {
			tariffModalTitleNode.innerHTML = `<span class="text-colored">Тариф: ${tariffName}</span><br> ${tariffModalTitleText} `;
			const formname = tariffModal.querySelector('.form__hidden-fieldset input[name="formname"]');
			formname.innerText = `Заявка: Тариф ${tariffName}`;
		})
	});
});


