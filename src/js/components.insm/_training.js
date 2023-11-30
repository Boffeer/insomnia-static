"use strict"
import Swiper, { Navigation, Pagination, EffectCreative } from "swiper";

window.addEventListener('DOMContentLoaded', (event) => {

  function initCarousel() {
    const carousel = document.querySelector('.training-carousel');

    if (!carousel) return;

    const swiperConfig = {
      autoHeight: true,
      speed: 450,
      slidesPerView: 2.2,
      slidesPerGroup: 2,
      modules: [Navigation, Pagination, EffectCreative],
      spaceBetween: 20,

      pagination: {
        el: `.training-carousel__pagination`,
        clickable: true,
      },

      lazy: {
        loadPrevNext: true, // pre-loads the next image to avoid showing a loading placeholder if possible
        loadPrevNextAmount: 2 //or, if you wish, preload the next 2 images
      },

      breakpoints: {
        992: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 30,
        }
      }
    }

    let swiperCarousel = new Swiper(`.training-carousel__swiper`, swiperConfig);
    swiperCarousel.slideTo(0);
  }

  async function fetchTrainer(id) {
    const formData = new FormData();
    formData.append('action', 'get_trainer');
    formData.append('id', id);

    let request = await fetch(window.m_ajax.url, {
      method: "POST",
      body: formData,
    });
    let response = await request.json();

    return response;
  }

  function placeTrainerData(modal, response) {
    let {thumb, name, content, prev, next} = response.post;
    modal.querySelector('.modal-trainer__media-img').src = thumb;
    modal.querySelector('.modal-trainer__title').innerHTML = name;
    modal.querySelector('.modal-trainer__content').innerHTML = content;

    const buttonPrev = modal.querySelector('.modal-trainer__button-prev');
    const buttonNext = modal.querySelector('.modal-trainer__button-next');

    buttonPrev.dataset.id = prev;
    buttonNext.dataset.id = next;
  }

  function initTrainerCards() {
    const cards = document.querySelectorAll('.trainer-card');
    cards.forEach(card => {
      card.addEventListener('click', async () => {
        const modalTrainer = document.querySelector('#modal-trainer');

        let response = await fetchTrainer(card.dataset.id);
        placeTrainerData(modalTrainer, response);

        const buttonPrev = modalTrainer.querySelector('.modal-trainer__button-prev');
        const buttonNext = modalTrainer.querySelector('.modal-trainer__button-next');
        const CARD_LOADING = 'modal-trainer--loading'
        const blurCard = ()  => {
          modalTrainer.classList.add(CARD_LOADING)
        }

        const focusCard = () => {
          setTimeout(() => {
            modalTrainer.classList.remove(CARD_LOADING)
          }, 100);

          let modalElement = document.querySelector('.b_modal__overlay._show .b_modal__aligner');
          modalElement.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
        }

        buttonPrev.addEventListener('click', async () => {
          blurCard();

          let response = await fetchTrainer(buttonPrev.dataset.id);
          placeTrainerData(modalTrainer, response);

          focusCard();
        });
        buttonNext.addEventListener('click', async () => {
          blurCard();

          let response = await fetchTrainer(buttonNext.dataset.id);
          placeTrainerData(modalTrainer, response);

          focusCard();
        });


        b_modal.openPop('modal-trainer');
      })
    })
  }
  initCarousel();
  initTrainerCards();

  window.barba.hooks.after((e) => {
    if (!e.next.url.path.includes('training')) return;

    setTimeout(() => {
      initCarousel();
      initTrainerCards();
    }, 100)
  });
});
