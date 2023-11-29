import { render } from 'lit';
import { hasUserData } from '../api';
import { updateNavigation } from '../utilities';

const root = document.getElementById('site-content') || document.body;
const metaTag = /**@type {HTMLMetaElement | null}*/(document.querySelector('meta[name=viewport]'));
const authenticationPaths = ['/user/login', '/user/register'];

/**
 * @description It adds some useful functions to the context object.
 * @param {TypedPageJSContext} ctx - The context object that is passed to the middleware.
 * @param {Function} next - The next middleware in the chain.
 */
export function decorateContext(ctx, next) {
  updateNavigation();

  Object.assign(ctx, { root, render: renderer });

  updateLastVisitedRoute(ctx);
  enhanceViewport(ctx);

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
 * @description Updates the last visited route in the context state.
 * @param {TypedPageJSContext} ctx - The context object.
 */
function updateLastVisitedRoute(ctx) {
  const { lastVisitedRoute, path } = ctx.state;

  if (lastVisitedRoute === path) return;

  if (ctx.init) ctx.state.lastVisitedRoute = undefined;
  else ctx.state.lastVisitedRoute = window.location.pathname + window.location.search;
}

/**
 * @description Enhances the viewport meta tag based on the current path.
 * @param {TypedPageJSContext} ctx - The context object.
 */
function enhanceViewport(ctx) {
  const { path } = ctx;
  const widget = 'interactive-widget=resizes-content';

  if (!metaTag) {
    const newMetaTag = document.createElement('meta');
    newMetaTag.name = 'viewport';
    newMetaTag.content = widget;
    document.head.appendChild(newMetaTag);
    return;
  }

  const contentArray = metaTag.content.split(',').map(prop => prop.trim());

  if (authenticationPaths.includes(path) && !contentArray.includes(widget)) {
    contentArray.push(widget);
  } else if (!authenticationPaths.includes(path) && contentArray.includes(widget)) {
    contentArray.splice(contentArray.indexOf(widget), 1);
  }

  metaTag.content = contentArray.join(', ');
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