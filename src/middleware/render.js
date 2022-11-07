import page from 'page';
import { render } from 'lit';
import { getUserData, logout } from '../api/userService';
import { showModal } from '../utils/modal';
import { showNotify } from '../utils/notify';

const root = {
  container: document.getElementById('site-content'),
  userNav: document.getElementById('userNav'),
  guestNav: document.getElementById('guestNav'),
  logoutBtn: document.getElementById('logoutBtn')
};

root.logoutBtn.addEventListener('click', onLogout);

/**
 * @description It adds some useful functions to the context object.
 * @param {object} ctx - The context object that is passed to the middleware.
 * @param {Function} next - The next middleware in the chain.
 */
export function decorateContext(ctx, next) {
  Object.assign(ctx, {
    render: (content) => render(content, root.container),
    updateNavigation,
    getUserData,
    ownerUserOnly,
    showModal,
    showNotify,
  });

  next();
}

/**
 * @description If the user is not logged in, redirect them to the home page.
 * @param {object} ctx - The context object that is passed to the middleware.
 * @param {Function} next - The next middleware in the chain.
 */
export function loggedUserOnly(ctx, next) {
  const user = getUserData();

  if (user !== null) next();
  else page.redirect('/');
}

/**
 * @description If the user is not the owner of the item, redirect them to the home page.
 * @param {object} item - The item that is being checked.
 */
function ownerUserOnly(item) {
  const userData = getUserData();
  if (userData?.id !== item.owner.objectId) page.redirect('/');
}

/**
 * @description If the user is logged in, show the user navigation, otherwise show the guest navigation.
 */
function updateNavigation() {
  const user = getUserData();

  root.userNav.style.display = user ? 'inline-block' : 'none';
  root.guestNav.style.display = user ? 'none' : 'inline-block';
}

/**
 * @description It shows a modal dialog asking the user if they're sure they want to log out, and if they confirm, it logs them out and redirects them to the home page.
 */
async function onLogout() {
  const confirmed = await showModal('Сигурен ли си, че искаш да излезеш?');
  if (!confirmed) return;

  try {
    await logout();
    updateNavigation();
    page.redirect('/');
  } catch (error) {
    showNotify(error.message, 'errorBox');
  }
}

updateNavigation();