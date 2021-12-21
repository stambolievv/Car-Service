import { detailsRepair, deleteRepair } from '../../api/data.js';
import { template } from './detailsView.js';

export function detailsPage(ctx) {
    ctx.render(template(detailsModel(ctx)));
}

async function detailsModel(ctx) {
    const repairId = ctx.params.id;
    const repair = await detailsRepair(repairId);

    const isOwner = ctx.ownerUserOnly(repair);

    return { repair, actions: { isOwner, onDelete } };

    async function onDelete() {
        const confirmed = await ctx.showModal(`Сигурен ли си, че искаш за изтриеш автомобил "${repair.registration}" от ремонтите си?`);
        if (confirmed) {
            await deleteRepair(repair.objectId);
            await ctx.showNotify(`Успешно изтрихте автомобил "${repair.registration}" от ремонтите си`, 'infoBox');

            ctx.page.redirect('/catalog');
        }
    }
}