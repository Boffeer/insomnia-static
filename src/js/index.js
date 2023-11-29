"use strict";

window.barba = barba
import barba from '@barba/core';
import barbaCss from '@barba/css';

// Важно подключить первым, чтобы все быстрее отработало
import "./helpers.b/_quickfix.js"

// import "./components.b/groupers/_bayan.js";

import "./components.b/header/header.js";
import "./components.b/controls/formich.js";
import "./components.b/spawners/b_modal.js";
// import "./components.b/spawners/_b_video.js";
// import "./components.b/controls/_button-sticky.js";
// import "./components.b/lego/wysiwyg.js";

import "./components.b/controls/b_tabs.js";
import "./components.insm/_accordion-carousel.js";
import "./components.insm/_single-article.js";
import "./components.insm/_training.js";

// import "./components.sklh/_price-table.js";
// import "./components.sklh/_quiz.js";
// import "./components.sklh/_review-card.js";

// import "./components.sklh/_blinds-carousel.js";

// import "./sections.sklh/_portfolio-gallery.js";
// import "./sections.sklh/_problems.js";
// import "./sections.sklh/_team.js";

// import "./sections.sklh/_content-reviews.js";

// barba.init({
// 	transitions: [{
//     name: 'default-transition',
//     leave(data) {
//     	console.log(data)
//       // create your stunning leave animation here
//     },
//     enter(data) {
//     	console.log(data)
//       // create your amazing enter animation here
//     }
//   }]
// });

window.addEventListener('DOMContentLoaded', (event) => {
  barba.use(barbaCss);
  barba.init({
    debug: true,
    views: [{
      namespace: 'clip',
      beforeEnter() {
        // update the menu based on user navigation
        // menu.update();
        console.log('before endter')
      },
      afterEnter() {
        // refresh the parallax based on new page content
        // parallax.refresh();
        console.log('after endter')
      }
    }],
    transitions: [
      {
        name: "clip",
        sync: !0,
        to: {
          namespace: ["clip"]
        },
        leave: function(data) {},
        enter: function(data) {}
      }
    ],
  });
});
