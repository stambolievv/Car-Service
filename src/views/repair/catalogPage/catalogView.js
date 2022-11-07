import { html, nothing } from 'lit';
import { until } from 'lit/directives/until.js';

/**
 * @description It returns a `section` template that will be rendered to the screen.
 * @param {Promise} repairsPromise - A promise that will be resolved with the data.
 * @param {number} [page=1] - The page number to load.
 * @returns {string} A template literal.
 */
export const template = (repairsPromise, page = 1) => html`
  <section id="catalog-page">
    <form autocomplete="off">
      <fieldset class="grid">${until(loadData(repairsPromise, page),  html`<div class="spinner"></div>`)}</fieldset>
    </form>
  </section>
`;

/**
 * @description It takes a car object and returns a legend element with the customer name and registration number.
 * @param {object} car - An object containing car data.
 * @returns {string} A template literal.
 */
const legendCard = car => html`<legend>Всичките ремонти на ${car.customerName} - "${car.registration}"</legend>`;

/**
 * @description It returns a template literal containing different controls HTML elements.
 * @param {object} car - An object containing car data.
 * @returns {string} A template literal.
 */
const controlsTemplate = car => html`
  <fieldset class="search">
    <div><a class="btn-default" href="/edit/car/${car.objectId}">Редактирай автомобил</a></div>
    <div><a class="btn-default" href="/create/repair/${car.objectId}">Добави ремонт</a></div>
    <div><a class="btn-danger" href="/catalog/cars">Назад</a></div>
  </fieldset>
`;

/**
 * @description It takes an array of repairs and returns a table with the repairs.
 * @param {Array} repairs - An array that contains repair objects.
 * @returns {string} A template literal.
 */
const repairsTable = (repairs) => html`
  <table class="table">
    <thead>
      <tr>
        <th>&#35;</th>
        <th>Извършен на</th>
        <th>Километри</th>
        <th>Детайли по ремонта</th>
      </tr>
    </thead>
    <tbody>
      ${repairs.map((repair, index) => repairCard(repair, index + 1))}
    </tbody>
  </table>
`;

/**
 * @description It takes a repair object and an id and returns a table row with the id, date, km and a link to the details page.
 * @param {object} repair - The object that contains the data for the repair.
 * @param {number} id - The id of the repair.
 * @returns {string} A template literal.
 */
const repairCard = (repair, id) => html`
  <tr>
    <td>${id}</td>
    <td>${repair.date}</td>
    <td>${repair.km}</td>
    <td><a class="btn-success" href="/details/repair/${repair.objectId}">Детайли</a></td>
  </tr>
`;

/**
 * @description It returns a paragraph with the text "Нямаш завършени ремонти!".
 * @returns {string} A template literal.
 */
const noRepairsCard = () => html`<p class="empty">Нямаш завършени ремонти!</p>`;

/**
 * @description If the current page is greater than 1, then display a link to the previous page, otherwise don't display anything. If the current page is less than the total number of pages, then display a link to the next page, otherwise don't display anything.
 * @param {number} page - The current page number.
 * @param {number} pages - The total number of pages.
 * @returns {string} A template literal.
 */
const paginationCard = (page = 1, pages = 1) => html`
  <fieldset class="pagination">
    <p>Page ${page} of ${pages}</p>
    <div class="pager">
      ${(page > 1) ? html`<a href=${'/catalog/repairs?page=' + (page - 1)}>&lt; Prev</a>` : nothing}
      ${(page < pages) ? html`<a href=${'/catalog/repairs?page=' + (page + 1)}>Next &gt;</a>` : nothing}
    </div>
  </fieldset>
`;

async function loadData(repairsPromise, page = 1) {
  const [repairs, count, car] = await repairsPromise;
  const pages = Math.ceil(count / 10) || 1;

  const cards = [legendCard(car), controlsTemplate(car), paginationCard(page, pages)];

  if (repairs.length !== 0) cards.push(repairsTable(repairs));
  else cards.push(noRepairsCard());

  return cards;
}
