'use strict'

window.addEventListener("DOMContentLoaded", (event) => {

  function initUseBg() {
    const useBg = document.querySelectorAll('.js_use-bg');
    useBg.forEach(bg => {
      if (bg.dataset.useBg) {
        bg.style.backgroundImage = `url(${bg.dataset.useBg})`;
        return;
      }

      const insideBgs = bg.querySelectorAll('[data-use-bg]');
      insideBgs.forEach(bg => {
        bg.style.backgroundImage = `url(${bg.dataset.useBg})`;
      })
    })
  }

  initUseBg();
  window.barba.hooks.after((e) => {
    initUseBg();
  });
});

