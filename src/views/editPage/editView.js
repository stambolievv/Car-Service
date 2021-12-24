import { html, until } from '../../lib/lib.js';
import { spinner } from '../../common/spinner.js';

export const template = (repairPromise) => html`
    <section id="edit-page">
        ${until(loadData(repairPromise), spinner())}
    </section>
`;

const repairCard = (repair, onSubmit, errors) => html`
    <form @submit=${onSubmit}>
        <fieldset class="grid">
            <legend>Редактирай ремонт</legend>
    
            <fieldset class="field">
                <legend>Основни данни на автомобила</legend>
    
                <label for="vin">VIN:</label>
                <input name="vin" type="text" placeholder="3N1BC13E99L480541"
                    .value=${repair.vin}>
    
                <label for="registration">Pегистрационен &numero;:</label>
                <input name="registration" type="text" placeholder="AA1234BB"
                    class=${errors.type?.registration ? 'error' : '' }
                    .value=${repair.registration}>
    
                <label for="km">Километри:</label>
                <input name="km" type="text" placeholder="250800"
                    class=${errors.type?.km ? 'error' : '' }
                    .value=${repair.km}>
            </fieldset>
    
            <fieldset class="field">
                <legend>Технически данни</legend>
    
                <label for="make">Марка:</label>
                <input name="make" type="text" placeholder="Opel"
                    .value=${repair.make}>
    
                <label for="model">Модел:</label>
                <input name="model" type="text" placeholder="Insignia"
                    .value=${repair.model}>
    
                <label for="engine">Двигател:</label>
                <input name="engine" type="text" placeholder="2.0"
                    .value=${repair.engine}>
            </fieldset>
    
            <fieldset class="field">
                <legend>Описание на ремонта</legend>
    
                <label for="description">Забележка:</label>
                <textarea name="description" rows="10" cols="10" placeholder=""
                    .value=${repair.description}></textarea>
    
                <label for="profit">Платена сума:</label>
                <input name="profit" type="text" placeholder="лв"
                    .value=${repair.profit}>
            </fieldset>
    
            <fieldset class="field">
                <legend>Данни за клиента</legend>
    
                <label for="customerName">Име на клиента:</label>
                <input name="customerName" type="text" placeholder="Георги Стамболиев"
                    class=${errors.type?.customerName ? 'error' : '' }
                    .value=${repair.customerName}>
    
                <label for="customerPhone">Номер на клиента:</label>
                <input name="customerPhone" type="text" placeholder="0888888888" .value=${repair.customerPhone}>
            </fieldset>
    
            <div class="button"><input class="btn-default" type="submit" value="Запази промените"></div>
            <div class="button"><input class="btn-danger" type="submit" value="Отказ" id="reject"></div>
        </fieldset>
    </form>
`;

async function loadData(repairPromise) {
    const data = await repairPromise;

    return repairCard(data.repair, data.onSubmit, data.errors);
}