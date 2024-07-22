if (document) {
    const syncEvents = () => {

        document.querySelectorAll('[hc-request-loading-show]').forEach((el: Element) => {
            const formSelector = el.getAttribute('hc-request-loading-show');
            const form = document.querySelector(formSelector ?? '');
            if (form) {
                form.addEventListener('htmx:beforeRequest', function(event) {
                    (el as HTMLElement).style.display = 'inline';
                });
                form.addEventListener('htmx:afterRequest', function(event) {
                    (el as HTMLElement).style.display = 'none';
                });
                // by default this should be hidden
                (el as HTMLElement).style.display = 'none';
            } else {
                console.error('Invalid value for hc-request-loading-show');
            }
        });
    
        document.querySelectorAll('[hc-request-loading-hide]').forEach((el: Element) => {
            const formSelector = el.getAttribute('hc-request-loading-hide');
            const form = document.querySelector(formSelector ?? '');
            if (form) {
                form.addEventListener('htmx:beforeRequest', function(event) {
                    (el as HTMLElement).style.display = 'none';
                });
                form.addEventListener('htmx:afterRequest', function(event) {
                    (el as HTMLElement).style.display = 'inline';
                });
            } else {
                console.error('Invalid value for hc-request-loading-hide');
            }
        });

    };
    // TODO: this needs to be updated so that when there's any htmx:afterReqest, this code (function) is added again
    document.addEventListener("DOMContentLoaded", syncEvents, false);
    document.addEventListener("htmx:afterRequest", syncEvents); // TODO: gotta make sure no duplicate events are set
    
}