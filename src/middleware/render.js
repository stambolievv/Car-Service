import { render } from 'lit';
import { hasUserData } from '@db';
import { updateNavigation } from '@utilities';

const root = document.getElementById('site-content') || document.body;
const metaTag = /**@type {HTMLMetaElement | null}*/(document.querySelector('meta[name=viewport]'));

const authenticationPaths = ['/user/login', '/user/register'];
const monitoredPaths = ['/cars', '/repairs'];

/**
 * @description It adds some useful functions to the context object.
 * @param {TypedPageJSContext} ctx - The context object that is passed to the middleware.
 * @param {Function} next - The next middleware in the chain.
 */
export function decorateContext(ctx, next) {
  const context = Object.assign(ctx, { root, render: renderer });

  saveContextVariables(context);
  enhanceViewport(context);
  updateNavigation();

  transitionToNextView(() => {
    const hasUser = hasUserData();
    const unauthPath = !hasUser && !authenticationPaths.includes(ctx.path);
    const authPath = hasUser && authenticationPaths.includes(ctx.path);

    if (unauthPath) ctx.page.redirect(authenticationPaths[0]);
    else if (authPath) window.history.back();
    else next();
  });
}

/**
 * @description Renders the provided content in the specified container.
 * @param {unknown} content - The content to be rendered.
 * @param {RenderOptions | undefined} [options] - The options to be used for rendering.
 * @returns {import('lit').RootPart} The root part of the rendered content.
 */
function renderer(content, options = {}) {
  const { container, ...rest } = options;

  const isContainerElement = container && (container instanceof HTMLElement || container instanceof DocumentFragment);
  const containerElement = isContainerElement ? container : (typeof container === 'string' ? document.querySelector(container) : null);

  return render(content, containerElement || root, rest);
}

/**
 * @description Updates the previous path in the context state and the user id if the admin si browsing as a user.
 * @param {Context} ctx - The context object.
 */
function saveContextVariables(ctx) {
  const { origin, pathname, search } = window.location;
  const currentPath = origin + ctx.pathname;
  const isMonitored = monitoredPaths.some(path => pathname.endsWith(path));

  if (isMonitored && currentPath !== origin + pathname) {
    ctx.state.prev = pathname + search;
  }
}

/**
 * @description Enhances the viewport meta tag based on the current path.
 * @param {Context} ctx - The context object.
 */
function enhanceViewport(ctx) {
  if (!metaTag) return;

  const interactiveWidget = 'interactive-widget=resizes-content';
  const metaTagContent = metaTag.content.split(',').map(prop => prop.trim());

  const hasWidget = metaTagContent.includes(interactiveWidget);
  const isAuthPath = authenticationPaths.includes(ctx.path);

  if (isAuthPath && !hasWidget) {
    metaTagContent.push(interactiveWidget);
  } else if (!isAuthPath && hasWidget) {
    const index = metaTagContent.indexOf(interactiveWidget);
    metaTagContent.splice(index, 1);
  }

  metaTag.content = metaTagContent.join(', ');
}

/**
 * @description Transition to the next view.
 * @param {Function} callback - Callback function to execute during the view transition.
 */
function transitionToNextView(callback) {
  if (!callback) return;

  // @ts-ignore
  if (!document.startViewTransition) {
    callback();
    return;
  }

  // @ts-ignore
  document.startViewTransition(callback);
}