module.exports = function imageGallery(el, props) {
  const current = document.querySelector(props.main);
  const imgs = document.querySelectorAll(props.thumbs);
  const opacity = 0.6;

  // Set first img opacity
  imgs[0].style.opacity = opacity;

  imgs.forEach(img => img.addEventListener('click', imgClick));

  function imgClick(e) {
  // Reset the opacity
  imgs.forEach(img => (img.style.opacity = 1));
  // Change current image for source of clicked image
  current.src = e.target.src;

  // Add fade in class
  current.classList.add('fade-in');

  // Remove fade-in class after .5 seconds
  setTimeout(() => current.classList.remove('fade-in'), 500)

  // Change the opacity to opacity var
  e.target.style.opacity = opacity;
  }
}
