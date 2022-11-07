import { login } from '../../../api/userService';
import { template } from './loginView';
import { formDataHandler } from '../../../utils/util';

export function loginPage(ctx) {
  const update = (errors = {}) => ctx.render(template(onSubmit, errors));
  update();

  async function onSubmit(event) {
    event.preventDefault();

    try {
      const { username, password } = formDataHandler(event.target, 'username', 'password');
      await login({ username, password });

      ctx.updateNavigation();
      ctx.page.redirect('/catalog/cars');
    } catch (err) {
      const errors = {
        message: err.message || err.errorMsg,
        type: err.errorType || {},
        data: err.errorData || {}
      };

      ctx.showNotify(errors.message);
      update(errors);
    }
  }
}
