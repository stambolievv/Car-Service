import { getCarById, editCar, deleteCar } from '../../../api/carService.js';
import { getAllRepairs, deleteAllRepairs } from '../../../api/repairService.js';
import { formDataHandler } from '../../../util/util.js';
import { template } from './editView.js';

export function editCarPage(ctx) {
    ctx.render(template(editModel(ctx)));
}

async function editModel(ctx) {
    const car = await getCarById(ctx.params.id);

    ctx.ownerUserOnly(car);

    const actions = { onSubmit, onDelete, };

    return { car, errors: {}, actions };

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

            await editCar(car.objectId, data);

            ctx.showNotify(`Успешно редактирахте ремонт на ${data.customerName} - "${data.registration}"`, 'infoBox');
            return ctx.page.redirect(`/catalog/repairs/${car.objectId}`);
        } catch (err) {
            const errors = {
                message: err.errorMsg || err.message,
                type: err.errorType || {},
                data: err.errorData || {}
            };
            const car = errors.data;

            ctx.showNotify(errors.message);
            return ctx.render(template({ car, errors, actions }));
        }
    }

    async function onDelete() {
        const confirmed = await ctx.showModal(`Сигурен ли си, че искаш да изтриеш автомобила на ${car.customerName} - "${car.registration}"`);
        if (confirmed) {
            const repairs = await getAllRepairs(car.objectId);

            await Promise.all([
                deleteAllRepairs(repairs.results),
                deleteCar(car.objectId)
            ]);

            ctx.showNotify('Успешно изтрихте автомобила', 'infoBox');
            return ctx.page.redirect('/catalog/cars');
        }
    }
}