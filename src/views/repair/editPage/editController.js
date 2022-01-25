import { getRepairById, editRepair } from '../../../api/repairService.js';
import { formDataHandler } from '../../../util/util.js';
import { template } from './editView.js';

export function editRepairPage(ctx) {
    ctx.render(template(editModel(ctx)));
}

async function editModel(ctx) {
    const repairId = ctx.params.id;
    const repair = await getRepairById(repairId);

    ctx.ownerUserOnly(repair);

    return { repair, onSubmit, errors: {} };

    async function onSubmit(e) {
        e.preventDefault();

        if (e.submitter.id == 'reject') { return ctx.page.redirect(`/details/repair/${repair.objectId}`); }

        try {
            const data = formDataHandler(
                e.target,
                'km',
                'date',
                'description',
                'profit'
            );

            await editRepair(repairId, data);

            ctx.showNotify(`Успешно редактирахте ремонт от дата "${data.date}"`, 'infoBox');
            return ctx.page.redirect(`/details/repair/${repair.objectId}`);
        } catch (err) {
            const errors = {
                message: err.message || err.errorMsg,
                type: err.errorType || {},
                data: err.errorData || {}
            };
            const repair = errors.data;
            
            ctx.showNotify(errors.message);
            return ctx.render(template({ repair, onSubmit, errors }));
        }
    }
}