export default class Slider {
  constructor(el, loop = false) {
    this.loop = loop;

    this.DOM = { el };
    this.DOM.slides = Array.from(this.DOM.el.children);
    [this.DOM.active] = this.DOM.slides;
    this.showSlide();

    this.index = 0;

    this.event = {
      update: {
        begin: new CustomEvent('slider:updatebegin', { detail: this }),
        complete: new CustomEvent('slider:updatecomplete', { detail: this })
      },
      prev: {
        begin: new CustomEvent('slider:prevbegin', { detail: this }),
        complete: new CustomEvent('slider:prevcomplete', { detail: this })
      },
      next: {
        begin: new CustomEvent('slider:nextbegin', { detail: this }),
        complete: new CustomEvent('slider:nextcomplete', { detail: this })
      }
    };
  }

  updateNoEvent(i) {
    // Hide slides
    this.hideSlides();

    // Set new index and active slide
    this.index = i;
    this.DOM.active = this.DOM.slides[this.index];

    // Show active slide
    this.showSlide();

    // Exit
    return true;
  }

  update(action, i) {
    if (Number.isInteger(i)) {
      // Dispatch update:begin
      this.DOM.el.dispatchEvent(this.event.update.begin);

      // Hide slides
      this.hideSlides();

      // Set new index and active slide
      this.index = i;
      this.DOM.active = this.DOM.slides[this.index];

      // Show active slide
      this.showSlide();

      // Dispatch update:complete
      this.DOM.el.dispatchEvent(this.event.update.complete);

      // Exit
      return true;
    }

    // Dispatch update:begin
    this.DOM.el.dispatchEvent(this.event.update.begin);

    // Hide slides
    this.hideSlides();

    switch (action) {
      case 'prev':
        if (this.loop) {
          this.index =
            this.index <= 0 ? this.DOM.slides.length - 1 : this.index - 1;
        } else if (this.index > 0) this.index = this.index - 1;
        break;
      case 'next':
        if (this.loop) {
          this.index =
            this.index === this.DOM.slides.length - 1 ? 0 : this.index + 1;
        } else if (this.index < this.DOM.slides.length - 1)
          this.index = this.index + 1;
        break;

      default:
        break;
    }

    // Set active slide
    this.DOM.active = this.DOM.slides[this.index];

    // Show active slide
    this.showSlide();

    // Dispatch update:complete
    this.DOM.el.dispatchEvent(this.event.update.complete);

    // Exit
    return true;
  }

  prev() {
    this.DOM.el.dispatchEvent(this.event.prev.begin);
    this.update('prev');
    this.DOM.el.dispatchEvent(this.event.prev.complete);
  }

  next() {
    this.DOM.el.dispatchEvent(this.event.next.begin);
    this.update('next');
    this.DOM.el.dispatchEvent(this.event.next.complete);
  }

  hideSlides() {
    this.DOM.slides.forEach(slide => {
      slide.classList.remove('active');
    });
  }

  showSlide() {
    this.DOM.active.classList.add('active');
  }
}
