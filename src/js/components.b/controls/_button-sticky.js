// import {isElementInViewport} from "../../helpers.b/condition-helpers.js";

const sectionRegister = document.querySelector("#register");
const buttonRegister = document.querySelector('.button-sticky')
function isSectionVisible(section) {
	if (window.scrollY > 50) {
		buttonRegister.classList.add('button-sticky--active')
	} else {
		buttonRegister.classList.remove('button-sticky--active')
	}

	const bound = section.getBoundingClientRect();
	// console.log(bound)
	if (bound.y < 100 &&
			-bound.y < (bound.height / 2)
	) {
	  buttonRegister.classList.add('button-sticky--hidden')
	} else {
	  buttonRegister.classList.remove('button-sticky--hidden')
	}

	// if (isElementInViewport(section)) {
	  // console.log("Блок находится в пределах видимости");
	  // buttonRegister.classList.add('button-sticky--hidden')

	// } else {
	  // console.log("Блок не находится в пределах видимости");
	  // buttonRegister.classList.remove('button-sticky--hidden')
	// }
}

buttonRegister.addEventListener('click', () => {
	const sectionBayan = document.querySelector('#register .section__bayan');
	if (sectionBayan) {
		sectionBayan.openBayan();
	}
})

window.addEventListener('scroll', () => {
	isSectionVisible(sectionRegister)
});
isSectionVisible(sectionRegister)
