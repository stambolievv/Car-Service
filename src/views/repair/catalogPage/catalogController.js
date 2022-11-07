import { getAllRepairs, getRepairsCount } from '../../../api/repairService';
import { getCarById } from '../../../api/carService';
import { parseQuery } from '../../../utils/util';
import { template } from './catalogView';

/**
 * @description It renders a template with cars catalog and a page number.
 * @param {object} ctx - The pagejs context object.
 */
export function repairsCatalogPage(ctx) {
  const carId = ctx.params.id;
  const query = parseQuery(ctx.querystring);
  const page = Number(query.page) || 1;

  ctx.render(template(carModel(carId, page), page));
}

/**
 * @description Get all repairs, get the count of repairs, and get the car by id, then return all of those things.
 * @param {string} carId - The id of the car we want to get the repairs for.
 * @param {number} [page=1] - The page number of the results to return.
 * @returns {Array} An array of three elements:
 * 1. An array of repairs.
 * 2. The count of repairs.
 * 3. The car object.
 */
async function carModel(carId, page = 1) {
  const [{ results: repairs }, { count }, car] = await Promise.all([
    getAllRepairs(carId, page),
    getRepairsCount(carId),
    getCarById(carId)
  ]);

  return [repairs, count, car];
}