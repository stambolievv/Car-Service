import { html, until } from '../../../lib/lib.js';
import { spinner } from '../../../common/spinner.js';

export const template = (repairPromise) => html`
    <section id="edit-page">
        ${until(loadData(repairPromise), spinner())}
    </section>
`;

const repairCard = (repair, onSubmit, errors) => html`
    <form @submit=${onSubmit}>
        <fieldset class="grid">
            <legend>Редактирай ремонт</legend>   
    
            <fieldset class="field">
                <label for="km">Километри:</label>
                <input name="km" type="text" placeholder="250800"
                    class=${errors.type?.km ? 'error' : ''}
                    .value=${repair.km}>
    
                <label for="date">Датa на ремонта:</label>
                <input name="date" type="text" placeholder="01.01.2001"
                    .value=${repair.date}>

                <label for="description">Забележка:</label>
                <textarea name="description" placeholder=""
                    .value=${repair.description}></textarea>
    
                <label for="profit">Платена сума:</label>
                <input name="profit" type="text" placeholder="лв"
                    .value=${repair.profit}>
            </fieldset>

            ${controlsTemplate()}
        </fieldset>
    </form>
`;

const controlsTemplate = () => html`
    <div class="button"> 
        <input class="btn-default" type="submit" value="Запази промените">
        <input class="btn-danger" type="submit" value="Отказ" id="reject">
    </div>
`;

async function loadData(repairPromise) {
    const data = await repairPromise;

    return repairCard(data.repair, data.onSubmit, data.errors);
}