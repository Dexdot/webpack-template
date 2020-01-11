export const siblings = el =>
  [...el.parentElement.children].filter(c => c !== el);

export const nodeIndex = el => [...el.parentNode.children].indexOf(el);

export const qs = (selector, ctx = document) => ctx.querySelector(selector);

export const qsa = (selector, ctx = document) =>
  Array.from(ctx.querySelectorAll(selector));

export const each = (selector, cb) => {
  const elements = qsa(selector);

  if (elements.length <= 0) return false;

  elements.forEach((el, i) => {
    cb(el, i);
  });
};

export const delegate = (selector, resolve, reject, ev = 'click') => {
  document.addEventListener(
    ev,
    e => {
      const el = e.target.closest(selector);

      if (el) {
        resolve(e, el);
      } else if (reject) {
        reject(e);
      }
    },
    false
  );
};

export const dispatch = (
  { el, name, detail } = { el: document, name: '', detail: null }
) => {
  if (!name) throw new Error('Event name not set');

  if (detail) {
    el.dispatchEvent(new CustomEvent(name, { detail }));
  } else {
    el.dispatchEvent(new Event(name));
  }
};
