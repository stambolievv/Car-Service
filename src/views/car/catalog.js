import page from 'page';
import { until } from 'lit/directives/until.js';
import { getAllCars, deleteCar, deleteAllRepairs } from '@db';
import { carCatalog as template } from '@templates';
import { getQueryParam, makeQueryParam, notice } from '@utilities';

/**
 * @description Renders the `catalog with cars` page.
 * @param {Context} ctx - The context object.
 */
export function carsCatalogPage(ctx) {
  const { page = '1', filter = '', query = '', } = /**@type {{page: string, filter: string, query: string}}*/(getQueryParam(ctx.querystring));

  ctx.render(until((async () => {
    const data = await getPageData(Number(page) || 1, filter, query);
    if (!data) return;

    return template({ ...data, onSearch, onDelete });
  })(), notice.showLoading()));
}

/**
 * @description Retrieves cars data along within the page number and search query.
 * @param {number} pageNumber - The page number to retrieve data for.
 * @param {string} searchCategory - The search category string.
 * @param {string} searchQuery - The search query string.
 * @returns {Promise<{cars: Array<Car>, carsCount: number, pageNumber: number, searchCategory: string, searchQuery: string} | undefined>} A promise that resolves with an object containing the data.
 */
async function getPageData(pageNumber, searchCategory, searchQuery) {
  try {
    const { results: cars, count: carsCount } = await getAllCars(pageNumber, searchCategory, searchQuery);

    return { cars, carsCount, pageNumber, searchCategory, searchQuery };
  } catch (error) {
    const errorMessages = error instanceof Error ? error.message : 'Възникна грешка, моля опитайте по-късно';
    notice.showToast({ text: errorMessages, type: 'error' });
    page.redirect('/');
  } finally {
    notice.hideLoading();
  }
}

/**
 * @description Handles the search event and redirects to the search results page.
 * @param {Event} event - The form search event.
 */
function onSearch(event) {
  event.preventDefault();

  const searchCategory = /**@type {HTMLSelectElement}*/(document.getElementById('search-options')).value.trim();
  const searchQuery = /**@type {HTMLInputElement}*/(document.getElementById('search-input')).value.trim();

  if (searchCategory && searchQuery) page.redirect(`/cars?${makeQueryParam({ filter: searchCategory, query: searchQuery })}`);
  else page.redirect('/cars');
}

/**
 * @description Handles the delete event for a car.
 * @param {Event} event - The form deletion event.
 * @param {Car} car - The car object to be deleted.
 */
async function onDelete(event, car) {
  event.preventDefault();

  const confirm = await new Promise(resolve => {
    return notice.showModal({
      message: `Сигурен ли си, че искаш да изтриеш автомобила на ${car.customerName} - "${car.registration}"`,
      onConfirm: () => resolve(true),
      onCancel: () => resolve(false)
    });
  });

  if (!confirm) return;

  try {
    notice.showLoading();
    await Promise.all([deleteAllRepairs(car.objectId), deleteCar(car.objectId)]);
    notice.showToast({ text: `Успешно изтрихте автомобила на ${car.customerName} - "${car.registration}"`, type: 'info' });
  } catch (error) {
    const errorMessages = error instanceof Error ? error.message : 'Възникна грешка, моля опитайте по-късно';
    notice.showToast({ text: errorMessages, type: 'error' });
  } finally {
    notice.hideLoading();
    page.redirect('/cars');
  }
}