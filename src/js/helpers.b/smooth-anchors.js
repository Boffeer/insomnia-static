function getTopOffset(percents = 100) {
  return window.innerHeight / 100 * percents;
}

function isMenuLinkClicked(link) {
  return link.classList.contains('menu__nav-link') || link.classList.contains('header__nav-link');
}

function scrollTosectionToScroll(percents = 9) {
  const linkElems = [...document.querySelectorAll('[href^="#"]')]
  if (linkElems.length == 0) return;

  linkElems.forEach(link => {
    // for (let i = 0; i < linkElems.length; i++) {
    //   const link = linkElems[i];
    let href = link.getAttribute('href')
    if (!href || href == "#") return;
    let sectionToScroll = document.querySelector(href)
    if (!sectionToScroll) {
      link.href = `${window.location.origin}${href}`;
      return;
    }

    link.addEventListener('click', (e) => {
      e.preventDefault()
      let href = link.getAttribute('href')
      if (!href || href == "#") return;
      let sectionToScroll = document.querySelector(href)
      if (!sectionToScroll) return;
      if (sectionToScroll.classList.contains('poppa')) return;
      if (sectionToScroll.classList.contains('b_modal')) return;

      if (isMenuLinkClicked(link)) {
        window.closeBurger();
      }
      window.scroll({
        top: sectionToScroll.getBoundingClientRect().top + pageYOffset - getTopOffset(percents),
        left: 0,
        behavior: 'smooth'
      })
    })
    // }
  });
}

scrollTosectionToScroll(0);

window.onload = function () {
  if (!window.location.hash || window.location.hash == '#') return;

  let block = document.getElementById(window.location.hash.substring(1));
  if (!block) return;

  window.scroll({
    top: block.getBoundingClientRect().top + window.pageYOffset,
    left: 0,
    behavior: 'smooth'
  })
  window.location.hash = "";
}
