import page from 'page';
import { html } from 'lit';

/**
 * @description Generates the HTML template for the `register` page.
 * @param {(event: SubmitEvent) => void} onSubmit - The function to be called when the form is submitted.
 * @param {(event: Event) => void} togglePasswordVisibility - The function to be called when the password visibility icon is clicked.
 * @returns {import('lit').TemplateResult} The HTML template string.
 */
export default (onSubmit, togglePasswordVisibility) => html`
  <section id="auth-page">
    <form @submit=${onSubmit}>
      <fieldset class="input-fields">
        <legend>Регистрация</legend>

        <div class="field">
          <label for="user__username">Потребителско име: <span class='required'>*</span></label>
          <input name="username" id="user__username" type="text" placeholder="Въведи потребителско име..." required oninvalid="this.setCustomValidity('Полето е задължително!')" oninput="this.setCustomValidity('')" />
        </div>

        <div class="field">
          <label for="user__password">Парола: <span class='required'>*</span></label>
          <div class="password-field">
            <input name="password" id="user__password" type="password" placeholder="Въведи парола..." required oninvalid="this.setCustomValidity('Полето е задължително!')" oninput="this.setCustomValidity('')" />
            <i class="material-icons eye-icon" @click=${togglePasswordVisibility}>visibility_off</i>
          </div>
        </div>

        <div class="field">
          <label for="user__repass">Потвърди паролата: <span class='required'>*</span></label>
          <input name="repass" id="user__repass" type="password" placeholder="Повтори паролата..." required oninvalid="this.setCustomValidity('Полето е задължително!')" oninput="this.setCustomValidity('')" />
        </div>

        <div class="buttons">
          <input role="button" button-type="info" type="submit" value="Регистрация" />
        </div>

        <div class="form-link">
          <span>Вече имаш създаден профил? <a href="/user/login" @click=${page.clickHandler}>Вход</a></span>
        </div>
      </fieldset>
    </form>
  </section>
`;