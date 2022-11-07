import { createCar } from '../../../api/carService';
import { template } from './createView';
import { formDataHandler } from '../../../utils/util';

/**
 * @description It renders a form for adding a repair to a car.
 * @param {object} ctx - The pagejs context object.
 */
export function addCarPage(ctx) {
  const update = (errors = {}) => ctx.render(template(onSubmit, errors));
  update();

  async function onSubmit(event) {
    event.preventDefault();
    if (event.submitter.id === 'reject') return ctx.page.redirect('/catalog/cars');

    try {
      const data = formDataHandler(event.target, 'vin', 'registration', 'make', 'engine', 'customerName');
      await createCar(data);

      ctx.showNotify(`Създадохте успешно автомобил на ${data.customerName} - "${data.registration}"`, 'infoBox');
      ctx.page.redirect('/catalog/cars');
    } catch (err) {
      const errors = {
        message: err.message || err.errorMsg,
        type: err.errorType || {},
        data: err.errorData || {}
      };

      ctx.showNotify(errors.message);
      update(errors);
    }
  }
}