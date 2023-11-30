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


window.addEventListener('DOMContentLoaded', (event) => {
  let enableBarbaTransitions = true;

  barba.use(barbaCss);

  const BARBA_CONFIG = {
    // debug: true,
    views: [{
      namespace: 'clip',
      beforeEnter(e) {
        // console.log(e)
        // if (!enableBarbaTransitions) {
        //   console.log('prevent')
        //   enableBarbaTransitions = true;
        //   e.next.transition.prevent();
        //   return;
        // }
      },
      afterEnter(e) {
        if (e.next.url.path.startsWith('/news/') && e.next.url.path.indexOf('/news/') !== e.next.url.path.length - '/news/'.length) {
          b_modal.openPop('modal-news');
        }

        if (e.next.url.path.startsWith('/news/')) {
          const newsCards= [...document.querySelectorAll('.accordion-carousel__slide .news-card')];
          newsCards.forEach(card => {
            card.addEventListener('click', async () => {
              const formData = new FormData();
              formData.append('action', 'get_modal_news');
              formData.append('id', card.dataset.id);

              let request = await fetch(window.m_ajax.url, {
                method: "POST",
                body: formData,
              });
              let response = await request.json();
              let {thumb, title, content, slug} = response.post;

              const modalNews = document.querySelector('#modal-news');
              const img = modalNews.querySelector('.modal-news__media-img')
              if (thumb) {
                img.closest('.modal-news__media').classList.remove('is-hidden');
              } else {
                img.closest('.modal-news__media').classList.add('is-hidden');
              }
              img.src = thumb;
              modalNews.querySelector('.modal-news__title').innerHTML =  title;
              modalNews.querySelector('.modal-news__content').innerHTML = content;

              updateSlug(slug)

              b_modal.openPop('modal-news');
            })
          })
        }
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
  }

  barba.init(BARBA_CONFIG);

  function updateSlug(slug) {
    enableBarbaTransitions = false;
    let currentPath = window.location.pathname;
    let newPath;
    if (currentPath === '/news/') {
      newPath = '/news/' + slug;
    } else {
      newPath = currentPath.replace(/\/news\/[^\/]+/, '/news/' + slug);
    }
    window.history.pushState({}, '', newPath + window.location.hash);
  }

});
