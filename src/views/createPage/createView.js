import { html } from '../../lib/lib.js';

export const template = (onSubmit, errors) => html`
    <!--Create Page-->
    <section id="createPage">
        <form @submit=${onSubmit}>
            <fieldset>
                <legend>Добави ремонт</legend>
                <fieldset>
                    <legend>Основни данни на автомобила</legend>
                    <label for="vin">VIN:</label>
                    <input id="vin" name="vin" type="text" placeholder="3N1BC13E99L480541"
                        .value=${errors.data?.vin || ''}>
                    <label for="registration">Pегистрационен &numero;:</label>
                    <input id="registration" name="registration" type="text" placeholder="AA1234BB"
                        class=${errors.type?.registration ? 'error' : '' } 
                        .value=${errors.data?.registration || ''}>
                </fieldset>

                <fieldset>
                    <legend>Технически данни</legend>
                    <label for="make">Марка:</label>
                    <input id="make" name="make" type="text" placeholder="Opel" 
                        class=${errors.type?.make? 'error' : '' }
                        .value=${errors.data?.make || ''}>
                    <label for="model">Модел:</label>
                    <input id="model" name="model" type="text" placeholder="Insignia"
                        .value=${errors.data?.model || ''}>
                    <label for="engine">Двигател:</label>
                    <input id="engine" name="engine" type="text" placeholder="2.0"
                        .value=${errors.data?.engine || ''}>
                </fieldset>

                <fieldset>
                    <legend>Описание на ремонта</legend>
                    <label for="description">Забележка:</label>
                    <textarea name="description" class="description" placeholder="" 
                        class=${errors.type?.description ? 'error' : '' }
                        .value=${errors.data?.description || ''}></textarea>
                </fieldset>

                <fieldset>
                    <legend>Данни за клиента</legend>
                    <label for="customerName">Име на клиента:</label>
                    <input id="customerName" name="customerName" type="text" placeholder="Георги Стамболиев" 
                        class=${errors.type?.customerName ? 'error' : '' }
                        .value=${errors.data?.customerName || ''}>
                    <label for="customerPhone">Номер на клиента:</label>
                    <input id="customerPhone" name="customerPhone" type="text" placeholder="0888888888"
                        .value=${errors.data?.customerPhone || ''}>
                </fieldset>

                <button class="add-repair" type="submit">Завърши ремонта</button>
            </fieldset>
        </form>
    </section>
`;