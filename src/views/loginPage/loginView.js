import { html } from '../../lib/lib.js';

export const template = (onSubmit, errors) => html`
    <!--Login-->
    <section id="loginPage">
        <form @submit=${onSubmit}>
            <fieldset>
                <legend>Вход</legend>
    
                <label for="username">Потребителско име:</label>
                <input id="username" class="username" name="username" type="text" placeholder="Въведи потребителско име..."
                    class=${errors.type?.username ? 'error' : ''} .value=${errors.data?.username || ''}>
    
                <label for="password">Парола:</label>
                <input id="password" class="password" name="password" type="password" placeholder="Въведи парола..."
                    class=${errors.type?.password ? 'error' : ''}>
    
                <button type="submit" class="login">Вход</button>
    
                <p class="field">
                    <span>Ако все още нямаш профил цъкни <a href="/user/register">тук</a></span>
                </p>
            </fieldset>
        </form>
    </section>
    `;