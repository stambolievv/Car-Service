import { getAllCars, getCarsCount } from '../../../api/carService.js';
import { parseQuery } from '../../../common/util.js';
import { template } from './catalogView.js';

export async function carsCatalogPage(ctx) {
    const query = parseQuery(ctx.querystring);
    const page = Number(query.page) || 1;
    const search = query.search || '';

    const actions = { page, search, onSearch };

    ctx.render(template(catalogModel(page, search), actions));

    function onSearch(e) {
        e.preventDefault();

        const search = document.querySelector('#search-input').value.trim();
        if (search) {
            ctx.page.redirect(`/catalog/cars?search=${encodeURIComponent(search)}`);
        } else {
            ctx.page.redirect('/catalog/cars');
        }
    }
}

async function catalogModel(page, search) {
    const searchFor = document.querySelector('#searchOption')?.value || 'registration';

    const data = await Promise.all([
        getAllCars(page, search, searchFor),
        getCarsCount(search, searchFor)
    ]);

    return [data[0].results, data[1].count];
}

