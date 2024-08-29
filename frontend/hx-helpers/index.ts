import htmx from 'htmx.org';
import HyperValidate from 'hyper-validate';
import requestLoadingShow from './request-loading-show';
import requestLoadingAttributes from './request-loading-attributes';
const eventsToSync = [
    // invalidTarget, // NOT HTMX DEPENDENT
    requestLoadingShow,
    requestLoadingAttributes,
    HyperValidate.applyToHTML
];

if (htmx) {
    htmx.onLoad((content: HTMLElement) => {
        eventsToSync.forEach(sync => sync(content));
    });
} else {
    console.error('htmx not found');
}