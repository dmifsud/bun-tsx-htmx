// NOTE: hc- stands for hyper custom
const syncEvents = () => {

        document.querySelectorAll('input[hc-invalid-target]').forEach((input) => {

            if ((input as HTMLElement).dataset.invalidTargetListener === 'true') {
                return;
            }


            const syncUIValidity = function(this: HTMLInputElement, event: Event) {
                if (event instanceof KeyboardEvent) {
                    if (event.key === 'Enter') {
                        return;
                    }
                }
                const target = this.getAttribute('hc-invalid-target') ?? '';
                const targetElement = document.querySelector(target);
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

            (input as HTMLElement).dataset.invalidTargetListener = 'true';
    
        });
    
        document.querySelectorAll('input[hc-invalid-class]').forEach(input => {
            if ((input as HTMLElement).dataset.invalidClassListener === 'true') {
                return;
            }


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

            (input as HTMLElement).dataset.invalidClassListener = 'true';
        });
        
    };

export default syncEvents;