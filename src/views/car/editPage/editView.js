import { html, until } from '../../../lib/lib.js';
import { spinner } from '../../../common/spinner.js';

export const template = (carPromise) => html`
    <section id="edit-page">
        ${until(loadData(carPromise), spinner())}
    </section>
`;

const carCard = (car, onSubmit, errors) => html`
    <form @submit=${onSubmit}>
        <fieldset class="grid">
            <legend>Редактирай автомобил</legend>
    
            <fieldset>
                <label for="vin">VIN:</label>
                <input name="vin" type="text" placeholder="3N1BC13E99L480541"
                    .value=${car.vin}>
    
                <label for="registration">Pегистрационен &numero;:</label>
                <input name="registration" type="text" placeholder="AA1234BB"
                    class=${errors.type?.registration ? 'error' : '' }
                    .value=${car.registration}>
    
                <label for="make">Марка / Модел:</label>
                <input name="make" type="text" placeholder="Opel Insignia"
                    .value=${car.make}>
    
                <label for="engine">Двигател:</label>
                <input name="engine" type="text" placeholder="2.0"
                    .value=${car.engine}>
    
                <label for="customerName">Име на клиента:</label>
                <input name="customerName" type="text" placeholder="Георги Стамболиев"
                    class=${errors.type?.customerName ? 'error' : '' }
                    .value=${car.customerName}>

            </fieldset>
    
            <div>
                <input class="btn-default" type="submit" value="Запази промените">
                <input class="btn-danger" type="submit" value="Отказ" id="reject">
            </div>
        </fieldset>
    </form>
`;

async function loadData(carPromise) {
    const data = await carPromise;

    return carCard(data.car, data.onSubmit, data.errors);
}