const body = document.querySelector('body');
let top = 0;
let lock = false;

const disable = () => {
  if (lock) return false;
  lock = true;

  top = window.pageYOffset;
  body.style.top = `-${top}px`;
  body.classList.add('no-scroll');
};

const enable = () => {
  if (!lock) return false;
  lock = false;

  body.style.top = '';
  body.classList.remove('no-scroll');

  setTimeout(() => {
    window.scrollTo(0, top);
  }, 0);
};

export default { disable, enable };
