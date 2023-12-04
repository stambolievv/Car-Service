import page from 'page';
import { html } from 'lit';

/**
 * @description Generates the HTML template for the `create a car` page.
 * @param {(event: SubmitEvent) => void} onSubmit - The function to be called when the form is submitted.
 * @returns {import('lit').TemplateResult} The HTML template string.
 */
export default (onSubmit) => html`
  <section id="create-page">
    <form @submit=${onSubmit} autocomplete="off">
      <fieldset>
        <legend>Добави автомобил</legend>

        <fieldset class="input-fields">
          <div class="field">
            <label for="car__vin">VIN:</label>
            <input name="vin" id="car__vin" type="text" />
          </div>

          <div class="field">
            <label for="car__registration">Pегистрационен &numero;: <span class='required'>*</span></label>
            <input name="registration" id="car__registration" type="text" required @invalid="${({ target }) => target.setCustomValidity('Полето е задължително!')}" @input="${({ target }) => target.setCustomValidity('')}" />
          </div>

          <div class="field">
            <label for="car__make">Марка / Модел:</label>
            <input name="make" id="car__make" type="text" />
          </div>

          <div class="field">
            <label for="car__engine">Двигател:</label>
            <input name="engine" id="car__engine" type="text" />
          </div>

          <div class="field">
            <label for="car__customer">Име на клиента: <span class='required'>*</span></label>
            <input name="customerName" id="car__customer" type="text" required @invalid="${({ target }) => target.setCustomValidity('Полето е задължително!')}" @input="${({ target }) => target.setCustomValidity('')}" />
          </div>
        </fieldset>

        <div class="buttons">
          <button data-button-type="success" type="submit">Добави</button>
          <a role="button" data-button-type="danger" href="${page.base()}/cars">Отказ</a>
        </div>
      </fieldset>
    </form>
  </section>
`;