import { html, until, nothing } from '../../lib/lib.js';
import { formatDate } from '../../common/util.js';
import { spinner } from '../../common/spinner.js';

export const template = (repairPromise) => html`
    <section id="details-page">
        ${until(loadData(repairPromise), spinner())}
    </section>
`;

const repairCard = (repair, actions) => html`
    <form>
        <fieldset class="grid">
            <legend>Данни по ремонта</legend>
            <fieldset class="field">
                <legend>Информация за клиента</legend>
                <label>Създадена на:</label>
                <input disabled .value=${formatDate(repair.createdAt)}>
                <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
                <label>Име на клиента:</label>
                <input disabled .value=${repair.customerName}>
                <label>Номер на клиента:</label>
                <input disabled .value=${repair.customerPhone}>
            </fieldset>
            <fieldset class="field">
                <legend>Информация за автомобила</legend>
                <label>VIN:</label>
                <input disabled .value=${repair.vin}>
                <label>Pегистрационен &numero;:</label>
                <input disabled .value=${repair.registration}>
                <label>Марка:</label>
                <input disabled .value=${repair.make}>
                <label>Модел:</label>
                <input disabled .value=${repair.model}>
                <label>Двигател:</label>
                <input disabled .value=${repair.engine}>
                <label>Километри:</label>
                <input disabled .value=${repair.km}>
                <label>Забележка:</label>
                <textarea disabled .value=${repair.description}></textarea>
                <label>Получена сума:</label>
                <input disabled .value=${repair.profit}>
            </fieldset>
            ${actions.isOwner ? controlsTemplate(repair.objectId, actions.onDelete) : nothing}
        </fieldset>
    </form>
`;

const controlsTemplate = (repairId, onDelete) => html`
    <div><a class="btn-danger" href="javascript:void(0)" @click=${onDelete}>Изтрий</a></div>
    <div>
        <a class="btn btn-default" href="/edit/${repairId}">Редактирай</a>
        <a class="btn btn-default" href="/catalog">Назад</a>
    </div>
`;

async function loadData(repairPromise) {
    const data = await repairPromise;

    return repairCard(data.repair, data.actions);
}