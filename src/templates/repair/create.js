import page from 'page';
import { html } from 'lit';

/**
 * @description Generates the HTML template for the `create a repair` page.
 * @param {string} carId - The function to be called when the form is submitted.
 * @param {(event: SubmitEvent, carId: string) => void} onSubmit - The function to be called when the form is submitted.
 * @returns {import('lit').TemplateResult} The HTML template string.
 */
export default (carId, onSubmit) => html`
  <section id="create-page">
    <form @submit=${(e) => onSubmit(e, carId)} autocomplete="off">
      <fieldset>
        <legend>Добави ремонт</legend>

        <fieldset class="input-fields">
          <div class="field">
            <label for="repair__date">Датa на ремонта: <span class='required'>*</span></label>
            <input name="date" id="repair__date" type="date" value="${new Date().toISOString().slice(0, 10)}" style="cursor: pointer;" required onclick="this.showPicker()" oninvalid="this.setCustomValidity('Полето е задължително!')" oninput="this.setCustomValidity('')" />
          </div>

          <div class="field">
            <label for="repair__km">Километри: <span class='required'>*</span></label>
            <input name="km" id="repair__km" type="number" required oninvalid="this.setCustomValidity('Полето е задължително!')" oninput="this.setCustomValidity('')" />
          </div>

          <div class="field">
            <label for="repair__profit">Платена сума:</label>
            <input name="profit" id="repair__profit" type="text" />
          </div>

          <div class="field">
            <label for="repair__description">Забележка:</label>
            <textarea scrollbar name="description" id="repair__description" onkeyup="if (this.scrollHeight > this.clientHeight) this.style.height = this.scrollHeight + 'px';"></textarea>
          </div>
        </fieldset>

        <div class="buttons">
          <button button-type="success" type="submit">Добави</button>
          <a role="button" button-type="danger" href="/cars/${carId}/repairs" @click=${page.clickHandler}>Отказ</a>
        </div>
      </fieldset>
    </form>
  </section>
`;