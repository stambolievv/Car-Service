import page from 'page';
import { until } from 'lit/directives/until.js';
import { getRepairById, editRepair } from '@db';
import { repairEdit as template } from '@templates';
import { formDataHandler, formatDateToISO, notice } from '@utilities';

/**
 * @description Renders the `edit a repair` page and handles the form submission for editing a repair.
 * @param {Context} ctx - The context object.
 */
export function editRepairPage(ctx) {
  const { carId, repairId } = ctx.params;

  ctx.render(until((async () => {
    const data = await getPageData(carId, repairId);
    if (!data) return;

    return template({ repair: data, onSubmit: (event) => onSubmit(event, data) });
  })(), notice.showLoading()));
}

/**
 * @description Retrieves repair data for a given car.
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
 * @description Handles the form submission for editing a repair.
 * @param {SubmitEvent} event - The form submission event.
 * @param {Repair} repair - The repair object to be edited.
 */
async function onSubmit(event, repair) {
  event.preventDefault();

  const form = /**@type {HTMLFormElement}*/(event.target);
  const [data, setDisabled] = /**@type {[RepairData, (disable: boolean) => void]}*/(formDataHandler(form));

  const day = data.date;
  data.date = formatDateToISO(data.date);

  try {
    setDisabled(true);
    notice.showLoading();
    await editRepair(repair.car.objectId, repair.objectId, data);
    notice.showToast({ text: `Успешно редактирахте ремонт от дата "${day}"`, type: 'info' });
  } catch (error) {
    const errorMessages = error instanceof Error ? error.message : 'Възникна грешка, моля опитайте по-късно';
    notice.showToast({ text: errorMessages, type: 'error' });
  } finally {
    setDisabled(false);
    notice.hideLoading();
    form.reset();
    page.redirect(`/cars/${repair.car.objectId}/repairs/${repair.objectId}`);
  }
}