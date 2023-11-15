import Swiper, { Navigation, Pagination, EffectCreative } from "swiper";

window.addEventListener('DOMContentLoaded', (event) => {
	const quiz = document.querySelector('.quiz');
	if (!quiz) return;


	const swiperConfig = {
		speed: 450,
		autoHeight: true,
		allowTouchMove: false,
		slidesPerView: 1,
	  modules: [Navigation, Pagination, EffectCreative],
	  spaceBetween: 10,
		effect: "creative",
    creativeEffect: {
      prev: {
        shadow: true,
        translate: ["-20%", 0, -1],
        opacity: 0,
      },
      next: {
        translate: ["110%", 0, 0],
      },
    },

	  pagination: {
	    el: ".quiz__progress-pagination",
	    clickable: false,
	  },
	  navigation: {
	    // nextEl: ".quiz__button-next",
	    prevEl: ".quiz__button-prev",
	  },
	  on: {
	  	init() {
	  		initSwiperProgress(this);
	  		handleRadioChange(this);
	  		handleSlideNext(this)
	  	},
	  }
	}

	let quizSwiper = new Swiper('.quiz__swiper', swiperConfig);

	quizSwiper.on('slideChange', () => {
		updateSwiperProgress(".quiz__progress-value-current");

		if (isPassedHalfSlides(quizSwiper)) {
			dispatchQuizEvent('half-slides-passed');
		}

		handleQuizFinishing(quizSwiper)
	})

	function handleSlideNext(context) {
		const nextButton = context.el.closest('.quiz').querySelector('.quiz__button-next')
		if (!nextButton) return;

		nextButton.addEventListener('click', () => {
			let currentSlideIndex = context.activeIndex;
			let currentQuestion = context.slides[currentSlideIndex];

			const answersToValidate = currentQuestion.querySelectorAll('[required]');
			answersToValidate.forEach(answer => {
				const input = answer.closest('.js_form__control');
				if (!input._formich) return;
				input._formich.validate();
			})
			const hasInvalid = currentQuestion.querySelector('.is-invalid');
			if (hasInvalid) return;

			context.slideNext();
			// context.allowSlideNext
		})
	}


	function handleRadioChange(context) {
		context.el.querySelectorAll('input[type="radio"]').forEach(radio => {
			radio.addEventListener('change', () => {
				setTimeout(() => {
					context.slideNext();
				}, 400)
			})
		})
	}

	function initSwiperProgress(context) {
		const progressCurrentValueElement = quiz.querySelector('.quiz__progress-value-current');
		progressCurrentValueElement.innerText = context.activeIndex + 1;

		const progressMaxValueElement = quiz.querySelector('.quiz__progress-value-max');
		progressMaxValueElement.innerText = context.slides.length;

		const progressValueElement = quiz.querySelector('.quiz__progress-value');
		progressValueElement.classList.remove('is-hidden');
	}

	function updateSwiperProgress(currentValueSelector) {
		const currentValueElement = quizSwiper.el.closest('.quiz').querySelector(currentValueSelector);
		if (!currentValueElement) return;

		currentValueElement.innerText = quizSwiper.activeIndex + 1;
	}

	function handleQuizFinishing(context) {
		const CURRENT_SLIDE = context.activeIndex + 1;
		const LAST_SLIDE_INDEX = context.slides.length;

		if (CURRENT_SLIDE === LAST_SLIDE_INDEX) {
			// console.log('последний')
			dispatchQuizEvent('slide-last')
			quiz.classList.add('quiz--slide-final')
		} else {
			dispatchQuizEvent('slide-not-last')
			quiz.classList.remove('quiz--slide-final')
		}

		if (CURRENT_SLIDE === LAST_SLIDE_INDEX - 1) {
			// console.log('предпоследний')
			dispatchQuizEvent('slide-before-last')
		}
	}

	function dispatchQuizEvent(eventName, data = {}) {
		const event = new CustomEvent(eventName, {
		  detail: data,
		  bubbles: true, // Allow event to bubble up the DOM tree
		  cancelable: true // Allow event to be canceled
		});
		quiz.dispatchEvent(event);
	}

	function isPassedHalfSlides(swiperVar) {
		const HALF_SLIDES = Math.ceil(swiperVar.slides.length / 2);
		const CURRENT_SLIDE = swiperVar.activeIndex + 1;

		if (CURRENT_SLIDE === HALF_SLIDES + 1) return true;
	}

	quiz.addEventListener('half-slides-passed', () => {
		// console.log('half')
	})
	quiz.addEventListener('slide-last', () => {
		// console.log('slide-last')
	})
	quiz.addEventListener('slide-before-last', () => {
		// console.log('slides-before-last')
	})

  quiz.addEventListener('submit-success', () => {
    setTimeout(() => {
      quizSwiper.slideTo(0);
    }, 5000);
  })


});
