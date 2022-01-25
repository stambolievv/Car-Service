import { getAllRepairs, getRepairsCount } from '../../../api/repairService.js';
import { getCarById } from '../../../api/carService.js';
import { parseQuery } from '../../../util/util.js';
import { template } from './catalogView.js';

export function repairsCatalogPage(ctx) {
    const carId = ctx.params.id;

    const query = parseQuery(ctx.querystring);
    const page = Number(query.page) || 1;

    ctx.render(template(carModel(carId, page), page));
}

async function carModel(carId, page) {
    const data = await Promise.all([
        getAllRepairs(carId, page),
        getRepairsCount(carId),
        getCarById(carId)
    ]);

    return [data[0].results, data[1].count, data[2]];
}

