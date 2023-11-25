import { render } from 'lit';
import { hasUserData } from '../api';
import { updateNavigation } from '../utilities';

const authenticationPaths = ['/user/login', '/user/register'];

/**
 * @description It adds some useful functions to the context object.
 * @param {PageJS.Context} ctx - The context object that is passed to the middleware.
 * @param {Function} next - The next middleware in the chain.
 */
export function decorateContext(ctx, next) {
  updateNavigation();

  Object.assign(ctx, { render: renderer });

  enhanceViewport(ctx.path);

  const hasUser = hasUserData();
  const forbiddenPath = (hasUser && authenticationPaths.includes(ctx.path)) || (!hasUser && !authenticationPaths.includes(ctx.path));

  if (forbiddenPath) window.history.back();
  else next();
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
  const defaultContainer = document.getElementById('site-content') || document.body;

  return render(content, containerElement || defaultContainer, rest);
}

/**
 * @description Enhances the viewport meta tag based on the current path.
 * @param {string} path - The current path.
 */
function enhanceViewport(path) {
  const metaTag = /**@type {HTMLMetaElement | null}*/(document.querySelector('meta[name=viewport]'));
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