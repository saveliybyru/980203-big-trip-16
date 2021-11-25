import { mainMenuTemplate } from './view/menu-view.js';
import { mainSortingTemplate } from './view/sorting-view.js';
import { filterTemplate } from './view/filter-view.js';
import { eventCreateTemplate } from './view/event-create-view.js';
import { eventEditTemplate } from './view/event-edit-view.js';
import { eventTemplate } from './view/event-view.js';

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

renderTemplate(menuControl, mainMenuTemplate(), RenderPosition.BEFOREEND);
renderTemplate(filterControl, filterTemplate(), RenderPosition.BEFOREEND);

const mainEventsList = document.querySelector('.trip-events');

renderTemplate(mainEventsList, mainSortingTemplate(), RenderPosition.BEFOREEND);

const eventList = document.createElement('ul');

mainEventsList.appendChild(eventList);

eventList.classList.add('trip-events__list');

renderTemplate(eventList, eventEditTemplate(), RenderPosition.BEFOREEND);
renderTemplate(eventList, eventCreateTemplate(), RenderPosition.BEFOREEND);

const EVENT_COUNT = 3;

for (let i = 0; i < EVENT_COUNT; i++ ){
  renderTemplate(eventList, eventTemplate(), RenderPosition.BEFOREEND);
}

