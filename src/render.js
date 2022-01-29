import AnyView from './view/any-view.js';

const SortType = {
  DAY: 'DAY',
  TIME: 'TIME',
  PRICE: 'PRICE',
};

const RenderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};

const UserAction = {
  UPDATE_EVENT:'UPDATE_EVENT',
  ADD_EVENT:'ADD_EVENT',
  DELETE_EVENT:'DELETE_EVENT',
};

const UpdateType = {
  PATCH:'PATCH',
  MINOR:'MINOR',
  MAJOR:'MAJOR',
};

const render = (container, element, place) => {
  const parent = container instanceof AnyView ? container.element : container;
  const child = element instanceof AnyView ? element.element : element;
  switch (place) {
    case RenderPosition.BEFOREBEGIN:
      parent.before(child);
      break;
    case RenderPosition.AFTERBEGIN:
      parent.prepend(child);
      break;
    case RenderPosition.BEFOREEND:
      parent.append(child);
      break;
    case RenderPosition.AFTEREND:
      parent.after(child);
      break;
  }
};

const replace = (newElement, oldElement) => {
  if (newElement === null || oldElement === null) {
    throw new Error('Can\'t replace unexisting elements');
  }
  const newChild = newElement instanceof AnyView ? newElement.element : newElement;
  const oldChild = oldElement instanceof AnyView ? oldElement.element : oldElement;
  const parent = oldChild.parentElement;

  if (parent === null) {
    throw new Error('Parent element doesn\'t exist');
  }
  parent.replaceChild(newChild, oldChild);
};

const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;
  return newElement.firstChild;
};

const remove = (component) => {
  if (component === null) {
    return;
  }

  if (!(component instanceof AnyView)) {
    throw new Error('Can remove only components');
  }
  component.element.remove();
  component.removeElement();
};


export {RenderPosition, render, replace, createElement, remove, SortType, UserAction, UpdateType};
