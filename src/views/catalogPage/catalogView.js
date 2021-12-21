import { html, until } from '../../lib/lib.js';
import { spinner } from '../../common/spinner.js';

export const template = (repairsPromise) => html`
    <!--Catalog-->
    <section id="catalogPage">
        <h1>Всичките ремонти</h1>
        ${until(loadData(repairsPromise), spinner())}
    </section>
`;

const repairCard = (repair) => html`
    <div class="card-box">
        <div>
            <img src="/static/images/car.png" width="51.2px" height="51.2px">
            <div class="text-center">
                <p>Pегистрационен &numero;: ${repair.registration}</p>
                <p>Име на клиента: ${repair.customerName}</p>
            </div>
            <div class="btn-group">
                <a href="/details/${repair.objectId}" id="details">Детайли</a>
            </div>
        </div>
    </div>
`;

const noRepairsCard = () => html`
    <!--No repairs in catalog-->
    <p>Нямаш завършени ремонти!</p>
`;

async function loadData(repairsPromise) {
    const data = await repairsPromise;

    if (data.results.length == 0) { return noRepairsCard(); }

    return data.results.map(repairCard);
}