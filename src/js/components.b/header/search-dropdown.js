import {isClickedBeyond} from "../../b_helpers/condition-helpers.js";

window.addEventListener('DOMContentLoaded', (event) => {
	const header = document.querySelector('.header');
	const headerSearch = document.querySelector('.header-shoppers__search');
	const searchField = headerSearch.querySelector('.search__field');

	function openSearch(e) {
		headerSearch.classList.add('_opened')

		setTimeout(()=> {
			window.addEventListener('click', closeDropdownOnBeyond)
			searchField.focus();
		}, 300)
	}
	
	function closeSearch(e) {
		headerSearch.classList.remove('_opened')

		setTimeout(()=> {
			window.removeEventListener('click', closeDropdownOnBeyond)
			searchField.blur();
		}, 300)
	}

	function closeDropdownOnBeyond(e) {
		const isClickedBeyondDropdown = isClickedBeyond(e, 'header-shoppers__dropdown')

		if (headerSearch.classList.contains('_opened') && isClickedBeyondDropdown) {
			closeSearch(e);
		}
	}

	headerSearch?.addEventListener('click', (e) => {
		event.preventDefault();

		const isSearchIconClicked = !isClickedBeyond(e, 'header-shoppers__item-icon')

		if (isSearchIconClicked && headerSearch.classList.contains('_opened')) {
			closeSearch(e);
			return;
		}

		openSearch(e);
	})

	header.addEventListener('hide-header', (e) => {
		closeSearch(e)
	})
});