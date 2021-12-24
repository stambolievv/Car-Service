import { html } from '../../lib/lib.js';

export const template = (onSubmit, errors) => html`
    <section id="create-page">
        <form @submit=${onSubmit}>
            <fieldset class="grid">
                <legend>Добави ремонт</legend>
    
                <fieldset class="field">
                    <legend>Основни данни на автомобила</legend>
    
                    <label for="vin">VIN:</label>
                    <input name="vin" type="text" placeholder="3N1BC13E99L480541">
    
                    <label for="registration">Pегистрационен &numero;:</label>
                    <input name="registration" type="text" placeholder="AA1234BB"
                        class=${errors.type?.registration ? 'error' : ''}>
    
                    <label for="km">Километри:</label>
                    <input name="km" type="text" placeholder="250800"
                        class=${errors.type?.km ? 'error' : ''}>
                </fieldset>
    
                <fieldset class="field">
                    <legend>Технически данни</legend>
    
                    <label for="make">Марка:</label>
                    <input name="make" type="text" placeholder="Opel">
    
                    <label for="model">Модел:</label>
                    <input name="model" type="text" placeholder="Insignia">
    
                    <label for="engine">Двигател:</label>
                    <input name="engine" type="text" placeholder="2.0">
                </fieldset>
    
                <fieldset class="field">
                    <legend>Описание на ремонта</legend>
    
                    <label for="description">Забележка:</label>
                    <textarea name="description" class="description" placeholder=""></textarea>
    
                    <label for="profit">Платена сума:</label>
                    <input name="profit" type="text" placeholder="лв.">
                </fieldset>
    
                <fieldset class="field">
                    <legend>Данни за клиента</legend>
    
                    <label for="customerName">Име на клиента:</label>
                    <input name="customerName" type="text" placeholder="Георги Стамболиев"
                        class=${errors.type?.customerName ? 'error' : ''}>
    
                    <label for="customerPhone">Номер на клиента:</label>
                    <input name="customerPhone" type="text" placeholder="0888888888">
                </fieldset>
    
                <div><input class="btn-default" type="submit" value="Завърши ремонта"></div>
                <div><input class="btn-danger" type="submit" value="Отказ" id="reject"></div>
            </fieldset>
        </form>
    </section>
`;