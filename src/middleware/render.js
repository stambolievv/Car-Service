import { getUserData, logout } from '../api/data.js';
import { showModal } from '../common/modal.js';
import { showNotify } from '../common/notify.js';
import { page, render } from '../lib/lib.js';

const root = {
    container: document.getElementById('main-content'),
    userNav: document.querySelectorAll('.userNav'),
    guestNav: document.querySelectorAll('.guestNav'),
    logoutBtn: document.getElementById('logoutBtn'),
    // welcomeSpan: document.querySelector('.userNav span'),
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

function ownerUserOnly(item) {
    const userData = getUserData();
    if (userData && item.owner.objectId == userData.id) { return true; }
    return page.redirect('/home');
}

function updateNavigation() {
    const user = getUserData();
    if (user) {
        [...root.userNav].forEach(a => a.style.display = 'inline-block');
        [...root.guestNav].forEach(a => a.style.display = 'none');
    } else {
        [...root.userNav].forEach(a => a.style.display = 'none');
        [...root.guestNav].forEach(a => a.style.display = 'inline-block');
    }
}

async function onLogout() {
    const confirmed = await showModal('Сигурен ли си, че искаш да излезеш?');
    if (confirmed) {
        await logout();
        updateNavigation();
        page.redirect('/home');
    }
}

updateNavigation();