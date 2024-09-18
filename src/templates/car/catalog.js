import page from 'page';
import { html } from 'lit';
import { renderPaginationLinks } from '@templates';
import config from '../../config';

const ROWS_PER_PAGE = config.catalogsTable.rowsPerPage;

/**
 * @typedef {object} CarCatalogPageProps
 * @property {Array<Car>} cars - The array of cars.
 * @property {number} carsCount - The total number of cars.
 * @property {number} pageNumber - The current page number.
 * @property {string} searchCategory - The search category string.
 * @property {string} searchQuery - The search query string.
 * @property {(event: Event) => void} onSearch - The function to be called when the search button is clicked.
 * @property {(event: Event, car: Car) => void} onDelete - The function to be called when the delete button is clicked.
 */

/**
 * @description Generates the HTML template for the `catalog with repairs` page.
 * @param {CarCatalogPageProps} data - The data containing catalog information.
 * @returns {import('lit').TemplateResult} The HTML template string.
 */
export default (data) => {
  const { cars, carsCount, pageNumber, searchCategory, searchQuery, onSearch, onDelete } = data;
  const totalPages = Math.max(Math.ceil(carsCount / ROWS_PER_PAGE), 1);

  return html`
    <section id="catalog-page">
      <form autocomplete="off">
        <fieldset>
          <legend>Всички автомобили</legend>

          <fieldset class="search">
            <label for="search-options" id="search-label" aria-hidden="true">Търсачка</label>
            <select id="search-options" aria-labelledby="search-label">
              <option value="registration" .selected=${searchCategory === 'registration' ? true : false}>Регистрационен &numero;</option>
              <option value="make" .selected=${searchCategory === 'make' ? true : false}>Марка</option>
              <option value="engine" .selected=${searchCategory === 'engine' ? true : false}>Двигател</option>
              <option value="customerName" .selected=${searchCategory === 'customerName' ? true : false}>Име на клиента</option>
            </select>
            <input id="search-input" type="search" placeholder="Въведи..." .value=${searchQuery} />
            <button @click=${onSearch}>Търси</button>
          </fieldset>

          ${renderContent(cars, onDelete)}

          ${renderPaginationLinks(pageNumber, totalPages, { filter: searchCategory, query: searchQuery })}
        </fieldset>
      </form>
    </section>
  `;
};

/**
 * @description Render the content based on the cars data.
 * @param {Array<Car>} cars - The array of cars.
 * @param {(event: Event, car: Car) => void} onDelete - The function to be called when the delete button is clicked.
 * @returns {import('lit').TemplateResult} The HTML template string.
 */
const renderContent = (cars, onDelete) => {
  if (cars.length > 0) return renderTable(cars, onDelete);
  return html`<p class="empty">Нямаш добавени автомобили!</p>`;
};

/**
 * @description Render the table based on the cars data.
 * @param {Array<Car>} cars - The array of cars.
 * @param {(event: Event, car: Car) => void} onDelete - The function to be called when the delete button is clicked.
 * @returns {import('lit').TemplateResult} The HTML template string.
 */
const renderTable = (cars, onDelete) => {
  return html`
    <table role="table">
      <thead role="rowgroup">
        <tr role="row">
          <th role="columnheader">Рама</th>
          <th role="columnheader">Pегистрационен &numero;</th>
          <th role="columnheader">Марка / Модел</th>
          <th role="columnheader">Двигател</th>
          <th role="columnheader">Име на клиента</th>
          <th role="columnheader">Ремонти</th>
          <th role="columnheader">Редакция</th>
          <th role="columnheader">Изтриване</th>
        </tr>
      </thead>
      <tbody role="rowgroup">
        ${cars.map(car => renderTableRow(car, onDelete))}
      </tbody>
    </table>
  `;
};

/**
 * @description Render a table row for a car entry.
 * @param {Car} car - The car object.
 * @param {(event: Event, car: Car) => void} onDelete - The function to be called when the delete button is clicked.
 * @returns {import('lit').TemplateResult} The HTML template string.
 */
const renderTableRow = (car, onDelete) => {
  return html`
    <tr role="row">
      <td role="cell" data-cell-content="Рама">${car.vin}</td>
      <td role="cell" data-cell-content="Pегистрационен &numero;">${car.registration}</td>
      <td role="cell" data-cell-content="Марка / Модел">${car.make}</td>
      <td role="cell" data-cell-content="Двигател">${car.engine}</td>
      <td role="cell" data-cell-content="Име на клиента">${car.customerName}</td>
      <td role="cell" data-cell-content="Ремонти">
        <div class="buttons">
          <a role="button" data-button-type="info" href="${page.base()}/cars/${car.objectId}/repairs">
            <i class="material-icons">car_repair</i>
          </a>
        </div>
      </td>
      <td role="cell" data-cell-content="Редакция">
        <div class="buttons">
          <a role="button" href="${page.base()}/cars/${car.objectId}/edit">
            <i class="material-icons">edit</i>
          </a>
        </div>
      </td>
      <td role="cell" data-cell-content="Изтриване">
        <div class="buttons">
          <button data-button-type="danger" @click=${(e) => onDelete(e, car)}>
            <i class="material-icons">delete_forever</i>
          </button>
        </div>
      </td>
    </tr>
  `;
};