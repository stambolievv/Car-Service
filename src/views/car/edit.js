import page from 'page';
import { until } from 'lit/directives/until.js';
import { getCarById, editCar } from '@db';
import { carEdit as template } from '@templates';
import { formDataHandler, notice } from '@utilities';

/**
 * @description Renders the `edit a car` page and handles the form submission for editing a car.
 * @param {Context} ctx - The context object.
 */
export function editCarPage(ctx) {
  const { carId } = ctx.params;
  const { prev = `${page.base()}/cars` } = ctx.state;

  ctx.render(until((async () => {
    const data = await getPageData(carId);
    if (!data) return;

    return template({ car: data, prev, onSubmit: (event) => onSubmit(event, data) });
  })(), notice.showLoading()));
}

/**
 * @description Retrieves car data.
 * @param {string} carId - The ID of the car.
 * @returns {Promise<Car | undefined>} A promise that resolves with the repair object.
 */
async function getPageData(carId) {
  try {
    return await getCarById(carId);
  } catch (error) {
    const errorMessages = error instanceof Error ? error.message : 'Възникна грешка, моля опитайте по-късно';
    notice.showToast({ text: errorMessages, type: 'error' });
    page.redirect('/cars');
  } finally {
    notice.hideLoading();
  }
}

/**
 * @description Handles the form submission for editing a car.
 * @param {SubmitEvent} event - The form submission event.
 * @param {Car} car - The car object to be edited.
 */
async function onSubmit(event, car) {
  event.preventDefault();

  const form = /**@type {HTMLFormElement}*/(event.target);
  const [data, setDisabled] = /**@type {[CarData, (disable: boolean) => void]}*/(formDataHandler(form));

  try {
    setDisabled(true);
    notice.showLoading();
    await editCar(car.objectId, data);
    notice.showToast({ text: `Успешно редактирахте ремонт на ${data.customerName} - "${data.registration}"`, type: 'info' });
  } catch (error) {
    const errorMessages = error instanceof Error ? error.message : 'Възникна грешка, моля опитайте по-късно';
    notice.showToast({ text: errorMessages, type: 'error' });
  } finally {
    setDisabled(false);
    notice.hideLoading();
    form.reset();
    page.redirect('/cars');
  }
}