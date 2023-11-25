import page from 'page';
import { html } from 'lit';

/**
 * @description Generates the HTML template for the `edit a car` page.
 * @param {Car} car - The object containing details of the car.
 * @param {(event: SubmitEvent, car: Car) => void} onSubmit - The function to be called when the form is submitted.
 * @returns {import('lit').TemplateResult} The HTML template string.
 */
export default (car, onSubmit) => html`
  <section id="edit-page">
    <form @submit=${(e) => onSubmit(e, car)} autocomplete="off">
      <fieldset>
        <legend>Редактирай автомобил</legend>

        <fieldset class="input-fields">
          <div class="field">
            <label for="car__vin">VIN:</label>
            <input name="vin" id="car__vin" type="text" .value=${car.vin} />
          </div>

          <div class="field">
            <label for="car__registration">Pегистрационен &numero;: <span class='required'>*</label>
            <input name="registration" id="car__registration" type="text" .value=${car.registration} required oninvalid="this.setCustomValidity('Полето е задължително!')" oninput="this.setCustomValidity('')" />
          </div>

          <div class="field">
            <label for="car__make">Марка / Модел:</label>
            <input name="make" id="car__make" type="text" .value=${car.make} />
          </div>

          <div class="field">
            <label for="car__engine">Двигател:</label>
            <input name="engine" id="car__engine" type="text" .value=${car.engine} />
          </div>

          <div class="field">
            <label for="car__customer">Име на клиента: <span class='required'>*</label>
            <input name="customerName" id="car__customer" type="text" .value=${car.customerName} required oninvalid="this.setCustomValidity('Полето е задължително!')" oninput="this.setCustomValidity('')" />
          </div>
        </fieldset>

        <div class="buttons">
          <button button-type="info" type="submit">Запази промените</button>
          <a role="button" button-type="danger" href="/cars" @click=${page.clickHandler}>Отказ</a>
        </div>
      </fieldset>
    </form>
  </section>
`;