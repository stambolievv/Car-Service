import page from 'page';
import { html } from 'lit';

/**
 * @description Generates the HTML template for the `edit a repair` page.
 * @param {Repair} repair - The object containing details of the repair.
 * @param {(event: SubmitEvent, repair: Repair) => void} onSubmit - The function to be called when the form is submitted.
 * @returns {import('lit').TemplateResult} The HTML template string.
 */
export default (repair, onSubmit) => html`
  <section id="edit-page">
    <form @submit=${(e) => onSubmit(e, repair)} autocomplete="off">
      <fieldset>
        <legend>Редактирай ремонт</legend>

        <fieldset class="input-fields">
          <div class="field">
            <label for="repair__date">Датa на ремонта: <span class='required'>*</label>
            <input name="date" id="repair__date" type="date" .value=${repair.date} style="cursor: pointer;" required onclick="this.showPicker()" oninvalid="this.setCustomValidity('Полето е задължително!')" oninput="this.setCustomValidity('')" />
          </div>

          <div class="field">
            <label for="repair__km">Километри: <span class='required'>*</label>
            <input name="km" id="repair__km" type="number" .value=${repair.km} required oninvalid="this.setCustomValidity('Полето е задължително!')" oninput="this.setCustomValidity('')" />
          </div>

          <div class="field">
            <label for="repair__profit">Платена сума:</label>
            <input name="profit" id="repair__profit" type="text" .value=${repair.profit} />
          </div>

          <div class="field">
            <label for="repair__description">Забележка:</label>
            <textarea scrollbar name="description" id="repair__description" .value=${repair.description} onkeyup="if (this.scrollHeight > this.clientHeight) this.style.height = this.scrollHeight + 'px';"></textarea>
          </div>
        </fieldset>

        <div class="buttons">
          <button button-type="success" type="submit">Запази промените</button>
          <a role="button" button-type="danger" href="/cars/${repair.car.objectId}/repairs/${repair.objectId}" @click=${page.clickHandler}>Отказ</a>
        </div>
      </fieldset>
    </form>
  </section>
`;