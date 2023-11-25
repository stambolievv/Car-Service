import { html } from 'lit';
import page from 'page';

/**
 * @description Generates the HTML template for the `details for a repair` page.
 * @param {Repair} repair - The object containing details of the repair.
 * @param {(event: Event, repair: Repair) => void} onDelete - The function to be called when the delete button is clicked.
 * @returns {import('lit').TemplateResult} The HTML template string.
 */
export default (repair, onDelete) => html`
  <section id="details-page">
    <form autocomplete="off">
      <fieldset>
        <legend>Детайли по ремонта</legend>

        <fieldset class="input-fields">
          <legend>Обща информация</legend>

          <div class="field">
            <label for="repair__date">Датa на ремонта:</label>
            <input disabled name="date" id="repair__date" .value=${repair.date} />
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
            <textarea disabled scrollbar name="description" id="repair__description" .value=${repair.description}></textarea>
          </div>
        </fieldset>

        <div class="buttons">
          <a role="button" button-type="info" href="/cars/${repair.car.objectId}/repairs/${repair.objectId}/edit" @click=${page.clickHandler}>Редактирай</a>
          <a role="button" href="/cars/${repair.car.objectId}/repairs" @click=${page.clickHandler}>Назад</a>
          <button button-type="danger" @click=${(e) => onDelete(e, repair)}>Изтрий</button>
        </div>
      </fieldset>
    </form>
  </section>
`;