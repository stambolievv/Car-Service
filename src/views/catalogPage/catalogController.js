import { getMyRepairs } from '../../api/data.js';
import { template } from './catalogView.js';

export function catalogPage(ctx) {
    ctx.render(template(catalogModel(ctx)));
}

async function catalogModel() {
    return await getMyRepairs();
}