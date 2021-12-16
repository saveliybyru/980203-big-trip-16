import { render, RenderPosition, updateEvent, SortType} from '../render.js';
import EmptyEventsView from '../view/empty-events-view.js';
import EventListView from '../view/event-list-view.js';
import SortingView, { sortDay, sortPrice, sortTime } from '../view/sorting-view.js';
import EventPresenter from './event-presenter.js';


class BoardPresenter{
  #listContainer = null;
  #listComponent = new EventListView();
  #sortComponent = new SortingView();
  #emptyListComponent = new EmptyEventsView();
  #events = [];
  #eventPresenter = new Map();
  #currentSortType = SortType.DAY;
  #sourcedEvents = [];
  constructor(listContainer) {
    this.#listContainer = listContainer;
  }

  init = (events) => {
    this.#events = [...events];
    this.#sourcedEvents = [...events];
    this.#renderBoard();
  }

  #renderEvent = (event) => {
    const eventPresenter = new EventPresenter(this.#listComponent, this.#handleEventChange, this.#handleModeChange);
    eventPresenter.init(event);
    this.#eventPresenter.set(event.id, eventPresenter);
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

  #handleModeChange = () => {
    this.#eventPresenter.forEach((presenter)=> presenter.resetView());
  }

  #handleEventChange = (updatedEvent) => {
    this.#events = updateEvent(this.#events, updatedEvent);
    this.#sourcedEvents = updateEvent(this.#sourcedEvents, updatedEvent);
    this.#eventPresenter.get(updatedEvent.id).init(updatedEvent);
  }

  #sortEvents = (sortType) => {
    switch (sortType) {
      case SortType.TIME:
        this.#events.sort(sortTime);
        break;
      case SortType.PRICE:
        this.#events.sort(sortPrice);
        break;
      default:
        this.#events = [...this.#sourcedEvents].sort(sortDay);//Дата
    }
    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) =>{
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#sortEvents(sortType);
    this.#clearEvents();
    this.#renderEvents();
  }

  #renderSorting = () => {
    render(this.#listContainer, this.#sortComponent, RenderPosition.BEFOREEND);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  }

  #renderBoard = () => {
    if (this.#events.length === 0 ){
      this.#renderEmptyList();
    }
    else {
      this.#sortEvents(this.#currentSortType);
      this.#renderSorting();
      render(this.#listContainer, this.#listComponent, RenderPosition.BEFOREEND);
      this.#renderEvents();
    }
  }
}

export default BoardPresenter;
