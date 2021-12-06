import MenuView from './view/menu-view.js';
import SortingView from './view/sorting-view.js';
import FilterView from './view/filter-view.js';
import EventListView from './view/event-list-view.js';
import EventEditFormView from './view/event-edit-form-view.js';
import EventView from './view/event-view.js';
import { generatePoint } from './moks/point-moks.js';
import { RenderPosition, render} from './render.js';

const controls = document.querySelector('.trip-controls');
const menuControl = controls.querySelector('.trip-controls__navigation');
const filterControl = controls.querySelector('.trip-controls__filters');

render(menuControl, new MenuView().element, RenderPosition.BEFOREEND);
render(filterControl, new FilterView().element, RenderPosition.BEFOREEND);

const mainEventsList = document.querySelector('.trip-events');

render(mainEventsList, new SortingView().element, RenderPosition.BEFOREEND);

const eventList = new EventListView();

render(mainEventsList, eventList.element, RenderPosition.BEFOREEND);

const renderPoints = (eventListElement, point) => {
  const eventComponent = new EventView(point);
  const eventEditComponent = new EventEditFormView(point);

  const replaceCardToForm = () => {
    eventListElement.replaceChild(eventEditComponent.element, eventComponent.element);
  };
  const replaceFormToCard = () => {
    eventListElement.replaceChild(eventComponent.element, eventEditComponent.element);
  };

  eventComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceCardToForm();
  });

  eventEditComponent.element.querySelector('form').addEventListener('submit', (evt) => {
    evt.preventDefault();
    replaceFormToCard();
  });

  render(eventListElement, eventComponent.element, RenderPosition.BEFOREEND);

};


const EVENT_COUNT = 15;
const points = Array.from({length: EVENT_COUNT}, generatePoint);


for (let i = 0; i < EVENT_COUNT; i++ ){
  renderPoints(eventList.element, points[i]);
}

