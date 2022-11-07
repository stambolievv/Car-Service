import { getAllCars, getCarsCount } from '../../../api/carService';
import { template } from './catalogView';
import { parseQuery } from '../../../utils/util';

/**
 * @description It renders a template with cars catalog and a page number.
 * @param {object} ctx - The pagejs context object.
 */
export async function carsCatalogPage(ctx) {
  const query = parseQuery(ctx.querystring);
  const page = Number(query.page) || 1;
  const search = query.search || '';
  const actions = { page, search, onSearch };

  ctx.render(template(catalogModel(page, search), actions));

  function onSearch(event) {
    event.preventDefault();

    const search = document.querySelector('#search-input').value.trim();
    if (search) ctx.page.redirect(`/catalog/cars?search=${encodeURIComponent(search)}`);
    else ctx.page.redirect('/catalog/cars');
  }
}

/**
 * @description It gets all cars from the API, and then gets the total number of cars from the API.
 * @param {number} [page=1] - The page number to be displayed.
 * @param {string} [search=''] - The search string.
 * @returns {Array} An array of two elements. The first element is an array of car objects. The second element is the total number of cars.
 */
async function catalogModel(page = 1, search = '') {
  const searchFor = document.querySelector('#searchOption')?.value || 'registration';

  const [{ results }, { count }] = await Promise.all([getAllCars(page, search, searchFor), getCarsCount(search, searchFor)]);
  return [results, count];
}