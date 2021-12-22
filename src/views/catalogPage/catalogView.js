import { html, until } from '../../lib/lib.js';
import { spinner } from '../../common/spinner.js';

export const template = (repairsPromise, onSearch, page = 1, query = '') => html`
    <section id="catalogPage">
        <h1>Всичките ремонти</h1>
        ${searchCard(onSearch, query)}
        ${until(loadData(repairsPromise), spinner())}
    </section>
`;

const repairCard = (repair) => html`
    <div>
        <div>
            <p>Pегистрационен &numero;: ${repair.registration}</p>
            <p>Име на клиента: ${repair.customerName}</p>
        </div>
        <div>
            <a href="/details/${repair.objectId}">Детайли</a>
        </div>
    </div>
`;

const noRepairsCard = () => html`
    <p>Нямаш завършени ремонти!</p>
`;

const searchCard = (onSearch, query) => html`
<div>
    <select id="searchOption" name="searchOption">
        <option value=registration>Pегистрационен &numero;</option>
        <option value=make>Марка</option>
        <option value=model>Модел</option>
        <option value=engine>Двигател</option>
        <option value="customerName">Име на клиента</option>
    </select>
    <input id="search-input" type="text" name="search" placeholder="Въведи..." .value=${query}>
    <div><button @click=${onSearch}>Търси</button></div>
</div>
`;

async function loadData(repairsPromise) {
    const repairs = await repairsPromise;

    if (repairs.length == 0) { return noRepairsCard(); }

    return repairs.map(repairCard);
}