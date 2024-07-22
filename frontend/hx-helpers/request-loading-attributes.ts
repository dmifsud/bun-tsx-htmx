// NOTE: this is just an idea. A WIP. Still need to test its usability
const syncEvents = (content: HTMLElement) => {
    // TODO: find a way to combine these

    content.querySelectorAll('[hc-req\\:disabled]').forEach((el: Element) => {
        const form = el.closest('form');
        if (form) {
            form.addEventListener('htmx:beforeRequest', function(event) {
                console.log('beforeRequest');
                (el as HTMLElement).setAttribute('disabled', 'disabled');
            });
            form.addEventListener('htmx:afterRequest', function(event) {
                (el as HTMLElement).removeAttribute('disabled');
            });
            (el as HTMLElement).dataset.hcReqListenersAdded = 'true';
        }
    });

    content.querySelectorAll('[hc-req\\:class]').forEach((el: Element) => {
        const form = el.closest('form');
        if (form) {
            form.addEventListener('htmx:beforeRequest', function(event) {
                const className = el.getAttribute('hc-req:class');
                if (typeof className === 'string') {
                    className.split(' ').forEach(c => el.classList.add(c));
                }
            });
            form.addEventListener('htmx:afterRequest', function(event) {
                const className = el.getAttribute('hc-req:class');
                if (typeof className === 'string') {
                    className.split(' ').forEach(c => el.classList.remove(c));
                }
            });
        }
    });
};

export default syncEvents;