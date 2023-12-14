import page from 'page';
import { createCar } from '../../api';
import { carCreate as template } from '../../templates';
import { formDataHandler, notice } from '../../utilities';

/**
 * @description Renders the `creates a car` page and handles the form submission for creating a new car.
 * @param {Context} ctx - The context object.
 */
export function createCarPage(ctx) {
  const { prev = `${page.base()}/cars` } = ctx.state;

  ctx.render(template({ prev, onSubmit }));
}

/**
 * @description Handles form submission for creating a new car record.
 * @param {SubmitEvent} event - The form submission event.
 */
async function onSubmit(event) {
  event.preventDefault();

  const form = /**@type {HTMLFormElement}*/(event.target);
  const [data, setDisabled] = /**@type {[CarData, (disable: boolean) => void]}*/(formDataHandler(form));

  try {
    setDisabled(true);
    notice.showLoading();
    await createCar(data);
    notice.showToast({ text: `Успешно създадохте автомобил на ${data.customerName} - "${data.registration}"`, type: 'success' });
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