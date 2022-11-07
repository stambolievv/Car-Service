import { detailsRepair, deleteRepair } from '../../../api/repairService.js';
import { template } from './detailsView.js';

/**
 * @description It renders the details page for a repair.
 * @param {object} ctx - The pagejs context object.
 */
export function detailsRepairPage(ctx) {
  ctx.render(template(detailsModel(ctx)));
}

/**
 * @description It loads the repair details from the database, checks if the current user is the owner of the repair, and returns the repair and a function that deletes the repair.
 * @param {object} ctx - The pagejs context object.
 */
async function detailsModel(ctx) {
  const repairId = ctx.params.id;
  const repair = await detailsRepair(repairId);

  ctx.ownerUserOnly(repair);

  return { repair, onDelete };

  async function onDelete() {
    const confirmed = await ctx.showModal(`Сигурен ли си, че искаш да изтриеш ремонт от дата "${repair.date}" ?`);
    if (!confirmed) return;

    await deleteRepair(repair.objectId);

    ctx.showNotify('Успешно изтрихте ремонта', 'infoBox');
    ctx.page.redirect(`/catalog/repairs/${repair.car.objectId}`);
  }
}