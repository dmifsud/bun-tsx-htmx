// NOTE: hc- stands for hyper custom
const syncEvents = (content: HTMLElement) => {

        content.querySelectorAll('input[hc-invalid-target]').forEach((input) => {

            const syncUIValidity = function(this: HTMLInputElement, event: Event) {
                if (event instanceof KeyboardEvent) {
                    if (event.key === 'Enter') {
                        return;
                    }
                }
                const target = this.getAttribute('hc-invalid-target') ?? '';
                const targetElement = content.querySelector(target);
                if (targetElement) {
                    if (this.validity.valid) {
                        targetElement.innerHTML = '';
                        } else {
                            event.preventDefault();
                            targetElement.innerHTML = this.validationMessage;
                    }
                }
            }


    
            const additionalEvents = input.getAttribute('hc-invalid-events')?.split(' ') ?? [];
    
            input.addEventListener('invalid', syncUIValidity);
    
            additionalEvents.forEach(event => {
                input.addEventListener(event, syncUIValidity);
            });
    
        });
    
        content.querySelectorAll('input[hc-invalid-class]').forEach(input => {

            const syncUIValidity = function(this: HTMLInputElement, event: Event) {
                if (event instanceof KeyboardEvent) {
                    if (event.key === 'Enter') {
                        return;
                    }
                }
                const className = this.getAttribute('hc-invalid-class');
                if (typeof className === 'string') {
                    if (this.validity.valid) {
                        className.split(' ').forEach(c => this.classList.remove(c));
                    } else {
                        event.preventDefault();
                        className.split(' ').forEach(c => this.classList.add(c));
                    }
                }
    
            };
    
            const additionalEvents = input.getAttribute('hc-invalid-events')?.split(' ') ?? [];
            input.addEventListener('invalid', syncUIValidity);
    
    
            additionalEvents.forEach(event => {
                input.addEventListener(event, syncUIValidity);
            });
        });
        
    };

export default syncEvents;