/**
 * @description Parses a querystring and returns an object with key-value pairs.
 * @param {string} querystring - The querystring to parse.
 * @returns {Record<string, string | Array<string>>} An object with key-value pairs.
 */
export function getQueryParam(querystring) {
  if (!querystring) return {};

  try {
    return decodeURIComponent(querystring)
      .split('&')
      .reduce((acc, curr) => {
        const [key, value] = curr.split('=');

        acc[key.trim()] = value?.includes(',')
          ? value.split(',').map(decodeURIComponent)
          : decodeURIComponent(value?.trim());

        return acc;
      }, {});
  } catch (error) {
    console.error(error);
    return {};
  }
}

/**
 * @description Returns a string representation of the given query parameters object.
 * @param {Record<string, string | Array<string>>} params - The query parameters object.
 * @returns {string} The string representation of the query parameters.
 */
export function makeQueryParam(params) {
  if (!params) return '';

  try {
    return Object.entries(params)
      .filter(([key, value]) => {
        const isKeyValid = typeof key === 'string' && key.trim().length > 0;
        const isValueValid = typeof value === 'string'
          ? value.trim().length > 0
          : Array.isArray(value) && value.every((v) => typeof v === 'string' && v.trim().length > 0);

        return isKeyValid && isValueValid;
      })
      .map(([key, value]) => {
        const encodedValues = Array.isArray(value)
          ? value.map((v) => encodeURIComponent(v.trim())).join(',')
          : encodeURIComponent(value.trim());

        return `${encodeURIComponent(key.trim())}=${encodedValues}`;
      })
      .join('&');
  } catch (error) {
    console.error(error);
    return '';
  }
}

/**
 * @description Extracts data from a form and disables all form elements.
 * @param {HTMLFormElement} form - The form to extract data from.
 * @returns {[Record<string, string>, (disabled: boolean) => void]} An array containing the extracted data and a function to enable/disable form elements.
 */
export function formDataHandler(form) {
  const formData = new FormData(form);

  const data = /**@type {Record<string, string>}*/(Object.fromEntries(
    Array.from(formData, ([key, value]) => [key, typeof value === 'string' ? value.trim() : value])
  ));

  const setDisabled = (/**@type {boolean}*/disabled) => Array.from(form.elements).forEach(element => disabled ? element.setAttribute('disabled', 'true') : element.removeAttribute('disabled'));

  return [data, setDisabled];
}

/**
 * @description Generate a random UUID using crypto API if available, otherwise use a fallback method.
 * @returns {`${string}-${string}-${string}-${string}-${string}`} A UUID string.
 */
export function generateUUID() {
  if (crypto && crypto.randomUUID) return crypto.randomUUID();

  const pattern = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';

  return /**@type {`${string}-${string}-${string}-${string}-${string}`}*/(pattern
    .replace(/[xy]/g, (char) => {
      const randomNibble = ~~(Math.random() * 16);
      const replacement = char === 'x' ? randomNibble : (randomNibble & 0x3 | 0x8);

      return replacement.toString(16);
    })
  );
}

/**
 * @description Formats the given date to international format.
 * @param {string | number | Date} date - The date to be formatted.
 * @param {string | Array<string>} [locales] - The locale to use for formatting the date.
 * @returns {string} The formatted date as a locale-specific string.
 */
export function formatDateToLocale(date, locales = 'bg-BG') {
  try {
    return Intl.DateTimeFormat(locales).format(new Date(date));
  } catch {
    return date.toString();
  }
}

/**
 * @description Formats the given date to ISO 8601 string with the current time.
 * @param {string} date - The date in 'YYYY-MM-DD' format.
 * @returns {string} The formatted date in 'YYYY-MM-DDTHH:mm:ss.000Z' format.
 */
export function formatDateToISO(date) {
  return `${date}T${getTime()}.000Z`;
}

/**
 * @description Retrieves the day part of the provided date or the current date if none is specified.
 * @param {string | number | Date} [inputDate] - The date from which to extract the day.
 * @returns {string} The day in 'YYYY-MM-DD' format.
 */
export function getDay(inputDate) {
  const offset = new Date().getTimezoneOffset() * 60000;
  const date = (inputDate && Number(new Date(inputDate).getTime() + offset)) || Date.now();
  const ISO = new Date(date - offset).toISOString();

  return ISO.split('T')[0];
}

