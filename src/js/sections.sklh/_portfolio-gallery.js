import {getClickedNotBeyondElement} from "../helpers.b/get-helpers.js";

window.addEventListener('DOMContentLoaded', (event) => {
	const portfolioGallery = document.querySelector('.portfolio-gallery');
	if (!portfolioGallery) return;

	const CARDS_CLASSES = {
		active: 'portfolio-gallery-card--active',
	}
	const portfolioCards = [...document.querySelectorAll('.portfolio-gallery-card')];
	portfolioCards.forEach(card => {
		card.addEventListener('click', handleActivateCard)
		card.addEventListener('mouseover', handleActivateCard)
		card.addEventListener('mouseout', (e) => {
			handleDeactivateCard(card);
		})
	});

	window.addEventListener('click', (e) => {
		const card = getClickedNotBeyondElement(e, 'portfolio-gallery-card');

		let video = 'no-video';
		if (card != false) {
			video = card.querySelector('.b_video');
		}
		// console.log(video)
		if (card) return;

		// const video = card.querySelector('.')
		// if (card.querySelector())
		handleDeactivateCard(card);
	});


	function handleActivateCard(e) {
		const card = this;

		portfolioCards.forEach(card => {
			if (card.classList.contains(CARDS_CLASSES.active)) return;
			disableCard(card)
		})
		card.classList.add(CARDS_CLASSES.active)

		const video = card.querySelector('.b_video');
		if (video) {
			if (!video.classList.contains('b_video--inited')) return;
			video._b_video.playVideo();
		}
	}

	function handleDeactivateCard(card) {
		portfolioCards.forEach(card => {
			disableCard(card)
		})
		const activeCard = document.querySelector(`.${CARDS_CLASSES.active}`);
		if (!activeCard) return;
		activeCard.classList.remove(CARDS_CLASSES.active)
	}

	function disableCard(card) {
		if (!card.classList.contains(CARDS_CLASSES.active)) return;
		card.classList.remove(CARDS_CLASSES.active);
		const video = card.querySelector('.b_video');
		if (video) {
			// if (card.classList.contains(CARDS_CLASSES.active)) return
			// console.log(video)
			video._b_video.pauseVideo();
		}
	}
});
