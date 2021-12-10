import AnyView from './any-view.js';

const emptyEventsTemplate = () => (
  '<p class="trip-events__msg">Click New Event to create your first point</p>'
);

class EmptyEventsView extends AnyView{
  get template(){
    return emptyEventsTemplate();
  }

}

export default EmptyEventsView;
