import { detailsRepair, deleteRepair } from '../../../api/repairService.js';
import { template } from './detailsView.js';

export function detailsRepairPage(ctx) {
    ctx.render(template(detailsModel(ctx)));
}

async function detailsModel(ctx) {
    const repairId = ctx.params.id;
    const repair = await detailsRepair(repairId);

    const isOwner = ctx.ownerUserOnly(repair);

    return { repair, actions: { isOwner, onDelete } };

    async function onDelete() {
        const confirmed = await ctx.showModal(`Сигурен ли си, че искаш да изтриеш ремонт от дата "${repair.date}" ?`);
        if (confirmed) {
            await deleteRepair(repair.objectId);
            
            ctx.showNotify('Успешно изтрихте ремонта', 'infoBox');
            return ctx.page.redirect(`/catalog/repairs/${repair.car.objectId}`);
        }
    }
}