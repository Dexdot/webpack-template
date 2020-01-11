// Options
const options = {
  threshold: [0, 0.25, 0.5, 0.75, 1]
};

const animateItem = item => item.target.classList.add('visible');

// Create observer
const observer = new IntersectionObserver(items => {
  items.forEach(item => {
    if (item.isIntersecting) {
      animateItem(item);
    }
  });
}, options);

// Start observe
const elements = document.querySelectorAll('.js-observe');

elements.forEach(el => {
  observer.observe(el);
});
