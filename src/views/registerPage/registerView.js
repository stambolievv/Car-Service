import { html } from '../../lib/lib.js';

export const template = (onSubmit, errors) => html`
    <section id="auth-page">
        <form @submit=${onSubmit}>
            <fieldset>
                <legend>Регистрация</legend>
    
                <label for="username">Потребителско име:</label>
                <input name="username" type="text" placeholder="Въведи потребителско име..."
                    class=${errors.type?.username ? 'error' : '' }>
    
                <label for="password">Парола:</label>
                <input name="password" type="password" placeholder="Въведи парола..."
                    class=${errors.type?.password ? 'error' : '' }>
    
                <label for="repass">Повтори паролата:</label>
                <input name="repass" type="password" placeholder="Повтори паролата..."
                    class=${errors.type?.repass ? 'error' : '' }>
    
                <div class="button"><input class="btn-default" type="submit" value="Регистрация"></div>
    
                <div>Ако вече имаш създаден профил цъкни <a href="/user/login">тук</a></div>
            </fieldset>
        </form>
    </section>
`;