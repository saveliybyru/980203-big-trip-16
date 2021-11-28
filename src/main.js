
import { createMenuTemplate } from './view/menu-view.js';
import { createSortingTemplate } from './view/sorting-view.js';
import { createFilterTemplate } from './view/filter-view.js';
import { createEventCreateFormTemplate } from './view/event-create-form-view.js';
import { createEventEditFormTemplate } from './view/event-edit-form-view.js';
import { createEventTemplate } from './view/event-view.js';
import { generatePoint } from './moks/point-moks.js';

const RenderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};

const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};


const controls = document.querySelector('.trip-controls');
const menuControl = controls.querySelector('.trip-controls__navigation');
const filterControl = controls.querySelector('.trip-controls__filters');

renderTemplate(menuControl, createMenuTemplate(), RenderPosition.BEFOREEND);
renderTemplate(filterControl, createFilterTemplate(), RenderPosition.BEFOREEND);

const mainEventsList = document.querySelector('.trip-events');

renderTemplate(mainEventsList, createSortingTemplate(), RenderPosition.BEFOREEND);

const eventList = document.createElement('ul');
mainEventsList.appendChild(eventList);
eventList.classList.add('trip-events__list');

const EVENT_COUNT = 50;
const points = Array.from({length: EVENT_COUNT}, generatePoint);

renderTemplate(eventList, createEventEditFormTemplate(points[0]), RenderPosition.BEFOREEND);
renderTemplate(eventList, createEventCreateFormTemplate(), RenderPosition.BEFOREEND);


for (let i = 1; i < EVENT_COUNT; i++ ){
  renderTemplate(eventList, createEventTemplate(points[i]), RenderPosition.BEFOREEND);
}

