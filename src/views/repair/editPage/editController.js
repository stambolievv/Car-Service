import { getRepairById, editRepair } from '../../../api/repairService';
import { formDataHandler } from '../../../utils/util';
import { template } from './editView';

/**
 * @description It renders the edit page for a repair.
 * @param {object} ctx - The pagejs context object.
 */
export function editRepairPage(ctx) {
  ctx.render(template(editModel(ctx)));
}

async function editModel(ctx) {
  const repairId = ctx.params.id;
  const repair = await getRepairById(repairId);

  ctx.ownerUserOnly(repair);

  return { repair, onSubmit, errors: {} };

  async function onSubmit(event) {
    event.preventDefault();
    if (event.submitter.id === 'reject') return ctx.page.redirect(`/details/repair/${repair.objectId}`);

    try {
      const data = formDataHandler(event.target, 'km', 'date', 'description', 'profit');
      await editRepair(repairId, data);

      ctx.showNotify(`Успешно редактирахте ремонт от дата "${data.date}"`, 'infoBox');
      ctx.page.redirect(`/details/repair/${repair.objectId}`);
    } catch (err) {
      const errors = {
        message: err.message || err.errorMsg,
        type: err.errorType || {},
        data: err.errorData || {}
      };

      ctx.showNotify(errors.message);
      return ctx.render(template({ repair: errors.data, onSubmit, errors }));
    }
  }
}