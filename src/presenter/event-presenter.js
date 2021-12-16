import EventEditFormView from '../view/event-edit-form-view.js';
import EventView from '../view/event-view.js';
import { render, RenderPosition, replace, remove} from '../render.js';

class EventPresenter {
  #eventListContainer = null;
  #changeData = null;

  #eventComponent = null;
  #eventEditComponent = null;

  #event = null;

  constructor(eventListContainer, changeData){
    this.#eventListContainer = eventListContainer;
    this.#changeData = changeData;
  }

  init = (event) =>{
    this.#event = event;

    const prevEventComponent = this.#eventComponent;
    const prevEventEditComponent = this.#eventEditComponent;

    this.#eventComponent = new EventView(event);
    this.#eventEditComponent = new EventEditFormView(event);

    this.#eventComponent.setEditClickHandler(() => {
      this.#replaceCardToForm();
    });
    this.#eventComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#eventEditComponent.setFormCancelHandler(() => {
      this.#replaceFormToCard();
    });
    this.#eventEditComponent.setFormSubmitHandler(this.#handleFormSubmit);

    if (prevEventComponent === null || prevEventEditComponent === null){
      render(this.#eventListContainer, this.#eventComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this.#eventListContainer.element.contains(prevEventComponent.element)) {
      replace(this.#eventComponent, prevEventComponent);
    }

    if (this.#eventListContainer.element.contains(prevEventEditComponent.element)) {
      replace(this.#eventEditComponent, prevEventEditComponent);
    }


    remove(prevEventComponent);
    remove(prevEventEditComponent);
  }

  destroy = () => {
    remove(this.#eventComponent);
    remove(this.#eventEditComponent);
  }

  #replaceCardToForm = () => {
    replace(this.#eventEditComponent, this.#eventComponent);
    document.addEventListener('keydown', this.#onEscKeyDown);
  }

  #replaceFormToCard = () => {
    replace(this.#eventComponent, this.#eventEditComponent);
    document.removeEventListener('keydown', this.#onEscKeyDown);
  }

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc'){
      evt.preventDefault();
      this.#replaceFormToCard();
    }
  }

  #handleFormSubmit = (event) => {
    this.#changeData(event);
    this.#replaceFormToCard();
  }

  #handleFavoriteClick = () => {
    this.#changeData({...this.#event, isFavorite: !this.#event.isFavorite});
  }
}

export default EventPresenter;
