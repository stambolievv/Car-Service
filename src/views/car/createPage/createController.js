import { createCar } from '../../../api/carService.js';
import { formDataHandler } from '../../../common/util.js';
import { template } from './createView.js';

export function addCarPage(ctx) {
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
                'make',
                'engine',
                'customerName'
            );
            console.log(data);
            await createCar(data);

            ctx.showNotify(`Създадохте успешно автомобил на ${data.customerName} - "${data.registration}"`, 'infoBox');

            return ctx.page.redirect('/catalog/cars');
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