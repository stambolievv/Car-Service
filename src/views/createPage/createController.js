import { createRepair } from '../../api/data.js';
import { formDataHandler } from '../../common/util.js';
import { template } from './createView.js';

export function createPage(ctx) {
    const update = (errors = {}) => ctx.render(template(onSubmit, errors));

    update();

    async function onSubmit(e) {
        e.preventDefault();

        if (e.submitter.id == 'reject') { return ctx.page.redirect('/catalog'); }

        try {
            const data = formDataHandler(
                e.target,
                'vin',
                'registration',
                'km',
                'make',
                'model',
                'engine',
                'description',
                'profit',
                'customerName',
                'customerPhone'
            );

            await createRepair(data);

            ctx.showNotify(`Завършихте успешно ремон по автомобил "${data.registration}"`, 'infoBox');

            return ctx.page.redirect('/catalog');
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