window.addEventListener('DOMContentLoaded', (event) => {
  const reviewCards = document.querySelectorAll('.review-card');
  if (reviewCards.length == 0) return;

  reviewCards.forEach(card => {
    const buttonFull = card.querySelector('.review-card__button-more');
    if (!buttonFull) return;
    buttonFull.addEventListener('click', () => {
      const review = {}

      const reviewNameNode = card.querySelector('.review-card__name');
      if (reviewNameNode) {
        review.name = reviewNameNode.innerText;
      }

      const reviewDateNode = card.querySelector('.review-card__date');
      if (reviewDateNode) {
        review.date = reviewDateNode.innerText;
      }

      const reviewRatingNode = card.querySelector('.review-card__rating');
      if (reviewRatingNode) {
        review.rating = reviewRatingNode.innerHTML;
      }

      const reviewTitleNode = card.querySelector('.review-card__title');
      if (reviewTitleNode) {
        review.title = reviewTitleNode.innerHTML;
      }

      const reviewFeedbackNode = card.querySelector('.review-card__feedback');
      if (reviewFeedbackNode) {
        review.feedback = reviewFeedbackNode.innerHTML;
      }

      const reviewSourceUrlNode = card.querySelector('.review-card__source');
      const reviewSourceLogoNode = card.querySelector('.review-card__source-img');
      if (reviewSourceLogoNode && reviewSourceUrlNode) {
        review.sourceUrl = reviewSourceUrlNode.href;
        review.sourceLogo = reviewSourceLogoNode.src;
      }

      const reviewModal = document.querySelector('#modal-review-detail');
      if (reviewModal) {
        const sourceLink = reviewModal.querySelector('.review-card__source');
        sourceLink.href = review.sourceUrl ? review.sourceUrl : '';

        const sourceLogo = reviewModal.querySelector('.review-card__source-img');
        sourceLogo.src = review.sourceLogo ? review.sourceLogo : '';

        const date = reviewModal.querySelector('.review-card__date');
        date.innerHTML = review.date ? review.date : '';

        const name = reviewModal.querySelector('.review-card__name');
        name.innerHTML = review.name ? review.name : '';

        const title = reviewModal.querySelector('.review-card__title');
        title.innerHTML = review.title ? review.title : '';

        const rating = reviewModal.querySelector('.review-card__rating');
        rating.innerHTML = review.rating ? review.rating : '';
        console.log(rating)
        console.log(review.rating)

        const feedback = reviewModal.querySelector('.review-card__feedback');
        feedback.innerHTML = review.feedback ? review.feedback : '';
      }


    });
  });


});
