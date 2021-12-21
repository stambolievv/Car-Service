import { html, until, nothing } from '../../lib/lib.js';
import { spinner } from '../../common/spinner.js';

export const template = (repairPromise) => html`
    <!--Details Page-->
    <section id="detailsPage">
        ${until(loadData(repairPromise), spinner())}
    </section>
`;

const repairCard = (repair, actions) => html`
    <div class="wrapper">
        <div class="albumInfo"></div>
        <div class="albumText">
            <h1>VIN: ${repair.vin}</h1>
            <h1>Pегистрационен &numero;: ${repair.registration}</h1>
            <h3>Марка: ${repair.make}</h3>
            <h3>Модел: ${repair.model}</h3>
            <h3>Двигател: ${repair.engine}</h3>
            <h3>Име на клиента: ${repair.customerName}</h3>
            <h3>Номер на клиента: ${repair.customerPhone}</h3>
            <h4>Забележка: ${repair.description}</h4>
        </div>
        ${actions.isOwner ? controlsTemplate(repair.objectId, actions.onDelete) : nothing}
    </div>
    </div>
`;

const controlsTemplate = (repairId, onDelete) => html`
    <!-- Only for registered user and creator of the album-->
    <div class="actionBtn">
        <a href="/edit/${repairId}">Редактирай</a>
        <a @click=${onDelete} href="javascript:void(0)">Изтрий</a>
    </div>
`;

async function loadData(repairPromise) {
    const data = await repairPromise;

    return repairCard(data.repair, data.actions);
}
