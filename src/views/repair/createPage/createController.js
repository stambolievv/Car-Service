import { createRepair } from '../../../api/repairService.js';
import { formDataHandler, formatDate } from '../../../common/util.js';
import { template } from './createView.js';

export function addRepairPage(ctx) {
    const update = (errors = {}) => ctx.render(template(onSubmit, errors));

    update();

    async function onSubmit(e) {
        e.preventDefault();
        const carId = ctx.params.id;

        if (e.submitter.id == 'reject') { return ctx.page.redirect(`/catalog/repairs/${carId}`); }

        try {
            const data = formDataHandler(
                e.target,
                'km',
                'date',
                'description',
                'profit'
            );
            data.date = formatDate(data.date);

            await createRepair(carId, data);

            ctx.showNotify('Успешно добавихте ремонт', 'infoBox');
            return ctx.page.redirect(`/catalog/repairs/${carId}`);
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