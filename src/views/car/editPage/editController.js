import { getCarById, editCar, deleteCar } from '../../../api/carService';
import { getAllRepairs, deleteAllRepairs } from '../../../api/repairService';
import { template } from './editView';
import { formDataHandler } from '../../../utils/util';

/**
 * @description It renders the edit page for a repair.
 * @param {object} ctx - The pagejs context object.
 */
export function editCarPage(ctx) {
  ctx.render(template(editModel(ctx)));
}

async function editModel(ctx) {
  const car = await getCarById(ctx.params.id);
  ctx.ownerUserOnly(car);

  const actions = { onSubmit, onDelete };
  return { car, errors: {}, actions };

  async function onSubmit(event) {
    event.preventDefault();
    if (event.submitter.id === 'reject') return ctx.page.redirect(`/catalog/repairs/${car.objectId}`);

    try {
      const data = formDataHandler(event.target, 'vin', 'registration', 'make', 'engine', 'customerName');
      await editCar(car.objectId, data);

      ctx.showNotify(`Успешно редактирахте ремонт на ${data.customerName} - "${data.registration}"`, 'infoBox');
      ctx.page.redirect(`/catalog/repairs/${car.objectId}`);
    } catch (err) {
      const errors = {
        message: err.errorMsg || err.message,
        type: err.errorType || {},
        data: err.errorData || {}
      };

      ctx.showNotify(errors.message);
      return ctx.render(template({ car: errors.data, errors, actions }));
    }
  }

  async function onDelete() {
    const confirmed = await ctx.showModal(`Сигурен ли си, че искаш да изтриеш автомобила на ${car.customerName} - "${car.registration}"`);
    if (!confirmed) return;

    const repairs = await getAllRepairs(car.objectId);
    await Promise.all([
      deleteAllRepairs(repairs.results),
      deleteCar(car.objectId)
    ]);

    ctx.showNotify('Успешно изтрихте автомобила', 'infoBox');
    ctx.page.redirect('/catalog/cars');
  }
}