import { Datepicker } from 'vanillajs-datepicker';
import ru from 'vanillajs-datepicker/locales/ru';

window.addEventListener('DOMContentLoaded', (event) => {
	const calendars = document.querySelectorAll('.input-calendar .input__field');

	Object.assign(Datepicker.locales, ru);
	calendars.forEach(calendar => {
		const datepicker = new Datepicker(calendar, {
			language: 'ru',
			locale: ru,
			format: 'dd.mm.yyyy',
	    // autohide: true,
		  // keyboardNav: false,
		}); 	

		// calendar.addEventListener('changeDate', () => {
		// 	datepicker.hide();
		// })

	  // calendar.addEventListener("focus", function() {
	  //   this.blur();
		// 	datepicker.hide();
	  // });
	})
});