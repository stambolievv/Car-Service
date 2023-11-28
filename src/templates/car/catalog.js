import page from 'page';
import { html } from 'lit';
import { makeQueryParam } from '../../utilities';
import config from '../../config';

/**
 * @description Generates the HTML template for the `catalog with repairs` page.
 * @param {{cars: Array<Car>, carsCount: number, pageNumber: number, searchCategory: string, searchQuery: string}} data - The data containing catalog information.
 * @param {(event: Event, searchCategory: string, searchQuery: string) => void} onSearch - The function to be called when the search button is clicked.
 * @param {(event: Event, car: Car) => void} onDelete - The function to be called when the delete button is clicked.
 * @returns {import('lit').TemplateResult} The HTML template string.
 */
export default (data, onSearch, onDelete) => {
  const { cars, carsCount, pageNumber, searchCategory, searchQuery } = data;
  const totalPages = Math.max(Math.ceil(carsCount / config.itemsPerPage), 1);

  return html`
    <section id="catalog-page">
      <form autocomplete="off">
        <fieldset>
          <legend>Всички автомобили</legend>

          <fieldset class="search">
            <label for="search-options" id="search-label" aria-hidden="true">Търсачка</label>
            <select id="search-options" name="search-options" aria-labelledby="search-label">
              <option value="registration" .selected=${searchCategory === 'registration' ? 'selected' : ''}>Регистрационен &numero;</option>
              <option value="make" .selected=${searchCategory === 'make' ? 'selected' : ''}>Марка</option>
              <option value="engine" .selected=${searchCategory === 'engine' ? 'selected' : ''}>Двигател</option>
              <option value="customerName" .selected=${searchCategory === 'customerName' ? 'selected' : ''}>Име на клиента</option>
            </select>
            <input id="search-input" type="search" name="search" placeholder="Въведи..." .value=${searchQuery} />
            <button @click=${onSearch}>Търси</button>
          </fieldset>

          ${renderContent(cars, onDelete)}

          <fieldset class="pagination">
            ${renderPaginationLinks(pageNumber, totalPages, searchCategory, searchQuery)}
          </fieldset>
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
          <a role="button" button-type="info" href="/cars/${car.objectId}/repairs" @click=${page.clickHandler}>
            <i class="material-icons">car_repair</i>
          </a>
        </div>
      </td>
      <td role="cell" data-cell-content="Редакция">
        <div class="buttons">
          <a role="button" href="/cars/${car.objectId}/edit" @click=${page.clickHandler}>
            <i class="material-icons">edit</i>
          </a>
        </div>
      </td>
      <td role="cell" data-cell-content="Изтриване">
        <div class="buttons">
          <button button-type="danger" @click=${(e) => onDelete(e, car)}>
            <i class="material-icons">delete_forever</i>
          </button>
        </div>
      </td>
    </tr>
  `;
};

/**
 * @description Render pagination links based on the current page, the total number of pages and the search query.
 * @param {number} pageNumber - The current page number.
 * @param {number} totalPages - The total number of pages.
 * @param {string} searchCategory - The search category string.
 * @param {string} searchQuery - The search query string.
 * @returns {import('lit').TemplateResult} The HTML template string.
 */
const renderPaginationLinks = (pageNumber, totalPages, searchCategory, searchQuery) => {
  /**
   * @description Generates the URL for a specific page.
   * @param {number} pageNum - The page number.
   * @returns {string} The generated URL.
   */
  const getLinkUrl = (pageNum) => {
    const queryParams = makeQueryParam({
      filter: searchCategory,
      query: searchQuery,
      page: pageNum.toString()
    });

    return `${window.location.pathname}?${queryParams}`;
  };

  /**
   * @description Generates a pagination link element.
   * @param {any} text - The text or HTML content of the link.
   * @param {number} pageNum - The page number.
   * @returns {import('lit').TemplateResult} The pagination link element.
   */
  const createPageLink = (text, pageNum) => {
    const isSamePage = pageNumber === pageNum || pageNum < 1 || pageNum > totalPages;
    const isCurrentPage = typeof text === 'number' && pageNumber === pageNum;
    const href = isSamePage ? '#' : getLinkUrl(pageNum);
    const className = `${isSamePage ? 'not-selectable' : ''} ${isCurrentPage ? 'active' : ''}`;

    return html`<a href=${href} class=${className} @click=${page.clickHandler}>${text}</a>`;
  };

  /**
   * @description Generates an array of page links based on the current page number, total pages, and a specified maximum number of pages.
   * @returns {Array<number>} - An array of page link objects.
   */
  function generateRelativePageLinks() {
    const relativePages = Math.floor(config.relativePageLinks / 2);
    const startPage = Math.min(Math.max(1, pageNumber - relativePages), Math.max(1, totalPages - config.relativePageLinks + 1));
    const endPage = Math.max(Math.min(totalPages, pageNumber + relativePages), Math.min(totalPages, config.relativePageLinks));
    const length = Math.min(endPage - startPage + 1, totalPages);

    return Array.from({ length }, (_, i) => startPage + i);
  }

  const first = createPageLink(html`<i class="material-icons">keyboard_double_arrow_left</i>`, 1);
  const prev = createPageLink(html`<i class="material-icons">chevron_left</i>`, pageNumber - 1);
  const pages = generateRelativePageLinks().map(pageNum => createPageLink(pageNum, pageNum));
  const next = createPageLink(html`<i class="material-icons">chevron_right</i>`, pageNumber + 1);
  const last = createPageLink(html`<i class="material-icons">keyboard_double_arrow_right</i>`, totalPages);

  return html`${first}${prev}${pages}${next}${last}`;
};