import page from 'page';
import { login } from '@db';
import { login as template } from '@templates';
import { formDataHandler, notice } from '@utilities';

/**
 * @description Renders the `login` page and handles form submission for logging the user.
 * @param {Context} ctx - The context object.
 */
export function loginPage(ctx) {
  ctx.render(template(onSubmit, togglePasswordVisibility));
}

/**
 * @description Handles form submission for logging the user.
 * @param {SubmitEvent} event - The form submission event.
 */
async function onSubmit(event) {
  event.preventDefault();

  const form = /**@type {HTMLFormElement}*/(event.target);
  const [data, setDisabled] = /**@type {[UserLoginCredentials, (disable: boolean) => void]}*/(formDataHandler(form));

  try {
    setDisabled(true);
    notice.showLoading({ type: 'cube-zoom' });
    await login(data);
    page.redirect('/cars');
  } catch (error) {
    const errorMessages = error instanceof Error ? error.message : 'Възникна грешка, моля опитайте по-късно';
    notice.showToast({ text: errorMessages, type: 'error' });
  } finally {
    setDisabled(false);
    notice.hideLoading();
    form.reset();
  }
}

/**
 * @description Toggles the visibility of the password input field.
 * @param {Event} event - The event object.
 */
function togglePasswordVisibility(event) {
  event.preventDefault();

  const icon = /**@type {HTMLElement}*/(event.target);
  const passwordInput = /**@type {HTMLInputElement}*/(icon.previousElementSibling);
  const type = passwordInput.type === 'password' ? 'text' : 'password';

  passwordInput.setAttribute('type', type);
  icon.textContent = type === 'password' ? 'visibility_off' : 'visibility';
}