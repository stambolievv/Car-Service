import { hasUserData } from '../api';

const userNavigation = /**@type {NodeListOf<Element>}*/(document.querySelectorAll('.user-navigation'));
const guestNavigation = /**@type {NodeListOf<Element>}*/(document.querySelectorAll('.guest-navigation'));

/**
 * @description Updates the navigation bar based on whether the user is logged in or not.
 */
export function updateNavigation() {
  const hasLoggedUser = hasUserData();

  if (hasLoggedUser) {
    userNavigation.forEach((element) => element.removeAttribute('hidden'));
    guestNavigation.forEach((element) => element.setAttribute('hidden', ''));
  } else {
    userNavigation.forEach((element) => element.setAttribute('hidden', ''));
    guestNavigation.forEach((element) => element.removeAttribute('hidden'));
  }
}