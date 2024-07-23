// NOTE: this is just an idea. A WIP. Still need to test its usability
const syncEvents = (content: HTMLElement) => {
    // TODO: find a way to combine these

    content.querySelectorAll('*:not([hc-req\\:class]').forEach((el: Element) => {
        const reqAttributes = Array.from(el.attributes).filter(attr => attr.name.startsWith('hc-req:'));
        const customRef = el.getAttribute('hc-req-ref');
        reqAttributes.forEach(attr => {
            const attrName = attr.name.replace('hc-req:', '');
            const attrValue = el.getAttribute(attrName);
            const form = customRef ? content.querySelector(customRef) : el.closest('form');
            if (form) {
                form.addEventListener('htmx:beforeRequest', function(event) {
                    (el as HTMLElement).setAttribute(attrName, attrValue ?? attrName);
                });
                form.addEventListener('htmx:afterRequest', function(event) {
                    (el as HTMLElement).removeAttribute(attrName);
                });
            }
        });
    });

    content.querySelectorAll('[hc-req\\:class]').forEach((el: Element) => {
        const customRef = el.getAttribute('hc-req-ref');
        const form = customRef ? content.querySelector(customRef) : el.closest('form');
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