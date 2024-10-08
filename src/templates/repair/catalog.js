import page from 'page';
import { html } from 'lit';
import { renderPaginationLinks } from '@templates';
import { formatDateToLocale } from '@utilities';
import config from '../../config';

const ROWS_PER_PAGE = config.catalogsTable.rowsPerPage;

/**
 * @typedef {object} RepairCatalogPageProps
 * @property {Array<Repair>} repairs - The array of repairs.
 * @property {number} repairsCount - The total number of repairs.
 * @property {Car} car - The car object.
 * @property {number} pageNumber - The current page number.
 * @property {string} prev - The previous page path.
 * @property {(event: Event, repair: Repair) => void} onDelete - The function to be called when the delete button is clicked.
 */

/**
 * @description Generates the HTML template for the `catalog with repairs` page.
 * @param {RepairCatalogPageProps} data - The data containing catalog information.
 * @returns {import('lit').TemplateResult} The HTML template string.
 */
export default (data) => {
  const { repairs, repairsCount, car, pageNumber, prev, onDelete } = data;
  const totalPages = Math.max(Math.ceil(repairsCount / ROWS_PER_PAGE), 1);

  return html`
    <section id="catalog-page">
      <form autocomplete="off">
        <fieldset>
          <legend>Всички ремонти на ${car.customerName} - рег. &numero; "${car.registration}"</legend>

          <fieldset class="search">
            <div class="buttons">
              <a role="button" data-button-type="success" href="${page.base()}/cars/${car.objectId}/repairs/create">Добави ремонт</a>
              <a role="button" href="${prev}">Назад</a>
            </div>
          </fieldset>

          ${renderContent(repairs, onDelete)}

          ${renderPaginationLinks(pageNumber, totalPages)}
        </fieldset>
      </form>
    </section>
  `;
};

/**
 * @description Render the content based on the repairs data.
 * @param {Array<Repair>} repairs - The array of repairs.
 * @param {(event: Event, repair: Repair) => void} onDelete - The function to be called when the delete button is clicked.
 * @returns {import('lit').TemplateResult} The HTML template string.
 */
const renderContent = (repairs, onDelete) => {
  if (repairs.length > 0) return renderTable(repairs, onDelete);
  return html`<p class="empty">Нямаш завършени ремонти!</p>`;
};

/**
 * @description Render the table based on the repairs data.
 * @param {Array<Repair>} repairs - The array of repairs.
 * @param {(event: Event, repair: Repair) => void} onDelete - The function to be called when the delete button is clicked.
 * @returns {import('lit').TemplateResult} The HTML template string.
 */
const renderTable = (repairs, onDelete) => {
  return html`
    <table role="table">
      <thead role="rowgroup">
        <tr role="row">
          <th role="columnheader">Извършен на</th>
          <th role="columnheader">Километри</th>
          <th role="columnheader">Детайли по ремонта</th>
          <th role="columnheader">Изтриване</th>
        </tr>
      </thead>
      <tbody role="rowgroup">
        ${repairs.map(repair => renderTableRow(repair, onDelete))}
      </tbody>
    </table>
  `;
};

/**
 * @description Render a table row for a repair entry.
 * @param {Repair} repair - The repair object.
 * @param {(event: Event, repair: Repair) => void} onDelete - The function to be called when the delete button is clicked.
 * @returns {import('lit').TemplateResult} The HTML template string.
 */
const renderTableRow = (repair, onDelete) => {
  return html`
    <tr role="row">
      <td role="cell" data-cell-content="Извършен на">${formatDateToLocale(repair.date)}</td>
      <td role="cell" data-cell-content="Километри">${repair.km}</td>
      <td role="cell" data-cell-content="Детайли по ремонта">
        <div class="buttons">
          <a role="button" data-button-type="info" href="${page.base()}/cars/${repair.car.objectId}/repairs/${repair.objectId}">Детайли</a>
        </div>
      </td>
      <td role="cell" data-cell-content="Изтриване">
        <div class="buttons">
          <button data-button-type="danger" @click=${(e) => onDelete(e, repair)}>
            <i class="material-icons">delete_forever</i>
          </button>
        </div>
      </td>
    </tr>
  `;
};