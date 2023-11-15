import "../libs/masonry.pkgd.min.js";
window.addEventListener('DOMContentLoaded', (event) => {
const reviewsMasonryContainer = document.querySelector('.reviews__masonry');
	if (reviewsMasonryContainer) {
	  let reviewsMasonry = new Masonry(reviewsMasonryContainer, {
	      // options...
	      itemSelector: '.review-card',
	      gutter: 30,
	      columnWidth: '.review-card',
	      percentPosition: true
	  });
	  window.reviewsMasonry = reviewsMasonry
	  reviewsMasonry.layout();

	  let previousWidth = window.innerWidth;
	  window.addEventListener('resize', function() {
	    const currentWidth = window.innerWidth;
	    if (currentWidth === previousWidth) return;

	    reviewsMasonry.layout();
	    previousWidth = currentWidth;
	  });
	}

});
