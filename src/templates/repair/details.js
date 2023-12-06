import page from 'page';
import { html } from 'lit';
import { formatDateToLocale } from '../../utilities';

/**
 * @typedef {object} RepairDetailsPageProps
 * @property {Repair} repair - The repair object.
 * @property {string} prev - The previous page path.
 * @property {(event: Event) => void} onDelete - The function to be called when the delete button is clicked.
 */

/**
 * @description Generates the HTML template for the `details for a repair` page.
 * @param {RepairDetailsPageProps} data - The data containing details information.
 * @returns {import('lit').TemplateResult} The HTML template string.
 */
export default (data) => {
  const { repair, prev, onDelete } = data;

  return html`
    <section id="details-page">
      <form autocomplete="off">
        <fieldset>
          <legend>Детайли по ремонта</legend>

          <fieldset class="input-fields">
            <legend>Обща информация</legend>

            <div class="field">
              <label for="repair__date">Датa на ремонта:</label>
              <input disabled name="date" id="repair__date" .value=${formatDateToLocale(repair.date)} />
            </div>

            <div class="field">
              <label for="repair__km">Километри:</label>
              <input disabled name="km" id="repair__km" .value=${repair.km} />
            </div>

            <div class="field">
              <label for="repair__profit">Платена сума:</label>
              <input disabled name="profit" id="repair__profit" .value=${repair.profit} />
            </div>
          </fieldset>

          <fieldset class="input-fields">
            <legend>Информация за ремонта</legend>

            <div class="field">
              <label for="repair__description">Забележка:</label>
              <textarea disabled data-scrollbar name="description" id="repair__description" .value=${repair.description}></textarea>
            </div>
          </fieldset>

          <div class="buttons">
            <a role="button" data-button-type="info" href="${page.base()}/cars/${repair.car.objectId}/repairs/${repair.objectId}/edit">Редактирай</a>
            <a role="button" href="${page.base() + prev}">Назад</a>
            <button data-button-type="danger" @click=${onDelete}>Изтрий</button>
          </div>
        </fieldset>
      </form>
    </section>
  `;
};