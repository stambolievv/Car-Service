import page from 'page';
import { html } from 'lit';
import { makeQueryParam } from '../../utilities';
import config from '../../config';

/**
 * @description Generates the HTML template for the `catalog with repairs` page.
 * @param {{repairs: Array<Repair>, repairsCount: number, car: Car, pageNumber: number, lastVisitedRoute: string}} data - The data containing catalog information.
 * @returns {import('lit').TemplateResult} The HTML template string.
 */
export default (data) => {
  const { repairs, repairsCount, car, pageNumber, lastVisitedRoute } = data;
  const totalPages = Math.max(Math.ceil(repairsCount / config.itemsPerPage), 1);

  return html`
    <section id="catalog-page">
      <form autocomplete="off">
        <fieldset>
          <legend>Всичките ремонти на ${car.customerName} - "${car.registration}"</legend>

          <fieldset class="search">
            <div class="buttons">
              <a role="button" data-button-type="success" href="${page.base()}/cars/${car.objectId}/repairs/create" @click=${page.clickHandler}>Добави ремонт</a>
              <a role="button" href="${page.base()}${lastVisitedRoute}" @click=${page.clickHandler}>Назад</a>
            </div>
          </fieldset>

          ${renderContent(repairs)}

          <fieldset class="pagination">
            ${renderPaginationLinks(pageNumber, totalPages)}
          </fieldset>
        </fieldset>
      </form>
    </section>
  `;
};

/**
 * @description Render the content based on the repairs data.
 * @param {Array<Repair>} repairs - The array of repairs.
 * @returns {import('lit').TemplateResult} The HTML template string.
 */
const renderContent = (repairs) => {
  if (repairs.length > 0) return renderTable(repairs);
  return html`<p class="empty">Нямаш завършени ремонти!</p>`;
};

/**
 * @description Render the table based on the repairs data.
 * @param {Array<Repair>} repairs - The array of repairs.
 * @returns {import('lit').TemplateResult} The HTML template string.
 */
const renderTable = (repairs) => {
  return html`
    <table role="table">
      <thead role="rowgroup">
        <tr role="row">
          <th role="columnheader">Извършен на</th>
          <th role="columnheader">Километри</th>
          <th role="columnheader">Детайли по ремонта</th>
        </tr>
      </thead>
      <tbody role="rowgroup">
        ${repairs.map(renderTableRow)}
      </tbody>
    </table>
  `;
};

/**
 * @description Render a table row for a repair entry.
 * @param {Repair} repair - The repair object.
 * @returns {import('lit').TemplateResult} The HTML template string.
 */
const renderTableRow = (repair) => {
  return html`
    <tr role="row">
      <td role="cell" data-cell-content="Извършен на">${repair.date}</td>
      <td role="cell" data-cell-content="Километри">${repair.km}</td>
      <td role="cell" data-cell-content="Детайли по ремонта">
        <div class="buttons">
          <a role="button" data-button-type="info" href="${page.base()}/cars/${repair.car.objectId}/repairs/${repair.objectId}" @click=${page.clickHandler}>Детайли</a>
        </div>
      </td>
    </tr>
  `;
};

/**
 * @description Render pagination links based on the current page and the total number of pages.
 * @param {number} pageNumber - The current page.
 * @param {number} totalPages - The total number of pages.
 * @returns {import('lit').TemplateResult} The HTML template string.
 */
const renderPaginationLinks = (pageNumber, totalPages) => {
  /**
   * @description Generates the URL for a specific page.
   * @param {number} pageNum - The page number.
   * @returns {string} The generated URL.
   */
  const getLinkUrl = (pageNum) => {
    const queryParams = makeQueryParam({
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

    return html`<a .href=${href} .className=${className} @click=${page.clickHandler}>${text}</a>`;
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