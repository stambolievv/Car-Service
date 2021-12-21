import { html } from '../../lib/lib.js';

export const template = (onSubmit, errors) => html`
    <!--Registration-->
    <section id="registerPage">
        <form @submit=${onSubmit}>
            <fieldset>
                <legend>Регистрация</legend>
    
                <label for="username" class="vhide">Потребителско име:</label>
                <input id="username" class="username" name="username" type="text" placeholder="Въведи потребителско име..."
                    class=${errors.type?.username ? 'error' : ''} .value=${errors.data?.username || ''}>
    
                <label for="password" class="vhide">Парола:</label>
                <input id="password" class="password" name="password" type="password" placeholder="Въведи парола..."
                    class=${errors.type?.password ? 'error' : ''}>
    
                <label for="repass" class="vhide">Повтори паролата:</label>
                <input id="repass" class="repass" name="repass" type="password" placeholder="Повтори паролата..."
                    class=${errors.type?.repass ? 'error' : ''}>
    
                <button type="submit" class="register">Регистрация</button>
    
                <p class="field">
                    <span>Ако вече имаш създаден профил цъкни <a href="/user/login">тук</a></span>
                </p>
            </fieldset>
        </form>
    </section>
`;