/**
 * @description Retrieves the time part of the provided date or the current date if none is specified.
 * @param {string | number | Date} [inputDate] - The date from which to extract the time.
 * @returns {string} The time in 'HH:mm:ss' format.
 */
export function getTime(inputDate) {
  const offset = new Date().getTimezoneOffset() * 60000;
  const date = (inputDate && Number(new Date(inputDate).getTime() + offset)) || Date.now();
  const ISO = new Date(date - offset).toISOString();

  return ISO.split('T')[1].slice(0, -5);
}

/**
 * @description Creates an DOM element with specified tag and properties.
 * @param {K} tag - The tag of the new element to create.
 * @param {ElementCreationOptions<K>} [options] - The properties and values to apply to the element.
 * @returns {HTMLElementTagNameMap[K]} The newly created element.
 * @template {keyof HTMLElementTagNameMap} K - The tag type parameter representing the tag of the element.
 * @example
 * const button = createElement('button', {
 *   parent: document.body,
 *   attributes: {
 *     id: 'myButton',
 *     class: 'btn btn-primary'
 *   },
 *   style: {
 *     backgroundColor: 'blue',
 *     color: 'white',
 *     padding: '10px 20px'
 *   },
 *   children: ['Click me!']
 * });
 *
 * const div = createElement('div', {
 *   parent: '.wrapper',
 *   prepend: true,
 *   attributes: {
 *     id: 'myDiv',
 *     class: 'container',
 *     'data-custom': 'value'
 *   },
 *   style: {
 *     color: 'blue',
 *     fontSize: '16px'
 *   },
 *   children: [
 *     'Hello, ',
 *     createElement('strong', { textContent: 'world' }),
 *     '!'
 *   ]
 * });
 *
 * const customElement = createElement('my-custom-element', {
 *   customProp: 'custom value',
 *   onclick: () => console.log('Clicked!')
 * });
 */
export function createElement(tag, options = {}) {
  const { parent, prepend = false, attributes, children, style, ...rest } = options;

  const element = document.createElement(tag);

  if (typeof attributes !== 'undefined') {
    for (const key in attributes) element.setAttribute(key, attributes[key]);
  }

  if (Array.isArray(children)) {
    for (const child of children) element.append(child);
  }

  if (typeof style !== 'undefined') {
    Object.assign(element.style, style);
  }

  Object.assign(element, rest);

  if (typeof parent !== 'undefined') {
    const parentElement = typeof parent === 'string' ? document.querySelector(parent) : parent;
    if (parentElement) parentElement[prepend ? 'prepend' : 'append'](element);
  }

  return element;
}

/**
 * @typedef {object} InternalCreationOptions Represents the internal creation options for an element. These options are specific to the internal implementation and usage of the `createElement` function. They provide properties for the parent element, attributes, children, and style of the new element. By separating these internal options, we can ensure that the core functionality of the `createElement` function remains intact and unaffected by external factors.
 * @property {Element | string} parent The parent to append the new element to.
 * @property {boolean} prepend Should the parent be prepended instead of appended the new element to.
 * @property {Record<string, string>} attributes The attributes to set on the new element.
 * @property {Array<Element | string>} children The children to append to the new element.
 * @property {Partial<CSSStyleDeclaration>} style The style to apply to the new element.
 */
/**
 * @typedef {Omit<HTMLElementTagNameMap[K], keyof InternalCreationOptions>} ExternalCreationOptions Represents the external creation options for an element. These options are meant to be provided by the consumers of the `createElement` function. They extend the built-in HTML element types, allowing additional properties to be passed as options. However, we exclude the properties that are already defined in the `InternalCreationOptions` type to avoid duplicate keys. This ensures that the external options do not interfere with the internal options and maintain compatibility with the built-in HTML element types.
 * @template {keyof HTMLElementTagNameMap} K - The tag type parameter representing the tag of the element.
 */
/**
 * @typedef {Partial<InternalCreationOptions> & Partial<ExternalCreationOptions<K>>} ElementCreationOptions Represents the combined creation options for an element. It includes both the internal and external options. By merging these options, we allow users of the `createElement` function to provide a comprehensive set of properties for creating elements. The resulting `ElementCreationOptions` type ensures that all necessary options are accounted for, while avoiding conflicts and maintaining compatibility.
 * @template {keyof HTMLElementTagNameMap} K - The tag type parameter representing the tag of the element.
 */