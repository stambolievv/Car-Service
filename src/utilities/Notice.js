import { generateUUID, createElement } from '@utilities';

const MASK_COLOR = 'rgba(0 0 0 / 0.5)';
const TOAST_AUTO_CLOSE_DEFAULT_DURATION = 3;
const TOAST_STYLES = {
  default: {
    icon: '',
    color: '#555555',
    backgroundColor: '#f2f2f2',
  },
  info: {
    icon: 'info',
    color: '#217ca3',
    backgroundColor: '#cfe8f3',
  },
  success: {
    icon: 'check_circle',
    color: '#45874a',
    backgroundColor: '#e5f6e4',
  },
  warning: {
    icon: 'error',
    color: '#b0822f',
    backgroundColor: '#fef5dc',
  },
  error: {
    icon: 'cancel',
    color: '#b23c3a',
    backgroundColor: '#f2dede',
  },
};

/**
 * @classdesc Represents a Notice class for displaying various notifications, modals and loading indicators.
 * @class
 */
class Notice {
  /**
   * The container element for the class.
   * @type {HTMLElement}
   */
  #container = document.body;

  /**
   * @description Displays a loading screen.
   * @param {object} [options] - The options for the loading notice.
   * @param {LoadingType} [options.type] - The type of loading animation to display.
   * @param {string} [options.color] - The color of the loading animation.
   * @param {number} [options.autoClose] - The duration in seconds after which the loading screen will automatically close.
   * @param {string} [options.title] - The title to display above the loading animation.
   * @param {string} [options.titleColor] - The color of the title.
   * @param {string} [options.maskColor] - The background color of the loading notice.
   */
  showLoading(options = {}) {
    const {
      type = 'dots',
      color = 'white',
      autoClose,
      title,
      titleColor,
      maskColor = MASK_COLOR,
    } = options;

    const container = createElement('div', {
      parent: this.#container,
      className: 'notice-loading notice-flex-center notice-fixed-all-page',
      id: 'notice-loading',
    });

    createElement('div', {
      parent: container,
      className: 'notice-mask notice-fixed-all-page',
      style: { backgroundColor: maskColor }
    });

    const loadingContent = /**@type {HTMLDivElement}*/(
      this.#getLoadingContent(type, color) ||
      this.#getLoadingContent('dots', color)
    );

    const contentElement = createElement('div', {
      parent: container,
      className: 'notice-flex-center notice-loading-main',
      children: [loadingContent]
    });

    title && createElement('p', {
      parent: contentElement,
      style: { color: titleColor },
      textContent: title
    });

    if (autoClose) setTimeout(() => container.remove(), autoClose * 1000);
  }

  /**
   * @description Removes the loading screen.
   */
  hideLoading() {
    document.getElementById('notice-loading')?.remove();
  }

