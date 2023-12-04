import page from 'page';
import { html } from 'lit';

/**
 * @description Generates the HTML template for the `login` page.
 * @param {(event: SubmitEvent) => void} onSubmit - The function to be called when the form is submitted.
 * @param {(event: Event) => void} togglePasswordVisibility - The function to be called when the password visibility icon is clicked.
 * @returns {import('lit').TemplateResult} The HTML template string.
 */
export default (onSubmit, togglePasswordVisibility) => html`
  <section id="auth-page">
    <form @submit=${onSubmit}>
      <fieldset class="input-fields">
        <legend>Вход</legend>

        <div class="field">
          <label for="user__username">Потребителско име: <span class='required'>*</span></label>
          <input name="username" id="user__username" type="text" placeholder="Въведи потребителско име..." required @invalid="${({ target }) => target.setCustomValidity('Полето е задължително!')}" @input="${({ target }) => target.setCustomValidity('')}" />
        </div>

        <div class="field">
          <label for="user__password">Парола: <span class='required'>*</span></label>
          <div class="password-field">
            <input name="password" id="user__password" type="password" placeholder="Въведи парола..." required @invalid="${({ target }) => target.setCustomValidity('Полето е задължително!')}" @input="${({ target }) => target.setCustomValidity('')}" />
            <i class="material-icons eye-icon" @click=${togglePasswordVisibility}>visibility_off</i>
          </div>
        </div>

        <div class="buttons">
          <input role="button" data-button-type="info" type="submit" value="Вход" />
        </div>

        <div class="form-link">
          <span>Все още нямаш профил? <a href="${page.base()}/user/register">Регистрация</a></span>
        </div>
      </fieldset>
    </form>
  </section>
`;