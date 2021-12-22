import { html } from '../../lib/lib.js';

export const template = (onSubmit, errors) => html`
    <section id="auth-page">
        <form @submit=${onSubmit}>
            <fieldset>
                <legend>Вход</legend>
    
                <label for="username">Потребителско име:</label>
                <input name="username" type="text" placeholder="Въведи потребителско име..."
                    class=${errors.type?.username ? 'error' : '' }>
    
                <label for="password">Парола:</label>
                <input name="password" type="password" placeholder="Въведи парола..."
                    class=${errors.type?.password ? 'error' : '' }>
    
                <input class="submit btn btn-default" type="submit" value="Вход">
    
                <div>Ако все още нямаш профил цъкни <a href="/user/register">тук</a></div>
            </fieldset>
        </form>
    </section>
    `;