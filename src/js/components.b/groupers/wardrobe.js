window.addEventListener('DOMContentLoaded', (event) => {
	const debounce = function (fn, time) {
		if (!fn && !time) return;
		let timeout;

		return function () {
			let self = this;
			const functionCall = function () {
				return fn.apply(self, arguments);
			};
			clearTimeout(timeout);
			timeout = setTimeout(functionCall, time);
		};
	};

	const wardrobes = document.querySelectorAll('.wardrobe');
	console.log(wardrobes);

	function uncheckAllItems(checkboxes) {
		checkboxes.forEach(checkbox => {
			if (checkbox.classList.contains('wardrobe__item--total')) return;

			const checkInput = checkbox.querySelector('input[type="radio"]') || checkbox.querySelector('input[type="checkbox"]');
			checkInput.checked = false;
		})
	}

	wardrobes.forEach((wardrobe, filterIndex) => {
		const wardrobeShaft = wardrobe.querySelector(".wardrobe__shaft-lift");
		const wardrobeButtons = wardrobe.querySelectorAll(".wardrobe__item");
		const moreButton = wardrobe.querySelector(".wardrobe__more-button");
		const wardrobeDropdown = wardrobe.querySelector(
			".wardrobe__dropdown"
		);
		const itemTotal = wardrobe.querySelector('.wardrobe__item--total');

		if ([...wardrobeButtons].length > 0) {

			wardrobeButtons.forEach((button) => {
				const input = button.querySelector('input')
				if (!input) return;

				input.addEventListener("change", (e) => {
					if (button.classList.contains('wardrobe__item--total')) {
						uncheckAllItems(wardrobeButtons);
						return;
					}
					itemTotal.querySelector('input').checked = false;
				});
			});

			function moveFiltersToDropdown() {
				wardrobeButtons.forEach((item, index) => {
					if (item.classList.contains('wardrobe__item-total')) return;
					wardrobeDropdown.appendChild(item);
				});
			}
			function moveFiltersToScrollbar() {
				wardrobeButtons.forEach((item, index) => {
					wardrobeShaft.appendChild(item);
				});
			}

			// Перемещает фильтры между дропдауном и скроллбаром
			const WIDTH_MODIFIER = 230;
			function relocateFilterItems() {
				let wardrobeContainerMaxWidth = wardrobe.querySelector(".wardrobe__container").getBoundingClientRect().width - WIDTH_MODIFIER;
				let wardrobeItemsWidth = wardrobe.querySelector(".wardrobe__shaft-lift").getBoundingClientRect().width;
				let wardrobeItemsToSkip = [];


				wardrobeButtons.forEach((item, index, arr) => {
					// Чтобы убрать все большие кнопки, которые больше половины
					const MAX_TAB_CHARACTERS = 25;
					const textItem = item.querySelector('.wardrobe__item-text')
					if (!textItem) return;

					if (textItem.innerText.length > MAX_TAB_CHARACTERS) {
						wardrobeItemsToSkip.push(item);
						item.classList.add('js_wardrobe__item--removed-initially')
						// console.log("Сразу убрать", item.innerText);
					}
				});

				wardrobeButtons.forEach((item, index, arr) => {
					if (item.classList.contains('wardrobe__item-total') || wardrobeItemsToSkip.includes(item)) return;

					if (wardrobeItemsWidth <= wardrobeContainerMaxWidth - 80) {
						wardrobeShaft.appendChild(item);
						wardrobeItemsWidth += item.getBoundingClientRect().width;
						// console.log(filterIndex ,filtersWidth, '/',filtersMaxWidth);
					}
				});

				const hiddenButtonsCount = [...wardrobeDropdown.querySelectorAll('.wardrobe__item')].length;
				if (hiddenButtonsCount == 0) {
					moreButton.style.display = 'none';
				} else {
					moreButton.style.display = '';
				}
			}

			function changeButtonsPosition() {
				if (window.innerWidth < 576) {
					moveFiltersToScrollbar();
				} else {
					moveFiltersToDropdown();
				}
				relocateFilterItems();
			}

			window.addEventListener("resize", () => {
				debounce(changeButtonsPosition(), 200);
			});
			changeButtonsPosition();

			moreButton.addEventListener("click", () => {
				wardrobeDropdown.classList.toggle(
					"wardrobe__dropdown--visible",
				);
				// case.classList.toggle();
			});
			document.addEventListener("click", (e) => {
				if (
					!e.target.closest(".wardrobe__dropdown") &&
					!e.target.closest(".wardrobe__more-button")
				) {
					wardrobeDropdown.classList.remove(
						"wardrobe__dropdown--visible"
					);
				}
			});
		}
	})
});
