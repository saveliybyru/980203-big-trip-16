import { render, RenderPosition, updateEvent} from '../render.js';
import EmptyEventsView from '../view/empty-events-view.js';
import EventListView from '../view/event-list-view.js';
import SortingView from '../view/sorting-view.js';
import EventPresenter from './event-presenter.js';


class BoardPresenter{
  #listContainer = null;


  #listComponent = new EventListView();
  #sortComponent = new SortingView();
  #emptyListComponent = new EmptyEventsView();

  #events = [];
  #eventPresenter = new Map();

  constructor(listContainer) {
    this.#listContainer = listContainer;
  }

  init = (events) => {
    this.#events = [...events];

    this.#renderBoard();
  }

  #renderEvent = (event) => {
    const eventPresenter = new EventPresenter(this.#listComponent, this.#handleEventChange);
    eventPresenter.init(event);
    this.#eventPresenter.set(event.id, eventPresenter)
  }

  #clearEvents = () =>{
    this.#eventPresenter.forEach((presenter) => presenter.destroy());
    this.#eventPresenter.clear();

  }

  #renderEvents = () => {

    for (let i = 0; i < this.#events.length; i++ ){
      this.#renderEvent(this.#events[i]);
    }
  }

  #renderEmptyList = () => {
    render(this.#listContainer, this.#emptyListComponent, RenderPosition.BEFOREEND);
  }

  #handleEventChange = (updatedEvent) => {
    this.#events = updateEvent(this.#events, updatedEvent);
    this.#eventPresenter.get(updatedEvent.id).init(updatedEvent);
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
    this.#renderEvents();
      }
  }
}

export default BoardPresenter;
