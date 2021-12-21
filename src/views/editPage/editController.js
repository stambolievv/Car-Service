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

    return { repair, onSubmit };

    async function onSubmit(e) {
        e.preventDefault();

        try {
            const data = formDataHandler(
                e.target,
                'vin',
                'registration',
                'make',
                'model',
                'engine',
                'description',
                'customerName',
                'customerPhone'
            );

            await editRepair(repairId, data);

            ctx.showNotify(`Успешно редактирахте автомобил "${repair.registration}"`, 'infoBox');

            ctx.page.redirect(`/details/${repair.objectId}`);
        } catch (err) {
            const errors = {
                message: err.message || err.errorMsg.message,
                type: err.errorType || {},
                data: err.errorData || {}
            };
            ctx.showNotify(errors.message);
        }
    }
}