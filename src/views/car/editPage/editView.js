import { html } from 'lit';
import { until } from 'lit/directives/until.js';

/**
 * @description It returns a `section` template that will be rendered to the screen.
 * @param {Promise} carPromise - A promise that will be resolved with the data.
 * @returns {string} A template literal.
 */
export const template = carPromise => html`<section id="edit-page">${until(loadData(carPromise),  html`<div class="spinner"></div>`)}</section>`;

const carCard = (car, errors, actions) => html`
  <form @submit=${actions.onSubmit} autocomplete="off">
    <fieldset class="grid">
      <legend>Редактирай автомобил</legend>

      <fieldset class="field">
        <label for="vin">VIN:</label>
        <input name="vin" type="text" placeholder="3N1BC13E99L480541" .value=${car.vin} />

        <label for="registration">Pегистрационен &numero;:</label>
        <input name="registration" type="text" placeholder="AA1234BB" class=${errors.type?.registration ? 'error' : ''}
          .value=${car.registration} />

        <label for="make">Марка / Модел:</label>
        <input name="make" type="text" placeholder="Opel Insignia" .value=${car.make} />

        <label for="engine">Двигател:</label>
        <input name="engine" type="text" placeholder="2.0" .value=${car.engine} />

        <label for="customerName">Име на клиента:</label>
        <input name="customerName" type="text" placeholder="Георги Стамболиев" class=${errors.type?.customerName ? 'error' : ''} .value=${car.customerName} />
      </fieldset>

      <div class="button">
        <input class="btn-danger" @click=${actions.onDelete} type="button" value="Изтрий" />
        <input class="btn-default" type="submit" value="Запази промените" />
        <input class="btn-danger" type="submit" value="Отказ" id="reject" />
      </div>
    </fieldset>
  </form>
`;

async function loadData(carPromise) {
  const { car, errors, actions } = await carPromise;
  return carCard(car, errors, actions);
}