import { html, until, nothing } from '../../../lib/lib.js';
import { spinner } from '../../../util/spinner.js';

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
                <legend>Обща информация</legend>
                <label>Създадена на:</label>
                <input disabled .value=${repair.date}>
                <label>Километри:</label>
                <input disabled .value=${repair.km}>
                <label>Получена сума:</label>
                <input disabled .value=${repair.profit}>
            </fieldset>

            <fieldset class="field">
                <legend>Информация за ремонта</legend>
                <label>Забележка:</label>
                <textarea disabled .value=${repair.description}></textarea>
            </fieldset>

            ${actions.isOwner ? controlsTemplate(repair, actions.onDelete) : nothing}
        </fieldset>
    </form>
`;

const controlsTemplate = (repair, onDelete) => html`
    <div class="button"><a class="btn-danger" href="javascript:void(0)" @click=${onDelete}>Изтрий</a></div>
    <div class="button">
        <a class="btn-default" href="/edit/repair/${repair.objectId}">Редактирай</a>
        <a class="btn-default" href="/catalog/repairs/${repair.car.objectId}">Назад</a>
    </div>
`;

async function loadData(repairPromise) {
    const data = await repairPromise;

    return repairCard(data.repair, data.actions);
}