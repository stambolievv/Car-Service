import { html, nothing, until } from '../../lib/lib.js';
import { formatDate } from '../../common/util.js';
import { spinner } from '../../common/spinner.js';

export const template = (repairsPromise, actions) => html`
    <section id="catalog-page">
        <form>
            <fieldset class="grid">
                <legend>Всичките ремонти</legend>
                ${searchCard(actions.search, actions.onSearch)}
                ${until(loadData(repairsPromise, actions), spinner())}
            </fieldset>
        </form>
    </section>
`;

const repairCard = (repair, id) => html`
    <fieldset class="field">
        <legend>&#35; ${id}</legend>
        <p>Създадена на: ${formatDate(repair.createdAt)}</p>
        <p>Pегистрационен &numero;: ${repair.registration}</p>
        <p>Име на клиента: ${repair.customerName}</p>
        <div class='button'><a class="btn-success" href="/details/${repair.objectId}">Детайли</a></div>
    </fieldset>
`;

const noRepairsCard = () => html`
    <p>Нямаш завършени ремонти!</p>
`;

const searchCard = (search, onSearch) => html`
    <fieldset class="search">
        <select id="searchOption" name="searchOption">
            <option value=registration>Регистрационен &numero;</option>
            <option value=make>Марка</option>
            <option value=model>Модел</option>
            <option value=engine>Двигател</option>
            <option value="customerName">Име на клиента</option>
        </select>
        <input id="search-input" type="text" name="search" placeholder="Въведи..." .value=${search}>
        <button class="btn-info" @click=${onSearch}>Търси</button>
    </fieldset>
`;

const paginationCard = (page, pages, search) => html`
    <fieldset class="pagination">
        <p>Page ${page} of ${pages}</p>
        <div class="pager">
            ${page > 1
                ? html`<a href=${'/catalog?page=' + (page - 1) + (search ? `&search=${search}` : '' )}>&lt; Prev</a>` 
                : nothing}
            ${page < pages
                ? html`<a href=${'/catalog?page=' + (page + 1) + (search ? `&search=${search}` : '' )}>Next &gt;</a>`
                : nothing}
        </div>
    </fieldset>
`;

 async function loadData(repairsPromise, actions) {
    const [repairs, count] = await repairsPromise;
    const pages = Math.ceil(count/9);

    if (repairs.length == 0) { return noRepairsCard(); }

    return [
        repairs.map((r, i) => repairCard(r, i + 1)),
        paginationCard(actions.page, pages, actions.search)
    ];
}