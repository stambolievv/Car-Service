import { getCarById, editCar } from '../../../api/carService.js';
import { formDataHandler } from '../../../common/util.js';
import { template } from './editView.js';

export function editCarPage(ctx) {
    ctx.render(template(editModel(ctx)));
}

async function editModel(ctx) {
    const carId = ctx.params.id;
    const car = await getCarById(carId);

    ctx.ownerUserOnly(car);

    return { car, onSubmit, errors: {} };

    async function onSubmit(e) {
        e.preventDefault();

        if (e.submitter.id == 'reject') { return ctx.page.redirect(`/catalog/repairs/${car.objectId}`); }

        try {
            const data = formDataHandler(
                e.target,
                'vin',
                'registration',
                'make',
                'engine',
                'customerName'
            );

            await editCar(carId, data);

            ctx.showNotify(`Успешно редактирахте ремонт на ${data.customerName} - "${data.registration}"`, 'infoBox');

            return ctx.page.redirect(`/catalog/repairs/${car.objectId}`);
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