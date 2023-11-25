import page from 'page';
import { until } from 'lit/directives/until.js';
import { getRepairById, deleteRepair } from '../../api';
import { repairDetails as template } from '../../templates';
import { notice } from '../../utilities';

/**
 * @description Renders the `details for a repair` page and handles the deletion of a repair.
 * @param {Context} ctx - The context object.
 */
export async function detailsRepairPage(ctx) {
  const { carId, repairId } = ctx.params;

  ctx.render(until((async () => {
    const data = await getPageData(carId, repairId);
    if (!data) return;

    return template(data, onDelete);
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

/**
 * @description Handles the delete event for a repair.
 * @param {Event} event - The form deletion event.
 * @param {Repair} repair - The repair object to be deleted.
 */
async function onDelete(event, repair) {
  event.preventDefault();

  const confirm = await new Promise(resolve => {
    return notice.showModal({
      message: `Сигурен ли си, че искаш да изтриеш ремонт от дата "${repair.date}"`,
      onConfirm: () => resolve(true),
      onCancel: () => resolve(false)
    });
  });

  if (!confirm) return;

  try {
    notice.showLoading();
    await deleteRepair(repair.car.objectId, repair.objectId);
    notice.showToast({ text: 'Успешно изтрихте ремонта', type: 'info' });
  } catch (error) {
    const errorMessages = error instanceof Error ? error.message : 'Възникна грешка, моля опитайте по-късно';
    notice.showToast({ text: errorMessages, type: 'error' });
  } finally {
    notice.hideLoading();
    page.redirect(`/cars/${repair.car.objectId}/repairs`);
  }
}