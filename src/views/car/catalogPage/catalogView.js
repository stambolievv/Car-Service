import { html, nothing } from 'lit';
import { until } from 'lit/directives/until.js';

/**
 * @description It returns a `section` template that will be rendered to the screen.
 * @param {Promise} carsPromise - A promise that will be resolved with the data.
 * @param {object} actions - An object containing the actions that will be used in the template.
 * @returns {string} A template literal.
 */
export const template = (carsPromise, actions) => html`
  <section id="catalog-page">
    <form autocomplete="off">
      <fieldset class="grid">
        <legend>Всички автомобили</legend>
        ${until(loadData(carsPromise, actions),  html`<div class="spinner"></div>`)}
      </fieldset>
    </form>
  </section>
`;

/**
 * @description It takes an array of cars and returns a table with the cars.
 * @param {Array} cars - An array that contains car objects.
 * @returns {string} A template literal.
 */
const carsTable = (cars) => html`
  <table class="table">
    <thead>
      <tr>
        <th>&#35;</th>
        <th>Рама:</th>
        <th>Pегистрационен &numero;</th>
        <th>Марка / Модел</th>
        <th>Двигател</th>
        <th>Име на клиента</th>
        <th>Ремонти по автомобила</th>
      </tr>
    </thead>
    <tbody>
      ${cars.map((car, index) => carTemplate(car, index + 1))}
    </tbody>
  </table>
`;

/**
 * @description It takes a car object and an id and returns a table row with the car's data.
 * @param {string} car - The car object.
 * @param {number} id - The id of the car.
 * @returns {string} A template literal.
 */
const carTemplate = (car, id) => html`
  <tr>
    <td>${id}</td>
    <td>${car.vin}</td>
    <td>${car.registration}</td>
    <td>${car.make}</td>
    <td>${car.engine}</td>
    <td>${car.customerName}</td>
    <td><a class="btn-success" href="/catalog/repairs/${car.objectId}">Виж</a></td>
  </tr>
`;

/**
 * @description It returns a paragraph with the text "Нямаш добавени автомобили!".
 * @returns {string} A template literal.
 */
const noCarsCard = () => html`<p class="empty">Нямаш добавени автомобили!</p>`;

/**
 * @description It returns a template literal that contains a fieldset element with a select element, an input element and a button element.
 * @param {string} search - The value of the search input field.
 * @param {Function} onSearch - A function that will be called when the search button is clicked.
 * @returns {string} A template literal.
 */
const searchCard = (search, onSearch) => html`
  <fieldset class="search">
    <select id="searchOption" name="searchOption">
      <option value="registration">Регистрационен &numero;</option>
      <option value="customerName">Име на клиента</option>
    </select>
    <input id="search-input" type="text" name="search" placeholder="Въведи..." .value=${search} />
    <button class="btn-info" @click=${onSearch}>Търси</button>
  </fieldset>
`;

/**
 * @description If the current page is greater than 1, then display a link to the previous page, otherwise don't display anything. If the current page is less than the total number of pages, then display a link to the next page, otherwise don't display anything.
 * @param {number} page - The current page number.
 * @param {number} pages - The total number of pages.
 * @param {string} search - The search query, if any.
 * @returns {string} A template literal.
 */
const paginationCard = (page = 1, pages = 1, search = '') => html`
  <fieldset class="pagination">
    <p>Page ${page} of ${pages}</p>
    <div class="pager">
      ${page > 1 ? html`<a href=${'/catalog/cars?page=' + (page - 1) + (search ? `&search=${search}` : '' )}>&lt;Prev</a>` : nothing}
      ${page < pages ? html`<a href=${'/catalog/cars?page=' + (page + 1) + (search ? `&search=${search}` : '' )}>Next&gt;</a>` : nothing}
    </div>
  </fieldset>
`;

async function loadData(carsPromise, { page = 1, search = '', onSearch }) {
  const [cars, count] = await carsPromise;
  const pages = Math.ceil(count / 10) || 1;
  const cards = [searchCard(search, onSearch), paginationCard(page, pages, search)];

  if (cars.length !== 0)  cards.push(carsTable(cars));
  else cards.push(noCarsCard());

  return cards;
}