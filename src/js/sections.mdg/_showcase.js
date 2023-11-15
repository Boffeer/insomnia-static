window.addEventListener('DOMContentLoaded', (event) => {
	const showcaseSections = document.querySelectorAll('.showcase');
	const SHOWCASE_CLASSES = {
		cardCurrent: 'showcase-card--opened',
		cardInited: 'showcase-card--inited',
		sectionHasOpened: 'showcase--has-opened',
	}
	const HEIGHT_MODIFIER = 0;

	showcaseSections.forEach(showcase => {
		initShowcase(showcase);
	})

	let prevWidth = window.innerWidth
	window.addEventListener('resize', (e) => {
		if (window.prevWidth == innerWidth) return;

		showcaseSections.forEach(showcase => {
			initShowcase(showcase);
		})

		prevWidth = window.innerWidth;
	}) 

	function initShowcase(showcase) {
		if (showcase.classList.contains('product__related')) return;
		if (showcase.classList.contains('showcase--no-hover')) return;
		
		const cards = [...showcase.querySelectorAll('.showcase-card')];

		let cardsHeights = cards.map((currentCard) => {
			currentCard.querySelector('.showcase-card__body').style.height = '';
			return currentCard.querySelector('.showcase-card__body').getBoundingClientRect().height;
		})
		let maxCardsHeight = Math.max(...cardsHeights);
		cards.forEach((currentCard, index) => {
			currentCard.querySelector('.showcase-card__body').style.height = `${maxCardsHeight + HEIGHT_MODIFIER}px`;
			if (currentCard.classList.contains(SHOWCASE_CLASSES.cardInited)) return;
			
			currentCard.dataset.key = 'showcase-card-' + index;
			currentCard.addEventListener('click', (e) => {
				handleCard(showcase, currentCard, cards);
			});
			currentCard.addEventListener('mouseover', (e) => {
				handleCard(showcase, currentCard, cards);
			});

			currentCard.classList.add(SHOWCASE_CLASSES.cardInited);
		});
	}

	function handleCard(showcase, currentCard, cards) {
		if (!showcase.classList.contains(SHOWCASE_CLASSES.sectionHasOpened)) {
			if (window.innerWidth > window.screenWidth.laptop) {
				showcase.classList.add(SHOWCASE_CLASSES.sectionHasOpened);
			}
		}
		document.body.dataset.theme = currentCard.dataset.theme;
		showcase.dataset.theme = currentCard.dataset.theme;

		if (window.innerWidth > window.screenWidth.laptop) {
			currentCard.classList.add(SHOWCASE_CLASSES.cardCurrent);
		}
		cards.forEach(card => {
			if (card.dataset.key == currentCard.dataset.key) return;
			card.classList.remove(SHOWCASE_CLASSES.cardCurrent);
		})
	}
});