import Swiper, { Navigation, Autoplay, Pagination, Thumbs, EffectFade, Grid } from "swiper";

window.addEventListener('DOMContentLoaded', (event) => {
	const CLASS_INITED = 'js_product-hero__carousel--inited';
	const CURRENT_THUMB_CLASS = 'product-hero__thumbs-slide--current';

	const productHeroCarousel = document.querySelector('.product-hero__carousel');
	if (!productHeroCarousel) return;

	const productHeroGalleryCarousels = [...document.querySelectorAll('.product-hero__gallery')]
	const productHeroThumbsCarousels = [...document.querySelectorAll('.product-hero__thumbs')]

	productHeroGalleryCarousels.forEach((gallery, index) => {
		const ID = Math.floor(Math.random() * 900000) + 100000;

		const uniqueGalleryClass = `js_product-hero__gallery-${ID}`
		const uniqueThumbsClass = `js_product-hero__thumbs-${ID}`
		gallery.classList.add(uniqueGalleryClass);
		productHeroThumbsCarousels[index].classList.add(uniqueThumbsClass);

		if (gallery.parentElement.classList.contains(CLASS_INITED)) return;

		let productHeroGallery = new Swiper(`.${uniqueGalleryClass} .product-hero__gallery-swiper`, {
		  speed: 350,
			grabCursor: true,
			on: {
				slideChange: function() {
					productHeroThumbs.slideTo(this.activeIndex);
				},
			},
		});

		let productHeroThumbs = new Swiper(`.${uniqueThumbsClass} .product-hero__thumbs-swiper`, {
		  modules: [Navigation, Pagination, EffectFade, Autoplay, Thumbs],
		  speed: 350,
			slidesPerView: 'auto',
		  navigation: {
		    nextEl: `.${uniqueThumbsClass} .product-hero__thumbs-button-next`,
		    prevEl: `.${uniqueThumbsClass} .product-hero__thumbs-button-prev`,
		  },
		  thumbs: {
	  		swiper: productHeroGallery
	  	},
			breakpoints: {
				602: {
					direction: 'vertical',
				}
			},
			on: {
				slideChange: function() {
					productHeroGallery.slideTo(this.activeIndex);
				},
				init: function() {
					this.slides[0].classList.add(CURRENT_THUMB_CLASS)
				}
			},
		});

		function highlightActiveThumb() {
			const thumbs = productHeroThumbs.slides;
			thumbs.forEach(thumb => {
				thumb.classList.remove(CURRENT_THUMB_CLASS);
			})
			thumbs[productHeroGallery.activeIndex].classList.add(CURRENT_THUMB_CLASS);
		}
		productHeroGallery.on('slideChange', highlightActiveThumb);

		productHeroThumbs.slides.forEach((thumb, index) => {
			thumb.addEventListener('click', () => {
				productHeroGallery.slideTo(index);
			})
		})

		gallery.parentElement.classList.add(CLASS_INITED);
	});

});