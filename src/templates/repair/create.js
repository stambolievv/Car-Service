import page from 'page';
import { html } from 'lit';
import { getDay } from '../../utilities';

/**
 * @typedef {object} RepairCreatePageProps
 * @property {string} prev - The previous page path.
 * @property {(event: SubmitEvent) => void} onSubmit - The function to be called when the form is submitted.
 */

/**
 * @description Generates the HTML template for the `create a repair` page.
 * @param {RepairCreatePageProps} data - The data containing create information.
 * @returns {import('lit').TemplateResult} The HTML template string.
 */
export default (data) => {
  const { prev, onSubmit } = data;

  return html`
    <section id="create-page">
      <form @submit=${onSubmit} autocomplete="off">
        <fieldset>
          <legend>Добави ремонт</legend>

          <fieldset class="input-fields">
            <div class="field">
              <label for="repair__date">Датa на ремонта: <span class='required'>*</span></label>
              <input name="date" id="repair__date" type="date" .value="${getDay()}" style="cursor: pointer;" required @click="${({ target }) => target.showPicker()}" @invalid="${({ target }) => target.setCustomValidity('Полето е задължително!')}" @input="${({ target }) => target.setCustomValidity('')}" />
            </div>

            <div class="field">
              <label for="repair__km">Километри: <span class='required'>*</span></label>
              <input name="km" id="repair__km" type="number" required @invalid="${({ target }) => target.setCustomValidity('Полето е задължително!')}" @input="${({ target }) => target.setCustomValidity('')}" />
            </div>

            <div class="field">
              <label for="repair__profit">Платена сума:</label>
              <input name="profit" id="repair__profit" type="text" />
            </div>

            <div class="field">
              <label for="repair__description">Забележка:</label>
              <textarea data-scrollbar name="description" id="repair__description" @keyup="${({ target }) => { if (target.scrollHeight > target.clientHeight) target.style.setProperty('height', target.scrollHeight + 'px'); }}"></textarea>
            </div>
          </fieldset>

          <div class="buttons">
            <button data-button-type="success" type="submit">Добави</button>
            <a role="button" data-button-type="danger" href="${page.base() + prev}">Отказ</a>
          </div>
        </fieldset>
      </form>
    </section>
  `;
};