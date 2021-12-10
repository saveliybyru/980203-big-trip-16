import AnyView from './any-view.js';

const createEventListTemplate = () => (
  '<ul class="trip-events__list"></ul>'
);

class EventListView extends AnyView{
  get template(){
    return createEventListTemplate();
  }
}

export default EventListView;
