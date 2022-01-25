import { getUserData, logout } from '../api/userService.js';
import { showModal } from '../util/modal.js';
import { showNotify } from '../util/notify.js';
import { page, render } from '../lib/lib.js';

const root = {
    container: document.getElementById('site-content'),
    userNav: document.getElementById('userNav'),
    guestNav: document.getElementById('guestNav'),
    logoutBtn: document.getElementById('logoutBtn')
};

root.logoutBtn.addEventListener('click', onLogout);

export function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, root.container);
    ctx.updateNavigation = updateNavigation;

    ctx.getUserData = getUserData;
    ctx.ownerUserOnly = ownerUserOnly;

    ctx.showModal = showModal;
    ctx.showNotify = showNotify;

    next();
}

export function loggedUserOnly(ctx, next) {
    if (getUserData() == null) { return page.redirect('/home'); }

    next();
}

function ownerUserOnly(item) {
    const userData = getUserData();
    if (userData && item.owner.objectId == userData.id) { return true; }
    return page.redirect('/home');
}

function updateNavigation() {
    const user = getUserData();
    if (user) {
        root.userNav.style.display = 'inline-block';
        root.guestNav.style.display = 'none';
    } else {
        root.userNav.style.display = 'none';
        root.guestNav.style.display = 'inline-block';
    }
}

async function onLogout() {
    const confirmed = await showModal('Сигурен ли си, че искаш да излезеш?');
    if (confirmed) {
        try {
            await logout();
            updateNavigation();
            page.redirect('/home');
        } catch (error) {
            showNotify(error.message, 'errorBox');
        }
    }
}

updateNavigation();