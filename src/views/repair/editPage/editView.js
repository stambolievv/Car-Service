import { html } from 'lit';
import { until } from 'lit/directives/until.js';

/**
 * @description It returns a `section` template that will be rendered to the screen.
 * @param {Promise} repairPromise - A promise that will be resolved with the data.
 * @returns {string} A template literal.
 */
export const template = repairPromise => html`<section id="edit-page">${until(loadData(repairPromise),  html`<div class="spinner"></div>`)}</section>`;

/**
 * @description It returns a template literal that contains a form.
 * @param {object} repair - The repair object that we want to display.
 * @param {Function} onSubmit - The function that will be called when the form is submitted.
 * @param {object} [errors={}] - An object containing the errors for each field.
 * @returns {string} A template literal.
 */
const repairCard = (repair, onSubmit, errors = {}) => html`
  <form @submit=${onSubmit} autocomplete="off">
    <fieldset class="grid">
      <legend>Редактирай ремонт</legend>

      <fieldset class="field">
        <label for="km">Километри*:</label>
        <input name="km" type="text" placeholder="250800" class=${errors.type?.km ? 'error' : ''} .value=${repair.km} />

        <label for="date">Датa на ремонта:</label>
        <input name="date" type="text" placeholder="01.01.2001" .value=${repair.date} />

        <label for="description">Забележка:</label>
        <textarea name="description" placeholder="" .value=${repair.description}></textarea>

        <label for="profit">Платена сума:</label>
        <input name="profit" type="text" placeholder="лв" .value=${repair.profit} />
      </fieldset>

      <div class="button">
        <input class="btn-default" type="submit" value="Запази промените" />
        <input class="btn-danger" type="submit" value="Отказ" id="reject" />
      </div>
    </fieldset>
  </form>
`;

async function loadData(repairPromise) {
  const { repair, onSubmit, errors } = await repairPromise;
  return repairCard(repair, onSubmit, errors);
}