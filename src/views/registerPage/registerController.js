import { register } from '../../api/data.js';
import { formDataHandler } from '../../common/util.js';
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
            ctx.page.redirect('/catalog');
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