```js
<script>
  // let lastScrollTop = 0;
  function updateScrollTop() {
    let scrollTop = window.scrollY;
    // let move = (scrollTop - lastScrollTop) / 2; // adjust the speed here
    // background.css('transform', 'translate3d(0, ' + move + 'px, 0)');
    banner.style.cssText = `--scroll-top: ${scrollTop}px`
    // lastScrollTop = scrollTop;
    requestAnimationFrame(updateScrollTop);
  }
  const banner = document.querySelector('.banner');
  window.addEventListener('scroll', () => {
    updateScrollTop();
  })
</script>
```

```scss
  transform: translateY(#{'calc(-50vh + var(--scroll-top) / 20)'});
  object-fit: cover;

  @media (max-width: $phone) {
    transform: translateY(#{'calc(-50vh + var(--scroll-top) / 4)'});
    // background-position: center #{'calc(-50vh + var(--scroll-top) / 4)'};
  }

```
