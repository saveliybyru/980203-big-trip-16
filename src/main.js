import menuView from './view/menu-view.js';
import sortingView from './view/sorting-view.js';
import filterView from './view/filter-view.js';
import eventListView from './view/event-list-view.js';
import eventEditView from './view/event-edit-form-view.js';
import eventView from './view/event-view.js';
import { generatePoint } from './moks/point-moks.js';
import { RenderPosition, render} from './render.js';

const controls = document.querySelector('.trip-controls');
const menuControl = controls.querySelector('.trip-controls__navigation');
const filterControl = controls.querySelector('.trip-controls__filters');

render(menuControl, new menuView().element, RenderPosition.BEFOREEND);
render(filterControl, new filterView().element, RenderPosition.BEFOREEND);

const mainEventsList = document.querySelector('.trip-events');

render(mainEventsList, new sortingView().element, RenderPosition.BEFOREEND);

const eventList = new eventListView();

render(mainEventsList, eventList.element, RenderPosition.BEFOREEND);

const renderPoints = (eventListElement, point) => {
  const eventComponent = new eventView(point);
  const eventEditComponent = new eventEditView(point);

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

