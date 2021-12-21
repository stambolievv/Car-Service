import { html, until } from '../../lib/lib.js';
import { spinner } from '../../common/spinner.js';

export const template = (repairPromise) => html`
    <!--Edit Page-->
    <section id="editPage">
        ${until(loadData(repairPromise), spinner())}
    </section>
`;

const teamCard = (repair, onSubmit) => html`
    <form @submit=${onSubmit}>
        <fieldset>
            <legend>Добави ремонт</legend>
            <fieldset>
                <legend>Основни данни на автомобила</legend>
                <label for="vin">VIN:</label>
                <input id="vin" name="vin" type="text" .value=${repair.vin}>
                <label for="registration">Pегистрационен &numero;:</label>
                <input id="registration" name="registration" type="text" .value=${repair.registration}>
            </fieldset>
    
            <fieldset>
                <legend>Технически данни</legend>
                <label for="make">Марка:</label>
                <input id="make" name="make" type="text" .value=${repair.make}>
                <label for="model">Модел:</label>
                <input id="model" name="model" type="text" .value=${repair.model}>
                <label for="engine">Двигател:</label>
                <input id="engine" name="engine" type="text" .value=${repair.engine}>
            </fieldset>
    
            <fieldset>
                <legend>Описание на ремонта</legend>
                <label for="description">Забележка:</label>
                <textarea name="description" rows="10" cols="10" .value=${repair.description}></textarea>
            </fieldset>
    
            <fieldset>
                <legend>Данни за клиента</legend>
                <label for="customerName">Име на клиента:</label>
                <input id="customerName" name="customerName" type="text" .value=${repair.customerName}>
                <label for="customerPhone">Номер на клиента:</label>
                <input id="customerPhone" name="customerPhone" type="text" .value=${repair.customerPhone}>
            </fieldset>
    
            <button class="edit-repair" type="submit">Редактирай</button>
        </fieldset>
    </form>
`;

async function loadData(repairPromise) {
    const data = await repairPromise;

    return teamCard(data.repair, data.onSubmit);
}