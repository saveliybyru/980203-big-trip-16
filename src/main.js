import MenuView from './view/menu-view.js';
import FilterView from './view/filter-view.js';
import { generateEvent } from './moks/event-moks.js';
import { RenderPosition, render} from './render.js';
import BoardPresenter from './presenter/board-presenter.js';

const controls = document.querySelector('.trip-controls');
const menuControl = controls.querySelector('.trip-controls__navigation');
const filterControl = controls.querySelector('.trip-controls__filters');

render(menuControl, new MenuView(), RenderPosition.BEFOREEND);
render(filterControl, new FilterView(), RenderPosition.BEFOREEND);

const mainEventsList = document.querySelector('.trip-events');

const EVENT_COUNT = 10;
const events = Array.from({length: EVENT_COUNT}, generateEvent);

const boardPresenter = new BoardPresenter(mainEventsList);
boardPresenter.init(events);
