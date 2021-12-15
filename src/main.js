import MenuView from './view/menu-view.js';
import FilterView from './view/filter-view.js';
import { generatePoint } from './moks/point-moks.js';
import { RenderPosition, render} from './render.js';
import BoardPresenter from './presenter/list-presenter.js';

const controls = document.querySelector('.trip-controls');
const menuControl = controls.querySelector('.trip-controls__navigation');
const filterControl = controls.querySelector('.trip-controls__filters');

render(menuControl, new MenuView(), RenderPosition.BEFOREEND);
render(filterControl, new FilterView(), RenderPosition.BEFOREEND);

const mainEventsList = document.querySelector('.trip-events');

const EVENT_COUNT = 10;
const points = Array.from({length: EVENT_COUNT}, generatePoint);

const boardPresenter = new BoardPresenter(mainEventsList);
boardPresenter.init(points);
