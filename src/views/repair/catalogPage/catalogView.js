import { html, nothing, until } from '../../../lib/lib.js';
import { spinner } from '../../../common/spinner.js';

export const template = (repairsPromise, page) => html`
    <section id="catalog-page">
        <form autocomplete="off">
            <fieldset class="grid">
                ${until(loadData(repairsPromise, page), spinner())}
            </fieldset>
        </form>
    </section>
`;

const legendCard = (car) => html`
<legend>Всичките ремонти на ${car.customerName} - "${car.registration}"</legend>
`;

const controlsTemplate = (car) => html`
    <fieldset class="search">
        <div><a class="btn-default" href="/edit/car/${car.objectId}">Редактирай автомобил</a></div>
        <div><a class="btn-default" href="/create/repair/${car.objectId}">Добави ремонт</a></div>
        <div><a class="btn-danger" href="/catalog/cars">Назад</a></div>
    </fieldset>
`;

const repairsTable = (repairs) => html`
    <table class="table">
        <thead>
            <tr>
                <th>&#35;</th>
                <th>Извършен на</th>
                <th>Километри</th>
                <th>Детайли по ремонта</th>
            </tr>
        </thead>
        <tbody>
            ${repairs.map((r, i) => repairCard(r, i + 1))}
        </tbody>
    </table>
`;

const repairCard = (repair, id) => html`
    <tr>
        <td>${id}</td>
        <td>${repair.date}</td>
        <td>${repair.km}</td>
        <td><a class="btn-success" href="/details/repair/${repair.objectId}">Детайли</a></td>
    </tr>
`;

const noRepairsCard = () => html`
    <p class="empty">Нямаш завършени ремонти!</p>
`;

const paginationCard = (page, pages) => html`
    <fieldset class="pagination">
        <p>Page ${page} of ${pages}</p>
        <div class="pager">
            ${page > 1
                ? html`<a href=${'/catalog/repairs?page=' + (page - 1)}>&lt; Prev</a>` 
                : nothing}
            ${page < pages
                ? html`<a href=${'/catalog/repairs?page=' + (page + 1)}>Next &gt;</a>`
                : nothing}
        </div>
    </fieldset>
`;

async function loadData(repairsPromise, page) {
    const [repairs, count, car] = await repairsPromise;
    const pages = Math.ceil(count / 10) || 1;

    const cards = [
        legendCard(car),
        controlsTemplate(car),
        paginationCard(page, pages)
    ];

    if (repairs.length != 0) {
        cards.push(repairsTable(repairs));
    } else {
        cards.push(noRepairsCard());
    }

    return cards;
}