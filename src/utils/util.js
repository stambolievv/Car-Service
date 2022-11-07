/**
 * @description It takes a form element and a list of fields and returns an object with the values of the fields.
 * @param {FormData} form - The form element.
 * @param {...} fields - An array of strings, each string being the name of a field in the form.
 * @returns {object} An object with the values of the fields.
 */
export function formDataHandler(form, ...fields) {
  const formData = new FormData(form);
  const inputs = fields.reduce((acc, field) => Object.assign(acc, { [field]: formData.get(field).trim() }), {});
  const ignoreField = ['vin', 'make', 'date', 'engine', 'description', 'profit'];
  const errors = Object.entries(inputs).reduce((acc, [key, value]) => Object.assign(acc, { [key]: !ignoreField.includes(key) && value === '' }), {});
  const missing = Object.values(errors).filter(value => value === true).length;

  if (missing > 0) handleError('Полетата са задължителни!');

  if (inputs.username && inputs.username.length < 5) {
    Object.assign(errors, { username: true });

    handleError('Потребителското име трябва да съдържа поне 5 символа!');
  }

  if (inputs.password && inputs.password.length < 6 && inputs.repass) {
    Object.assign(errors, { password: true });
    if (inputs.repass.length < 6) Object.assign(errors, { repass: true });

    handleError('Паролата трябва да съдържа поне 6 символа!');
  }

  if (inputs.password !== inputs.repass && inputs.repass) {
    Object.assign(errors, { password: true, repass: true });

    handleError('Паролите не съвпадат!');
  }

  function handleError(message = '') {
    throw {
      errorMsg: new Error(message).message,
      errorType: errors,
      errorData: inputs
    };
  }

  form.reset();
  return inputs;
}

/**
 * @description It takes a date and formats it so there is no single digit.
 * @param {string} date - A string with a date.
 * @returns {string} A formatted date.
 * @example 2.6.2020 -> 02.06.2022
 */
export function formatDate(date) {
  const formattedDate = date.split('.');
  if (formattedDate.length !== 3) return formattedDate.join('.');

  return formattedDate
    .map((date, index) => {
      if (index === 2) return date;
      return `0${date}`.slice(-2);
    })
    .join('.');
}

/**
 * @description It takes a query string, splits it into an array of key-value pairs, and then reduces that array into an object.
 * @param {string} querystring - The query string to parse.
 * @returns {object} An object with the key value pairs of the query string.
 */
export function parseQuery(querystring) {
  if (querystring === '') return {};

  return querystring.split('&').reduce((acc, current) => {
    const [key, value] = current.split('=');
    return Object.assign(acc, { [key]: value });
  }, {});
}

/**
 * @description It takes an object as an argument, creates an element based on the object's tag property, then loops through the object's properties and sets the element's properties accordingly.
 * @param {object} object - The object that contains the properties of the element you want to create.
 * @returns {HTMLElement} The element.
 * @private
 */
export function createElement(object) {
  const element = document.createElement(object.tag);

  for (const prop in object) {
    if (prop === 'children') object[prop].forEach(child => element.appendChild(child));
    else if (prop === 'attributes') object[prop].forEach(attr => element.setAttribute(attr.key, attr.value));
    else if (prop === 'style') Object.keys(object[prop]).forEach(styleName => element.style[styleName] = object.style[styleName]);
    else if (prop === 'listeners') Object.entries(object[prop]).forEach(([event, callback]) => element.addEventListener(event, e => callback(e)));
    else element[prop] = object[prop];
  }

  return element;
}