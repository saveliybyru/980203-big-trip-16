import { createElement } from '../render.js';

const emptyEventsTemplate = () => (
  '<p class="trip-events__msg">Click New Event to create your first point</p>'
);

class EmptyEventsView {
  #element = null;

  get element(){
    if (!this.#element){
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  get template(){
    return emptyEventsTemplate();
  }

  removeElement(){
    this.#element = null;
  }
}

export default EmptyEventsView;
