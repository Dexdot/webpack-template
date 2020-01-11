import scroll from '~/js/helpers/stop-scroll';

const onEscape = e => {
  if (e.keyCode === 27) {
    const el = $.qs('.modal--active');

    if (!el) return false;

    const { modal } = el.dataset;
    close(el, modal);
  }
};

export const init = () => {
  // Open
  $.delegate(`[data-modal-open]`, (e, el) => {
    const name = el.dataset.modalOpen;
    const modal = $.qs(`[data-modal="${name}"]`);
    open(modal, name);
  });

  // Close
  $.delegate(`[data-modal-close]`, (e, el) => {
    const name = el.dataset.modalClose;
    const modal = $.qs(`[data-modal="${name}"]`);
    close(modal, name);
  });
};

export function open(el, modal) {
  $.qs('body').classList.add(`modal-${modal}-active`);
  $.dispatch({
    el: document,
    name: 'beforeModalOpen',
    detail: { modal }
  });

  scroll.disable(el);
  el.classList.add('modal--active');
  window.addEventListener('keydown', onEscape);

  $.dispatch({
    el: document,
    name: 'afterModalOpen',
    detail: { modal }
  });
}

export function close(el, modal) {
  $.qs('body').classList.remove(`modal-${modal}-active`);
  $.dispatch({
    el: document,
    name: 'beforeModalOpen',
    detail: { modal }
  });

  scroll.enable();
  el.classList.remove('modal--active');
  window.removeEventListener('keydown', onEscape);

  $.dispatch({
    el: document,
    eventName: 'afterModalOpen',
    detail: { modal }
  });
}
