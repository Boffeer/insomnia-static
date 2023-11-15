"use strict";
/*
	<div class="stepper">
		<button class="stepper__minus" type="button">−</button>
		<label class="stepper__label">Nombre d'invités</label>
		<input type="text" name="guests" class="stepper__value" value="2" max="99">
		<button class="stepper__plus" type="button">+</button>
	</div>
*/

const DEFUALT_STEPPER_MAX = 99;
const steppers = document.querySelectorAll('.stepper');	

const getStepperField = (stepper) => {
	return stepper.querySelector('.stepper__value')
}
const getStepperValue = (stepper) => {
	return +getStepperField(stepper).value;
}
const setStepperValue = (stepper, value) => {
	getStepperField(stepper).value = value
}

const getStepperMax = (stepper) => {
	const stepperMax = getStepperField(stepper).max.trim();

	if (stepperMax === undefined || stepperMax === "") {
		return DEFUALT_STEPPER_MAX;
	}

	return +stepperMax;
}
const isStepperMoreMax = (stepper) => {
	return getStepperValue(stepper) > getStepperMax(stepper) - 1;
}

const getStepperMin = (stepper) => {
	return getStepperField(stepper).min === '' ? 2 : +getStepperField(stepper).min;
}

const isStepperLessMin = (stepper) => {
	return getStepperValue(stepper) < getStepperMin(stepper);
}

const initStepper = (stepper) => {
	const minus = stepper.querySelector('.stepper__minus');
	const value = getStepperField(stepper);
	const plus = stepper.querySelector('.stepper__plus');

	if (!minus && !value && !plus) return;

	value.addEventListener("input", (e) => {
		e.target.value = e.target.value.replaceAll(/\D/g, "");

		plus.disabled = false;
		minus.disabled = false;

		if (isStepperMoreMax(stepper)) {
			setStepperValue(stepper, getStepperMax(stepper));
			plus.disabled = true;
			return;
		}

		let modifier = e.target.value == 1 ? 1 : 2;

		if (isStepperLessMin(stepper)) {
			setStepperValue(stepper, getStepperMin(stepper) - modifier);
			minus.disabled = true;
			return;
		}

		setStepperValue(stepper, getStepperValue(stepper));
	});
	value.addEventListener("blur", (e) => {
		e.target.value = e.target.value.replaceAll(/\D/g, "");

		plus.disabled = false;
		minus.disabled = false;

		if (isStepperMoreMax(stepper)) {
			setStepperValue(stepper, getStepperMax(stepper));
			plus.disabled = true;
			return;
		}
		if (isStepperLessMin(stepper)) {
			setStepperValue(stepper, getStepperMin(stepper) - 1);
			minus.disabled = true;
			return;
		}
		setStepperValue(stepper, getStepperValue(stepper));
	});

	minus.addEventListener("click", (e) => {
		if (isStepperLessMin(stepper)) return;

		const minusEvent = new Event('decrement');
		stepper.dispatchEvent(minusEvent);
	});
	stepper.addEventListener('decrement', (e) => {
		setStepperValue(stepper, getStepperValue(stepper)-1);
		plus.disabled = false;
		minus.disabled = isStepperLessMin(stepper);
	})

	plus.addEventListener("click", (e) => {
		if (isStepperMoreMax(stepper)) return;
		const plusEvent = new Event('increment');
		stepper.dispatchEvent(plusEvent);
	});
	stepper.addEventListener('increment', (e) => {
		setStepperValue(stepper, getStepperValue(stepper)+1)
		minus.disabled = false;
		plus.disabled = isStepperMoreMax(stepper);
	})

	stepper.classList.add('stepper--init');
}
window.initStepper = initStepper;

window.addEventListener('DOMContentLoaded', (event) => {
	steppers.forEach((stepper) => initStepper(stepper));
});
