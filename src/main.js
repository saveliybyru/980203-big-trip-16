import MenuView from './view/menu-view.js';
import SortingView from './view/sorting-view.js';
import FilterView from './view/filter-view.js';
import EventListView from './view/event-list-view.js';
import EventEditFormView from './view/event-edit-form-view.js';
import EventView from './view/event-view.js';
import EmptyEventsView from './view/empty-events-view.js';
import { generatePoint } from './moks/point-moks.js';
import { RenderPosition, render, replace} from './render.js';

const controls = document.querySelector('.trip-controls');
const menuControl = controls.querySelector('.trip-controls__navigation');
const filterControl = controls.querySelector('.trip-controls__filters');

render(menuControl, new MenuView(), RenderPosition.BEFOREEND);
render(filterControl, new FilterView(), RenderPosition.BEFOREEND);

const mainEventsList = document.querySelector('.trip-events');


const renderPoints = (eventListElement, point) => {
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

  render(eventListElement, eventComponent, RenderPosition.BEFOREEND);

};

const renderList = (listContainer, listEvents) => {

  if (listEvents.length === 0 ){
    render(listContainer, new EmptyEventsView(), RenderPosition.BEFOREEND);
  }
  else {
    render(listContainer, new SortingView(), RenderPosition.BEFOREEND);
    const eventList = new EventListView();
    render(listContainer, eventList, RenderPosition.BEFOREEND);

    for (let i = 0; i < listEvents.length; i++ ){
      renderPoints(eventList.element, listEvents[i]);
    }
  }
};

const EVENT_COUNT = 10;
const points = Array.from({length: EVENT_COUNT}, generatePoint);

renderList(mainEventsList, points);
