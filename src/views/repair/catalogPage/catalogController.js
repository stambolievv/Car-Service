import { getAllRepairs, getRepairsCount } from '../../../api/repairService.js';
import { getCarById } from '../../../api/carService.js';
import { parseQuery } from '../../../common/util.js';
import { template } from './catalogView.js';

export async function repairsCatalogPage(ctx) {
    const carId = ctx.params.id;
    const car = await getCarById(carId);

    const query = parseQuery(ctx.querystring);
    const page = Number(query.page) || 1;

    ctx.render(template(carModel(carId, page), car, page));
}

async function carModel(carId, page) {
    const data = await Promise.all([
        getAllRepairs(carId, page),
        getRepairsCount()
    ]);

    return [data[0].results, data[1].count];
}

