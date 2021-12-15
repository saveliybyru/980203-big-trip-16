import EventEditFormView from '../view/event-edit-form-view.js';
import EventView from '../view/event-view.js';
import { render, RenderPosition, replace} from '../render.js';

class EventPresenter {
  #eventListContainer = null;

  #eventComponent = null;
  #eventEditComponent = null;

  #event = null;

  constructor(eventListContainer){
    this.#eventListContainer = eventListContainer;
  }

  init = (event) =>{
    this.#event = event;

    this.#eventComponent = new EventView(event);
    this.#eventEditComponent = new EventEditFormView(event);

    this.#eventComponent.setEditClickHandler(() => {
      this.#replaceCardToForm();
    });

    this.#eventEditComponent.setFormCancelHandler(() => {
      this.#replaceFormToCard();
    });

    this.#eventEditComponent.setFormSubmitHandler(() => {
      this.#replaceFormToCard();
    });

    render(this.#eventListContainer, this.#eventComponent, RenderPosition.BEFOREEND);
  }

  #replaceCardToForm = () => {
    replace(this.#eventEditComponent, this.#eventComponent);
    document.addEventListener('keydown', this.#onEscKeyDown);
  };

  #replaceFormToCard = () => {
    replace(this.#eventComponent, this.#eventEditComponent);
    document.removeEventListener('keydown', this.#onEscKeyDown);
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc'){
      evt.preventDefault();
      this.#replaceFormToCard();
    }
  };
}

export default EventPresenter;
