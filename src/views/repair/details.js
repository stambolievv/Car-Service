import page from 'page';
import { until } from 'lit/directives/until.js';
import { getRepairById } from '@db';
import { repairDetails as template } from '@templates';
import { notice } from '@utilities';

/**
 * @description Renders the `details for a repair` page and handles the deletion of a repair.
 * @param {Context} ctx - The context object.
 */
export function detailsRepairPage(ctx) {
  const { carId, repairId } = ctx.params;
  const { prev = `${page.base()}/cars/${carId}/repairs` } = ctx.state;

  ctx.render(until((async () => {
    const data = await getPageData(carId, repairId);
    if (!data) return;

    return template({ repair: data, prev });
  })(), notice.showLoading()));
}

/**
 * @description Retrieves the repair data for a given car.
 * @param {string} carId - The ID of the car associated with the repair.
 * @param {string} repairId - The ID of the repair to retrieve.
 * @returns {Promise<Repair | undefined>} A promise that resolves with the repair object.
 */
async function getPageData(carId, repairId) {
  try {
    return await getRepairById(carId, repairId);
  } catch (error) {
    const errorMessages = error instanceof Error ? error.message : 'Възникна грешка, моля опитайте по-късно';
    notice.showToast({ text: errorMessages, type: 'error' });
    page.redirect(`/cars/${carId}/repairs`);
  } finally {
    notice.hideLoading();
  }
}