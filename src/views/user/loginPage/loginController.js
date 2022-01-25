import { login } from '../../../api/userService.js';
import { formDataHandler } from '../../../util/util.js';
import { template } from './loginView.js';

export function loginPage(ctx) {
    const update = (errors = {}) => ctx.render(template(onSubmit, errors));

    update();

    async function onSubmit(e) {
        e.preventDefault();

        try {
            const data = formDataHandler(e.target, 'username', 'password');

            await login(data);

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