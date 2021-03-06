import { html } from '../../../lib/lib.js';

export const template = (onSubmit, errors) => html`
    <section id="create-page">
        <form @submit=${onSubmit} autocomplete="off">
            <fieldset class="grid">
                <legend>Добави ремонт</legend>
    
                <fieldset class="field">
                    <label for="km">Километри:</label>
                    <input name="km" type="text" placeholder="250800"
                    class=${errors.type?.km ? 'error' : ''}>
    
                    <label for="date">Датa на ремонта:</label>
                    <input name="date" type="text" placeholder="01.01.2001">
    
                    <label for="description">Забележка:</label>
                    <textarea name="description" placeholder=""></textarea>
    
                    <label for="profit">Платена сума:</label>
                    <input name="profit" type="text" placeholder="лв.">
                </fieldset>
    
                ${controlsTemplate()}
            </fieldset>
        </form>
    </section>
`;

const controlsTemplate = () => html`
    <div class=button>
        <input class="btn-default" type="submit" value="Добави">
        <input class="btn-danger" type="submit" value="Отказ" id="reject">
    </div>
`;