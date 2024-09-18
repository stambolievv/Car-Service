import page from 'page';
import { register } from '@db';
import { register as template } from '@templates';
import { formDataHandler, notice } from '@utilities';

/**
 * @description Renders the `register` page and handles form submission for registering the user.
 * @param {Context} ctx - The context object.
 */
export function registerPage(ctx) {
  ctx.render(template(onSubmit, togglePasswordVisibility));
}

/**
 * @description Handles form submission for registering the user.
 * @param {SubmitEvent} event - The form submission event.
 */
async function onSubmit(event) {
  event.preventDefault();

  const form = /**@type {HTMLFormElement}*/(event.target);
  const [{ username, password, repass }, setDisabled] = /**@type {[UserRegisterCredentials, (disable: boolean) => void]}*/(formDataHandler(form));

  if (password !== repass) {
    notice.showToast({ text: 'Паролите не съвпадат!', type: 'warning' });
    return;
  }

  try {
    setDisabled(true);
    notice.showLoading({ type: 'cube-zoom' });
    await register({ username, password });
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
  const repassInput = /**@type {HTMLInputElement}*/(icon.parentElement?.parentElement?.nextElementSibling?.lastElementChild);
  const type = passwordInput.type === 'password' ? 'text' : 'password';

  passwordInput.setAttribute('type', type);
  repassInput.setAttribute('type', type);
  icon.textContent = type === 'password' ? 'visibility_off' : 'visibility';
}