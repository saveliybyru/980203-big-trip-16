import dayjs from 'dayjs';
import SmartView from './smart-view.js';
import flatpickr from 'flatpickr';

import '../../node_modules/flatpickr/dist/flatpickr.min.css';

const eventsType = [
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant',
];

const BLANK_EVENT = {
  type: 'flight',
  city: '',
  price: 0,
  description: '',
  timeStart: dayjs(),
  timeEnd: dayjs(),
};

const createEventListItems = (actualType, typeList) => {
  let list = '';
  for (const currentType of typeList) {
    list += `<div class="event__type-item">
      <input id="event-type-${currentType}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${currentType}" ${
  currentType === actualType ? 'checked' : ''
}>
      <label class="event__type-label  event__type-label--${currentType}" for="event-type-${currentType}-1">${currentType}</label>
    </div>`;
  }
  return list;
};

const createActualOffers = (offers) => {
  let list = '';
  for (const offer of offers) {
    list += `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="${offer.id}" type="checkbox" name="event-offer" >
      <label class="event__offer-label" for="${offer.id}">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </label>
      </div>`;
  }
  const listOffers = `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
    ${list}
    </div>
    </section>`;

  return listOffers;
};

const createEventEditFormTemplate = (data) => {
  const { type, city, price, offers, description, timeStart, timeEnd } = data;
  const formatTimeStart = dayjs(timeStart).format('DD/MM/YY HH:mm');
  const formatTimeEnd = dayjs(timeEnd).format('DD/MM/YY HH:mm');
  return `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${createEventListItems(type, eventsType)}
          </fieldset>
        </div>
      </div>
      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
        ${type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${city}" list="destination-list-1">
        <datalist id="destination-list-1">
          <option value="Amsterdam"></option>
          <option value="Geneva"></option>
          <option value="Chamonix"></option>
        </datalist>
      </div>
      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${formatTimeStart}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${formatTimeEnd}">
      </div>
      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
      </div>
      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    <section class="event__details">
      ${offers[type].length !== 0 ? createActualOffers(offers[type]) : ''}
      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${description}</p>
      </section>
    </section>
  </form>
</li>`;
};

class EventEditFormView extends SmartView {
  #datepicker = null;
  constructor(event = BLANK_EVENT) {
    super();
    this._data = EventEditFormView.parseEventToData(event);

    this.#setInnerHandlers();
    this.#setStartDatepicker();
    this.#setEndDatepicker();
  }

  get template() {
    return createEventEditFormTemplate(this._data);
  }

  removeElement = () => {
    super.removeElement();

    if (this.#datepicker) {
      this.#datepicker.destroy();
      this.#datepicker = null;
    }
  };

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element
      .querySelector('form')
      .addEventListener('submit', this.#formSubmitHandler);
  };

  #setStartDatepicker = () => {
    this.#datepicker = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        enableTime: true,
        dateFormat: 'd/m/Y H:i',
        defaultDate: this._data.timeStart,
        onChange: this.#dateStartChangeHandler,
      }
    );
  };

  #setEndDatepicker = () => {
    this.#datepicker = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        enableTime: true,
        dateFormat: 'd/m/Y H:i',
        defaultDate: this._data.timeEnd,
        onChange: this.#dateEndChangeHandler,
      }
    );
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(EventEditFormView.parseDataToEvent(this._data));
  };

  static parseEventToData = (event) => ({ ...event });

  static parseDataToEvent = (data) => {
    const event = { ...data };

    return event;
  };

  reset = (event) => {
    this.updateData(EventEditFormView.parseEventToData(event));
  };

  restoreHandlers = () => {
    this.#setInnerHandlers();
    this.#setStartDatepicker();
    this.#setEndDatepicker();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setFormCancelHandler(this._callback.formCancel);
  };

  #dateStartChangeHandler = ([date]) => {
    this.updateData({
      timeStart: date,
    });
  };

  #dateEndChangeHandler = ([date]) => {
    this.updateData({
      timeEnd: date,
    });
  };

  #eventToggleHandler = (evt) => {
    if (evt.target.type === 'radio') {
      this.updateData({ type: evt.target.value });
    }
  };

  #destinationInputHandler = (evt) => {
    evt.preventDefault();
    this.updateData(
      {
        city: evt.target.value,
      },
      true
    );
  };

  #setInnerHandlers = () => {
    this.element
      .querySelector('.event__type-group')
      .addEventListener('click', this.#eventToggleHandler);
    this.element
      .querySelector('.event__input--destination')
      .addEventListener('input', this.#destinationInputHandler);
  };

  setFormCancelHandler = (callback) => {
    this._callback.formCancel = callback;
    this.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this.#formCancelHandler);
  };

  #formCancelHandler = () => {
    this._callback.formCancel();
  };
}

export default EventEditFormView;
