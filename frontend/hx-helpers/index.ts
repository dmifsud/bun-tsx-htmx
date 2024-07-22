import invalidTarget from './invalid-target';
import requestLoadingShow from './request-loading-show';
import requestLoadingAttributes from './request-loading-attributes';

const eventsToSync = [
    invalidTarget, // NOT HTMX DEPENDENT
    requestLoadingShow,
    requestLoadingAttributes,
];


if (document) {
    eventsToSync.forEach(event => {
        document.addEventListener("DOMContentLoaded", event, false);
        document.addEventListener("htmx:afterRequest", event);
    });
}