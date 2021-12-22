import { createRepair } from '../../api/data.js';
import { formDataHandler } from '../../common/formData.js';
import { template } from './createView.js';

export function createPage(ctx) {
    const update = (errors = {}) => ctx.render(template(onSubmit, errors));

    update();

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
                'profit',
                'customerName',
                'customerPhone'
            );

            await createRepair(data);

            ctx.showNotify(`Завършихте успешно ремон по автомобил "${data.registration}"`, 'infoBox');

            ctx.page.redirect('/catalog');
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