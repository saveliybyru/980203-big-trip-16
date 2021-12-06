import { createElement } from '../render.js';

const createEventListTemplate = () => (
  '<ul class="trip-events__list"></ul>'
);

class EventListView {
  #element = null;

  get element(){
    if (!this.#element){
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  get template(){
    return createEventListTemplate();
  }

  removeElement(){
    this.#element = null;
  }
}

export default EventListView;
