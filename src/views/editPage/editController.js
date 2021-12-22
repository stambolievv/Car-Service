import { getRepairById, editRepair } from '../../api/data.js';
import { formDataHandler } from '../../common/formData.js';
import { template } from './editView.js';

export function editPage(ctx) {
    ctx.render(template(editModel(ctx)));
}

async function editModel(ctx) {
    const repairId = ctx.params.id;
    const repair = await getRepairById(repairId);

    ctx.ownerUserOnly(repair);

    return { repair, onSubmit, errors: {} };

    async function onSubmit(e) {
        e.preventDefault();

        if (e.submitter.id == 'reject') { return ctx.page.redirect(`/details/${repair.objectId}`); }

        try {
            const data = formDataHandler(
                e.target,
                'vin',
                'registration',
                'make',
                'model',
                'engine',
                'description',
                'profit',
                'customerName',
                'customerPhone'
            );

            await editRepair(repairId, data);

            ctx.showNotify(`Успешно редактирахте автомобил "${repair.registration}"`, 'infoBox');

            return ctx.page.redirect(`/details/${repair.objectId}`);
        } catch (err) {
            const errors = {
                message: err.message || err.errorMsg,
                type: err.errorType || {},
                data: err.errorData || {}
            };
            ctx.showNotify(errors.message);
            const repair = errors.data;

            return ctx.render(template({ repair, onSubmit, errors }));
        }
    }
}