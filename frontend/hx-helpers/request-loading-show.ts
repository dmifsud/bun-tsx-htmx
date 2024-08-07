const syncEvents = (content: HTMLElement) => {

    content.querySelectorAll('[hc-request-loading-show]').forEach((el: Element) => {
        if ((el as HTMLElement).dataset.listenersAdded === 'true') {
            console.log('already added');
            return;
        }
        const formSelector = el.getAttribute('hc-request-loading-show');
        const form = content.querySelector(formSelector ?? '');
        if (form) {
            form.addEventListener('htmx:beforeRequest', function(event) {
                (el as HTMLElement).style.display = 'inline';
            });
            form.addEventListener('htmx:afterRequest', function(event) {
                (el as HTMLElement).style.display = 'none';
            });
            // by default this should be hidden
            (el as HTMLElement).style.display = 'none';
            (el as HTMLElement).dataset.listenersAdded = 'true';
        } else {
            console.error('Invalid value for hc-request-loading-show');
        }
    });

    content.querySelectorAll('[hc-request-loading-hide]').forEach((el: Element) => {
        if ((el as HTMLElement).dataset.listenersAdded === 'true') {
            console.log('already added');
            return;
        }
        const formSelector = el.getAttribute('hc-request-loading-hide');
        const form = content.querySelector(formSelector ?? '');
        if (form) {
            form.addEventListener('htmx:beforeRequest', function(event) {
                (el as HTMLElement).style.display = 'none';
            });
            form.addEventListener('htmx:afterRequest', function(event) {
                (el as HTMLElement).style.display = 'inline';
            });
            (el as HTMLElement).dataset.listenersAdded = 'true';
        } else {
            console.error('Invalid value for hc-request-loading-hide');
        }
    });

};


export default syncEvents;