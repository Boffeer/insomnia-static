import "./_use-bg.js"
import "./apple-helpers.js"
import "./smooth-anchors.js"

import "../libs/lazyload.min.js";
let lazyLoadInstance = new LazyLoad();
window.lazyLoad = lazyLoadInstance;
//*/

/*
  Размеры как в variables.scss
*/
window.screenWidth = {
  laptop: 1100,
}


/*
import { Fancybox, Carousel } from "@fancyapps/ui";
import { Fancybox, Carousel, Panzoom } from "@fancyapps/ui";
Fancybox.bind('[data-fancybox]', {
  Toolbar: {
    display: [
      "close",
    ],
  },
});
//*/

/**
 * Маска телефона
 */
/*
import "../libs/inputmask.js";
const telInputs = document.querySelectorAll('input[type="tel"]');
telInputs.forEach(tel => {
  const maskOptions = {
    mask: '+7(999) 999-99-99',
    inputmode: 'tel',
  };

  new Inputmask(maskOptions).mask(tel);
})
//*/

import "../components.b/controls/copyclicker.js"
const phones = document.querySelectorAll('a[href^="tel:"]');
phones.forEach((phone) => {
  phone.classList.add('js_copyclicker');
});
//*/


/*
import AOS from "aos";
window.aos = AOS;
window.aos.init({
  offset: 50
});
setTimeout(() => {
  window.aos.refresh();
}, 5000)
//*/


// import "./swiper-helpers.js"
