import { html } from '../../../lib/lib.js';

export const template = (onSubmit, errors) => html`
    <section id="create-page">
        <form @submit=${onSubmit} autocomplete="off">
            <fieldset class="grid">
                <legend>Добави автомобил</legend>
                <fieldset class="field">
                    <label for="vin">VIN:</label>
                    <input name="vin" type="text" placeholder="3N1BC13E99L480541">
    
                    <label for="registration">Pегистрационен &numero;:</label>
                    <input name="registration" type="text" placeholder="AA1234BB"
                        class=${errors.type?.registration ? 'error' : '' }>
    
                    <label for="make">Марка / Модел:</label>
                    <input name="make" type="text" placeholder="Opel Insignia">
    
                    <label for="engine">Двигател:</label>
                    <input name="engine" type="text" placeholder="2.0">
    
                    <label for="customerName">Име на клиента:</label>
                    <input name="customerName" type="text" placeholder="Георги Стамболиев"
                        class=${errors.type?.customerName ? 'error' : '' }>
                </fieldset>

                ${controlsTemplate()}
            </fieldset>
        </form>
    </section>
`;

const controlsTemplate = () => html`
    <div class="button">
        <input class="btn-default" type="submit" value="Добави">
        <input class="btn-danger" type="button" value="Отказ" id="reject">
    </div>
`;