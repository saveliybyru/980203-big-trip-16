import { render, RenderPosition, replace} from '../render.js';
import EmptyEventsView from '../view/empty-events-view.js';
import EventListView from '../view/event-list-view.js';
import SortingView from '../view/sorting-view.js';
import EventEditFormView from '../view/event-edit-form-view.js';
import EventView from '../view/event-view.js';


class BoardPresenter{
  #listContainer = null;


  #listComponent = new EventListView();
  #sortComponent = new SortingView();
  #emptyListComponent = new EmptyEventsView();

  #events = [];

  constructor(listContainer) {
    this.#listContainer = listContainer;
  }

  init = (events) => {
    this.#events = [...events];

    this.#renderBoard();
  }

  #renderPoint = (point) => {
    const eventComponent = new EventView(point);
    const eventEditComponent = new EventEditFormView(point);

    const replaceCardToForm = () => {
      replace(eventEditComponent, eventComponent);
    };

    const replaceFormToCard = () => {
      replace(eventComponent, eventEditComponent);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc'){
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    eventComponent.setEditClickHandler(() => {
      replaceCardToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    eventEditComponent.setFormCancelHandler(() => {
      replaceFormToCard();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    eventEditComponent.setFormSubmitHandler(() => {
      replaceFormToCard();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(this.#listComponent, eventComponent, RenderPosition.BEFOREEND);
  }

  #renderPoints = () => {

    for (let i = 0; i < this.#events.length; i++ ){
      this.#renderPoint(this.#events[i]);
    }
  }

  #renderEmptyList = () => {
    render(this.#listContainer, this.#emptyListComponent, RenderPosition.BEFOREEND);
  }

  #renderSorting = () => {
    render(this.#listContainer, this.#sortComponent, RenderPosition.BEFOREEND);
  }

  #renderBoard = () => {

    if (this.#events.length === 0 ){
    this.#renderEmptyList();
    }
    else {
    this.#renderSorting();
    render(this.#listContainer, this.#listComponent, RenderPosition.BEFOREEND);
    this.#renderPoints();
      }
  }
}

export default BoardPresenter;
