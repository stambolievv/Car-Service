import { register } from '../../../api/userService.js';
import { formDataHandler } from '../../../util/util.js';
import { template } from './registerView.js';

export function registerPage(ctx) {
    const update = (errors = {}) => ctx.render(template(onSubmit, errors));

    update();

    async function onSubmit(e) {
        e.preventDefault();

        try {
            const { username, password } = formDataHandler(e.target, 'username', 'password', 'repass');

            await register({ username, password });

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