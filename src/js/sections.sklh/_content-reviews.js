window.addEventListener('DOMContentLoaded', (event) => {
	const contentReviewElements = [...document.querySelectorAll('.content-reviews')];
	contentReviewElements.forEach((review, index) => {
		initReviewsSection(review);
	});

	function initReviewsSection(review) {
		if (review.classList.contains('content-reviews--init')) return;


		if (isNeededDropdown(review) == false) return;
		const desc = review.querySelector('.content-reviews__desc');
		const descBound = desc.getBoundingClientRect();
		
		const feedback = desc.querySelector('.content-reviews__feedback');
		const feedbackBound = feedback.getBoundingClientRect();

		const moreButton = document.createElement('button')
		moreButton.type = 'button';

		let textShow = review.dataset.moreButtonTextShow;
		textShow = textShow == undefined ? 'Развернуть' : textShow;
		review.dataset.moreButtonTextShow = textShow

		let textHide = review.dataset.moreButtonTextHide;
		textHide = textHide == undefined ? 'Свернуть' : textHide;
		review.dataset.moreButtonTexthide = textHide

		moreButton.innerText = textShow

		moreButton.classList.add('content-reviews__button-fold', 'js_spawned');
		desc.appendChild(moreButton)
		moreButton.addEventListener('click', () => {
			if (isReviewClosed(review)) {
				moreButton.innerText = textHide;
				openReview(review)
			} else {
				moreButton.innerText = textShow;
				closeReview(review)
			}
		})

		closeReview(review);


		review.classList.add('content-reviews--init');
	}

	function isReviewClosed(review) {
		return review.classList.contains('content-reviews--closed');
	}

	function openReview(review) {
		review.classList.remove('content-reviews--closed');

		return review
	}

	function closeReview(review) {
		review.classList.add('content-reviews--closed');

		return review
	}

	function isNeededDropdown(review) {
		const desc = review.querySelector('.content-reviews__feedback');
		const descBound = desc.getBoundingClientRect();

		const media = review.querySelector('.content-reviews__media-video')
		const mediaBound = media.getBoundingClientRect();

		// Если описание хотяб как полторы media
		// console.log(descBound.height, (mediaBound.height * 1.3))
		if (descBound.height >= (mediaBound.height * 1.3)) {
			return true;
		}

		return false;
	}

	window.initReviewsSections = () => {
		const contentReviewElements = [...document.querySelectorAll('.content-reviews')];
		contentReviewElements.forEach((review, index) => {
			initReviewsSection(review);
		});
	}
});