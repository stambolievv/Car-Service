import { getMyRepairs } from '../../api/data.js';
import { parseQuery } from '../../common/parseQuery.js';
import { template } from './catalogView.js';

export function catalogPage(ctx) {
    const { page, search } = parseQuery(ctx.querystring);

    ctx.render(template(catalogModel(page, search), onSearch, page, search));

    function onSearch(e) {
        e.preventDefault();

        const search = document.querySelector('#search-input').value.trim();
        if (search) {
            ctx.page.redirect(`/catalog?search=${encodeURIComponent(search)}`);
        } else {
            ctx.page.redirect('/catalog');

        }
    }
}

async function catalogModel(page = 1, search = '') {
    const searchFor = document.querySelector('#searchOption')?.value || 'registration';

    const { results: repairs } = await getMyRepairs(page, search, searchFor);

    return repairs;
}