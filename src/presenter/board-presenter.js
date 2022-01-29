import {render, RenderPosition, SortType, UserAction, UpdateType, remove} from '../render.js';
import EmptyEventsView from '../view/empty-events-view.js';
import EventListView from '../view/event-list-view.js';
import SortingView, {sortDay, sortPrice, sortTime } from '../view/sorting-view.js';
import EventPresenter from './event-presenter.js';


class BoardPresenter{
  #listContainer = null;
  #eventsModel = null;
  #listComponent = new EventListView();
  #sortComponent = null;
  #emptyListComponent = new EmptyEventsView();
  #eventPresenter = new Map();
  #currentSortType = SortType.DAY;
  constructor(listContainer, eventsModel) {
    this.#listContainer = listContainer;
    this.#eventsModel = eventsModel;

    this.#eventsModel.addObserver(this.#handleModelEvent);
  }

  get events(){
    switch (this.#currentSortType) {
      case SortType.TIME:
        return [...this.#eventsModel.events].sort(sortTime);
      case SortType.PRICE:
        return [...this.#eventsModel.events].sort(sortPrice);
    }


    return [...this.#eventsModel.events].sort(sortDay);
  }

  init = () => {
    this.#renderBoard();
  }

  #renderEvent = (event) => {
    const eventPresenter = new EventPresenter(this.#listComponent, this.#handleViewAction, this.#handleModeChange);
    eventPresenter.init(event);
    this.#eventPresenter.set(event.id, eventPresenter);
  }

  #clearEvents = () =>{
    this.#eventPresenter.forEach((presenter) => presenter.destroy());
    this.#eventPresenter.clear();
  }

  #renderEvents = (events) => {
    events.forEach((event) => this.#renderEvent(event));
  }

  #renderEmptyList = () => {
    render(this.#listContainer, this.#emptyListComponent, RenderPosition.BEFOREEND);
  }

  #handleModeChange = () => {
    this.#eventPresenter.forEach((presenter)=> presenter.resetView());
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch(actionType){
      case UserAction.UPDATE_EVENT:
        this.#eventsModel.updateEvent(updateType, update);
        break;
      case UserAction.ADD_EVENT:
        this.#eventsModel.addEvent(updateType, update);
        break;
      case UserAction.DELETE_EVENT:
        this.#eventsModel.deleteEvent(updateType, update);
        break;
    }
  }

  #handleModelEvent = (updateType, data) => {
    switch (updateType){
      case UpdateType.PATCH:
        this.#eventPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetSortType: true});
        this.#renderBoard();
        break;
    }
  }


  #handleSortTypeChange = (sortType) =>{
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderBoard();
  }

  #renderSorting = () => {
    this.#sortComponent = new SortingView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
    render(this.#listContainer, this.#sortComponent, RenderPosition.BEFOREEND);
  }


  #clearBoard = ({resetSortType = false} = {}) =>{
    if (this.events.length === 0) {
      remove(this.#emptyListComponent);
    }
    this.#clearEvents();
    remove(this.#listComponent);
    remove(this.#sortComponent);
    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  #renderBoard = () => {
    if (this.events.length === 0 ){
      this.#renderEmptyList();
    }
    else {
      this.#renderSorting();
      render(this.#listContainer, this.#listComponent, RenderPosition.BEFOREEND);
      this.#renderEvents(this.events);
    }
  }
}

export default BoardPresenter;
