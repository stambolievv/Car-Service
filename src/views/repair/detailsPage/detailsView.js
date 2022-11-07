import { html } from 'lit';
import { until } from 'lit/directives/until.js';

/**
 * @description It returns a `section` template that will be rendered to the screen.
 * @param {Promise} repairPromise - A promise that will be resolved with the data.
 * @returns {string} A template literal.
 */
export const template = repairPromise => html`<section id="details-page">${until(loadData(repairPromise),  html`<div class="spinner"></div>`)}</section>`;

/**
 * @description It returns a template literal that contains a form.
 * @param {object} repair - The repair object that we want to display.
 * @param {Function} onDelete - A function that will be called when the user clicks the delete button.
 * @returns {string} A template literal.
 */
const repairCard = (repair, onDelete) => html`
  <form>
    <fieldset class="grid">
      <legend>Данни по ремонта</legend>

      <fieldset class="field">
        <legend>Обща информация</legend>
        <label>Създадена на:</label>
        <input disabled .value=${repair.date} />
        <label>Километри:</label>
        <input disabled .value=${repair.km} />
        <label>Получена сума:</label>
        <input disabled .value=${repair.profit} />
      </fieldset>

      <fieldset class="field">
        <legend>Информация за ремонта</legend>
        <label>Забележка:</label>
        <textarea disabled .value=${repair.description}></textarea>
      </fieldset>

      <div class="button">
        <a class="btn-danger" href="javascript:void(0)" @click=${onDelete}>Изтрий</a>
      </div>
      <div class="button">
        <a class="btn-default" href="/edit/repair/${repair.objectId}">Редактирай</a>
        <a class="btn-default" href="/catalog/repairs/${repair.car.objectId}">Назад</a>
      </div>
    </fieldset>
  </form>
`;

async function loadData(repairPromise) {
  const { repair, onDelete } = await repairPromise;
  return repairCard(repair, onDelete);
}