  /**
   * @description Displays a toast notification.
   * @param {object} options - The options for the toast notification.
   * @param {string} options.text - The text to display in the toast notification.
   * @param {ToastType} [options.type] - The type of the toast notification.
   * @param {number} [options.autoClose] - The duration in seconds after which the notification will automatically close.
   * @param {boolean} [options.showClose] - Whether to show a close button on the toast notification.
   */
  showToast(options) {
    const {
      text,
      type = 'default',
      autoClose = TOAST_AUTO_CLOSE_DEFAULT_DURATION,
      showClose = true,
    } = options;

    if (!text) return;

    const { icon, color, backgroundColor } = TOAST_STYLES[type] || TOAST_STYLES.default;

    const container = document.getElementById('notice-toast') || createElement('div', { parent: this.#container, className: 'notice-toast', id: 'notice-toast' });

    const toastMain = createElement('div', {
      parent: container,
      className: 'notice-toast-main notice-toast-main-active',
      id: `notice-toast-${generateUUID()}`,
      style: { backgroundColor },
    });

    const toastContent = createElement('div', {
      parent: toastMain,
      className: 'notice-toast-container',
      children: [
        createElement('p', {
          className: 'notice-toast-text',
          style: { color },
          textContent: text,
        }),
      ]
    });

    icon && createElement('i', {
      parent: toastContent,
      prepend: true,
      className: 'material-icons notice-toast-icon',
      style: { color },
      textContent: icon
    });

    (showClose || !autoClose) && createElement('i', {
      parent: toastContent,
      className: 'material-icons notice-close-icon',
      textContent: 'close',
      onclick: () => removeActiveToast()
    });

    const shouldAutoClose = !!Number(getComputedStyle(container).getPropertyValue('--_should-auto-close'));

    if (autoClose || shouldAutoClose) {
      const duration = autoClose || TOAST_AUTO_CLOSE_DEFAULT_DURATION;
      setTimeout(() => removeActiveToast(), duration * 1000);
    }

    /**
     * @description Removes the active toast from the DOM.
     */
    function removeActiveToast() {
      if (!toastMain) return;

      const duration = parseFloat(window.getComputedStyle(toastMain).getPropertyValue('transition-duration'));
      toastMain.classList.remove('notice-toast-main-active');

      setTimeout(() => {
        toastMain && toastMain.remove();
        if (!container.children.length) container.remove();
      }, duration * 1000);
    }
  }

  /**
   * @description Displays a modal screen.
   * @param {object} [options] - The options for the modal notice.
   * @param {ModalType} [options.type] - The type of modal to display.
   * @param {string} [options.color] - The color of the modal.
   * @param {string} [options.backgroundColor] - The background color of the modal.
   * @param {string} [options.title] - The title of the modal.
   * @param {string} [options.titleColor] - The color of the title.
   * @param {string} [options.message] - The message to display in the modal.
   * @param {string} [options.messageColor] - The color of the message.
   * @param {string} [options.maskColor] - The color of the modal mask.
   * @param {((event: Event) => void) | undefined} [options.onConfirm] - The function to call when the user confirms the modal.
   * @param {((event: Event) => void) | undefined} [options.onCancel] - The function to call when the user cancels the modal.
   */
  showModal(options = {}) {
    const {
      type = 'yes-no',
      color,
      backgroundColor,
      title,
      titleColor,
      message,
      messageColor,
      maskColor = MASK_COLOR,
      onConfirm,
      onCancel,
    } = options;

    const container = createElement('div', {
      parent: this.#container,
      className: 'notice-modal notice-flex-center notice-fixed-all-page',
      id: 'notice-modal',
    });

    createElement('div', {
      parent: container,
      className: 'notice-mask notice-fixed-all-page',
      style: { backgroundColor: maskColor }
    });

    const modalContent = /**@type {HTMLDivElement}*/(
      this.#getModalContent(type, container, onConfirm, onCancel) ||
      this.#getModalContent('yes-no', container, onConfirm, onCancel)
    );

    const contentElement = createElement('div', {
      parent: container,
      className: 'notice-flex-center notice-modal-main',
      style: { backgroundColor },
      children: [modalContent]
    });

    message && createElement('p', {
      parent: contentElement,
      prepend: true,
      style: { color: messageColor || color },
      textContent: message
    });

    title && createElement('h2', {
      parent: contentElement,
      prepend: true,
      style: { color: titleColor || color },
      textContent: title
    });
  }

  /**
   * @description Returns a loading content element based on the type provided.
   * @param {LoadingType} type - The type of loading content to create.
   * @param {string} color - The background color of the loading content.
   * @returns {HTMLDivElement | null} The loading content element.
   */
  #getLoadingContent(type, color) {
    switch (type) {
      case 'cube-flip': return createElement('div', {
        className: 'notice-loading-cube-flip',
        style: { backgroundColor: color }
      });

      case 'dots-zoom': return createElement('div', {
        className: 'notice-loading-dots-zoom',
        children: [
          createElement('div', { className: 'notice-loading-dots-zoom1', style: { backgroundColor: color } }),
          createElement('div', { className: 'notice-loading-dots-zoom2', style: { backgroundColor: color } })
        ]
      });

      case 'line': return createElement('div', {
        className: 'notice-loading-line',
        children: [
          createElement('div', { className: 'notice-loading-line-rect1', style: { backgroundColor: color } }),
          createElement('div', { className: 'notice-loading-line-rect2', style: { backgroundColor: color } }),
          createElement('div', { className: 'notice-loading-line-rect3', style: { backgroundColor: color } }),
          createElement('div', { className: 'notice-loading-line-rect4', style: { backgroundColor: color } }),
          createElement('div', { className: 'notice-loading-line-rect5', style: { backgroundColor: color } })
        ]
      });

      case 'dots-spin': return createElement('div', {
        className: 'notice-loading-spin-dots',
        children: [
          createElement('div', { className: 'notice-loading-spin-dot1', style: { backgroundColor: color } }),
          createElement('div', { className: 'notice-loading-spin-dot2', style: { backgroundColor: color } })
        ]
      });

      case 'dots': return createElement('div', {
        className: 'notice-loading-dots',
        children: [
          createElement('div', { className: 'notice-loading-dot1', style: { backgroundColor: color } }),
          createElement('div', { className: 'notice-loading-dot2', style: { backgroundColor: color } }),
          createElement('div', { style: { backgroundColor: color } })
        ]
      });

      case 'cube-zoom': return createElement('div', {
        className: 'notice-loading-cube-zoom',
        children: [
          createElement('div', { className: 'notice-loading-cube-zoom-1', style: { backgroundColor: color } }),
          createElement('div', { className: 'notice-loading-cube-zoom-2', style: { backgroundColor: color } }),
          createElement('div', { className: 'notice-loading-cube-zoom-3', style: { backgroundColor: color } }),
          createElement('div', { className: 'notice-loading-cube-zoom-4', style: { backgroundColor: color } }),
          createElement('div', { className: 'notice-loading-cube-zoom-5', style: { backgroundColor: color } }),
          createElement('div', { className: 'notice-loading-cube-zoom-6', style: { backgroundColor: color } }),
          createElement('div', { className: 'notice-loading-cube-zoom-7', style: { backgroundColor: color } }),
          createElement('div', { className: 'notice-loading-cube-zoom-8', style: { backgroundColor: color } }),
          createElement('div', { className: 'notice-loading-cube-zoom-9', style: { backgroundColor: color } })
        ]
      });

      default: return null;
    }
  }

  /**
   * @description Returns the modal content element based on the type provided.
   * @param {ModalType} type - The type of modal content to create.
   * @param {HTMLDivElement} parent - The parent element of the modal content.
   * @param {((event: Event) => void) | undefined} onConfirm - The function to be called when the confirm button is clicked.
   * @param {((event: Event) => void) | undefined} onCancel - The function to be called when the cancel button is clicked.
   * @returns {HTMLDivElement | null} The modal content element.
   */
  #getModalContent(type, parent, onConfirm, onCancel) {
    const buttonContainer = createElement('div', {
      className: 'notice-modal-buttons',
    });

    switch (type) {
      case 'yes-no': {
        createElement('button', {
          parent: buttonContainer,
          attributes: { 'data-button-type': 'info' },
          textContent: 'Да',
          onclick: (event) => {
            parent.remove();
            typeof onConfirm === 'function' && onConfirm(event);
          }
        });
        createElement('button', {
          parent: buttonContainer,
          attributes: { 'data-button-type': 'danger' },
          textContent: 'Не',
          onclick: (event) => {
            parent.remove();
            typeof onCancel === 'function' && onCancel(event);
          }
        });
        return buttonContainer;
      }

      case 'ok': {
        createElement('button', {
          parent: buttonContainer,
          textContent: 'Добре',
          onclick: (event) => {
            parent.remove();
            typeof onConfirm === 'function' && onConfirm(event);
          }
        });
        return buttonContainer;
      }

      case 'ok-cancel': {
        createElement('button', {
          parent: buttonContainer,
          textContent: 'Добре',
          onclick: (event) => {
            parent.remove();
            typeof onConfirm === 'function' && onConfirm(event);
          }
        });
        createElement('button', {
          parent: buttonContainer,
          attributes: { 'data-button-type': 'danger' },
          textContent: 'Отказ',
          onclick: (event) => {
            parent.remove();
            typeof onCancel === 'function' && onCancel(event);
          }
        });
        return buttonContainer;
      }

      case 'retry-cancel': {
        createElement('button', {
          parent: buttonContainer,
          attributes: { 'data-button-type': 'info' },
          textContent: 'Нов опит',
          onclick: (event) => {
            parent.remove();
            typeof onConfirm === 'function' && onConfirm(event);
          }
        });
        createElement('button', {
          parent: buttonContainer,
          attributes: { 'data-button-type': 'danger' },
          textContent: 'Отказ',
          onclick: (event) => {
            parent.remove();
            typeof onCancel === 'function' && onCancel(event);
          }
        });
        return buttonContainer;
      }

      default: return null;
    }
  }
}

export default new Notice();

/**
 * @typedef {'cube-flip' | 'dots-zoom' | 'line' | 'dots-spin' | 'dots' | 'cube-zoom'} LoadingType
 * @typedef {'default' | 'info' | 'success' | 'warning' | 'error'} ToastType
 * @typedef {'yes-no' | 'ok' | 'ok-cancel' | 'retry-cancel'} ModalType
 */