import page from 'page';
import { createRepair } from '../../api';
import { repairCreate as template } from '../../templates';
import { formDataHandler, notice } from '../../utilities';

/**
 * @description Renders the `create a repair` page and handles the form submission for creating a new repair.
 * @param {Context} ctx - The context object.
 */
export function createRepairPage(ctx) {
  ctx.render(template(ctx.params.carId, onSubmit));
}

/**
 * @description Handles form submission for creating a new repair record.
 * @param {SubmitEvent} event - The form submission event.
 * @param {string} carId - The id of the car to add the repair to.
 */
async function onSubmit(event, carId) {
  event.preventDefault();

  const form = /**@type {HTMLFormElement}*/(event.target);
  const [data, setDisabled] = /**@type {[RepairData, (disable: boolean) => void]}*/(formDataHandler(form));

  try {
    setDisabled(true);
    notice.showLoading();
    await createRepair(carId, data);
    notice.showToast({ text: 'Успешно добавихте ремонт', type: 'success' });
  } catch (error) {
    const errorMessages = error instanceof Error ? error.message : 'Възникна грешка, моля опитайте по-късно';
    notice.showToast({ text: errorMessages, type: 'error' });
  } finally {
    setDisabled(false);
    notice.hideLoading();
    form.reset();
    page.redirect(`/cars/${carId}/repairs`);
  }
}