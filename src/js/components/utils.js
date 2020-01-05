export const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

export const Action = {
  CREATE: `create`,
  UPDATE: `update`,
  DELETE: `delete`,
};

export const Position = {
  BEGIN: `afterBegin`,
  END: `beforeEnd`,
  BEFORE: `beforeBegin`,
  AFTER: `afterEnd`,
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

export const capitalizeFirstLetter = (word) => word[0].toUpperCase() + word.slice(1);

export const render = (container, element, position = Position.END) => {
  switch (position) {
    case Position.BEFORE:
      container.before(element);
      break;
    case Position.BEGIN:
      container.prepend(element);
      break;
    case Position.END:
      container.append(element);
      break;
    case Position.AFTER:
      container.after(element);
      break;
  }
};

export const unrender = (element) => {
  if (element) {
    element.remove();
  }
};
