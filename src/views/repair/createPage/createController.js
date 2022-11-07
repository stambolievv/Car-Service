import { createRepair } from '../../../api/repairService';
import { formDataHandler, formatDate } from '../../../utils/util';
import { template } from './createView';

/**
 * @description It renders a form for adding a repair to a car.
 * @param {object} ctx - The pagejs context object.
 */
export function addRepairPage(ctx) {
  const update = (errors = {}) => ctx.render(template(onSubmit, errors));
  update();

  async function onSubmit(event) {
    event.preventDefault();
    const carId = ctx.params.id;
    if (event.submitter.id === 'reject') return ctx.page.redirect(`/catalog/repairs/${carId}`);

    try {
      const data = formDataHandler(event.target, 'km', 'date', 'description', 'profit');
      data.date = formatDate(data.date);

      await createRepair(carId, data);

      ctx.showNotify('Успешно добавихте ремонт', 'infoBox');
      ctx.page.redirect(`/catalog/repairs/${carId}`);
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