import { html, nothing, until } from '../../../lib/lib.js';
import { spinner } from '../../../common/spinner.js';

export const template = (carsPromise, actions) => html`
    <section id="catalog-page">
        <form>
            <fieldset class="grid">
                <legend>Всички автомобили</legend>
                ${searchCard(actions.search, actions.onSearch)}
                ${until(loadData(carsPromise, actions), spinner())}
            </fieldset>
        </form>
    </section>
`;

const carsTable = (cars)=>html`
    <table class="table">
        <thead>
            <tr>
                <th>&#35;</th>
                <th>Рама:</th>
                <th>Pегистрационен &numero;</th>
                <th>Марка / Модел</th>
                <th>Двигател</th>
                <th>Име на клиента</th>
                <th>Ремонти по автомобила</th>
            </tr>
        </thead>
        <tbody>
            ${cars.map((r, i) => carTemplate(r, i + 1))}
        </tbody>
    </table>
`;

const carTemplate = (car, id) => html`
    <tr>
        <td>${id}</td>
        <td>${car.vin}</td>
        <td>${car.registration}</td>
        <td>${car.make}</td>
        <td>${car.engine}</td>
        <td>${car.customerName}</td>
        <td><a class="btn-success" href="/catalog/repairs/${car.objectId}">Виж</a></td>
    </tr>
`;

const noCarsCard = () => html`
    <p class="empty">Нямаш добавени автомобили!</p>
`;

const searchCard = (search, onSearch) => html`
    <fieldset class="search">
        <select id="searchOption" name="searchOption">
            <option value=registration>Регистрационен &numero;</option>
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
                ? html`<a href=${'/catalog/cars?page=' + (page - 1) + (search ? `&search=${search}` : '' )}>&lt; Prev</a>` 
                : nothing}
            ${page < pages
                ? html`<a href=${'/catalog/cars?page=' + (page + 1) + (search ? `&search=${search}` : '' )}>Next &gt;</a>`
                : nothing}
        </div>
    </fieldset>
`;

 async function loadData(carsPromise, actions) {
    const [cars, count] = await carsPromise;
    const pages = Math.ceil(count / 15);

    if (cars.length == 0) { return noCarsCard(); }

    return [
        carsTable(cars),
        paginationCard(actions.page, pages, actions.search)
    ];
}