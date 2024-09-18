import { html } from 'lit';
import { getQueryParam, makeQueryParam } from '@utilities';
import config from '../../config';

const RELATIVE_PAGE_LINKS = config.pagination.relativePageLinks;

/**
 * @description Render pagination links based on the current page, the total number of pages and the search query.
 * @param {number} currentPage - The current page number.
 * @param {number} totalPages - The total number of pages.
 * @param {Record<string, string | Array<string>>} [additionalQueryParams] - The search category string.
 * @returns {import('lit').TemplateResult} The HTML template string.
 */
export function renderPaginationLinks(currentPage, totalPages, additionalQueryParams) {
  /**
   * @description Generates a pagination link element.
   * @param {any} text - The text or HTML content of the link.
   * @param {number} pageNum - The desired page number.
   * @returns {import('lit').TemplateResult} The pagination link element.
   */
  const createPageLink = (text, pageNum) => {
    const isSamePage = currentPage === pageNum || pageNum < 1 || pageNum > totalPages;
    const isCurrentPage = typeof text === 'number' && currentPage === pageNum;
    const href = isSamePage ? '#' : getLinkUrl(pageNum, additionalQueryParams);
    const className = `${isSamePage ? 'not-selectable' : ''} ${isCurrentPage ? 'active' : ''}`;

    return html`<a .href=${href} .className=${className}>${text}</a>`;
  };

  const first = createPageLink(html`<i class="material-icons">keyboard_double_arrow_left</i>`, 1);
  const prev = createPageLink(html`<i class="material-icons">chevron_left</i>`, currentPage - 1);
  const pages = generateRelativePageLinks(currentPage, totalPages).map(pageNum => createPageLink(pageNum, pageNum));
  const next = createPageLink(html`<i class="material-icons">chevron_right</i>`, currentPage + 1);
  const last = createPageLink(html`<i class="material-icons">keyboard_double_arrow_right</i>`, totalPages);

  return html`<fieldset class="pagination">${first}${prev}${pages}${next}${last}</fieldset>`;
}

/**
 * @description Generates the URL for a specific page.
 * @param {number} desiredPage - The desired page number.
 * @param {Record<string, string | Array<string>>} [additionalQueryParams] - The search category string.
 * @returns {string} The generated URL.
 */
function getLinkUrl(desiredPage, additionalQueryParams) {
  const queryParams = makeQueryParam({
    ...getQueryParam(window.location.search.slice(1)),
    ...additionalQueryParams,
    page: desiredPage.toString()
  });

  return `${window.location.pathname}?${queryParams}`;
}

/**
 * @description Generates an array of page links based on the current page number, total pages, and a specified maximum number of pages.
 * @param {number} currentPage - The current page number.
 * @param {number} totalPages - The total number of pages.
 * @returns {Array<number>} An array of page relative numbers.
 */
function generateRelativePageLinks(currentPage, totalPages) {
  const relativePages = Math.floor(RELATIVE_PAGE_LINKS / 2);
  const startPage = Math.min(Math.max(1, currentPage - relativePages), Math.max(1, totalPages - RELATIVE_PAGE_LINKS + 1));
  const endPage = Math.max(Math.min(totalPages, currentPage + relativePages), Math.min(totalPages, RELATIVE_PAGE_LINKS));

  return Array.from({ length: Math.min(endPage - startPage + 1, totalPages) }, (_, i) => startPage + i);
}