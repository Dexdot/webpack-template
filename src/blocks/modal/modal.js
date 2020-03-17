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
    const modal = $.qs(`[data-modal="${el.dataset.modalOpen}"]`);
    if (!modal) return false;

    open(modal);
  });

  // Close
  $.delegate(`[data-modal-close]`, (e, el) => {
    const modal = $.qs(`[data-modal="${el.dataset.modalClose}"]`);
    if (!modal) return false;

    close(modal);
  });
};

export function open(el) {
  const modalName = el.dataset.modal;
  $.qs('body').classList.add(`modal-${modalName}-active`);

  $.dispatch({
    el: document,
    name: 'beforeModalOpen',
    detail: { modalName }
  });

  scroll.disable(el);
  el.classList.add('modal--active');
  window.addEventListener('keydown', onEscape);

  $.dispatch({
    el: document,
    name: 'afterModalOpen',
    detail: { modalName }
  });
}

export function close(el) {
  const modalName = el.dataset.modal;
  $.qs('body').classList.remove(`modal-${modalName}-active`);

  $.dispatch({
    el: document,
    name: 'beforeModalClose',
    detail: { modalName }
  });

  scroll.enable();
  el.classList.remove('modal--active');
  window.removeEventListener('keydown', onEscape);

  $.dispatch({
    el: document,
    name: 'afterModalClose',
    detail: { modalName }
  });
}
