import { html } from 'lit';

/**
 * @description It returns a `section` template that will be rendered to the screen.
 * @param {Function} onSubmit - The function that will be called when the form is submitted.
 * @param {object} [errors={}] - An object containing the errors for each field.
 * @returns {string} A template literal.
 */
export const template = (onSubmit, errors = {}) => html`
  <section id="create-page">
    <form @submit=${onSubmit} autocomplete="off">
      <fieldset class="grid">
        <legend>Добави автомобил</legend>
        <fieldset class="field">
          <label for="vin">VIN:</label>
          <input name="vin" type="text" placeholder="3N1BC13E99L480541" />

          <label for="registration">Pегистрационен &numero;:</label>
          <input name="registration" type="text" placeholder="AA1234BB" class=${errors.type?.registration ? 'error' : ''} />

          <label for="make">Марка / Модел:</label>
          <input name="make" type="text" placeholder="Opel Insignia" />

          <label for="engine">Двигател:</label>
          <input name="engine" type="text" placeholder="2.0" />

          <label for="customerName">Име на клиента:</label>
          <input name="customerName" type="text" placeholder="Георги Стамболиев" class=${errors.type?.customerName ? 'error' : ''} />
        </fieldset>

        <div class="button">
          <input class="btn-default" type="submit" value="Добави" />
          <input class="btn-danger" type="submit" value="Отказ" id="reject" />
        </div>
      </fieldset>
    </form>
  </section>
`;