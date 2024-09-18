import page from 'page';
import { logout } from '@db';
import { notice } from '@utilities';

/**
 * @description Logs out the user after confirming their intention to do so.
 * @param {Event} event - The event object.
 */
export async function onLogout(event) {
  event.preventDefault();

  const confirm = await new Promise(resolve => {
    return notice.showModal({
      message: 'Сигурен ли си, че искаш да излезеш от профила си?',
      title: 'Изход',
      onConfirm: () => resolve(true),
      onCancel: () => resolve(false)
    });
  });

  if (!confirm) return;

  try {
    notice.showLoading({ type: 'cube-zoom' });
    await logout();
    page.redirect('/user/login');
  } catch (error) {
    const errorMessages = error instanceof Error ? error.message : 'Възникна грешка, моля опитайте по-късно';
    notice.showToast({ text: errorMessages, type: 'error' });
  } finally {
    notice.hideLoading();
  }
}