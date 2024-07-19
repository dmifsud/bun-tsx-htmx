// NOTE: hc- stands for hyper custom
if (document) {
    document.querySelectorAll('input[hc-invalid-target]').forEach(input => {
        const syncUIValidity = function(this: HTMLInputElement, event: Event) {
            const target = this.getAttribute('hc-invalid-target') ?? '';
            const targetElement = document.querySelector(target);
            if (targetElement) {
                if (this.validity.valid) {
                    targetElement.innerHTML = '';
                    // targetElement.classList.add('border-red-500');
                    // targetElement.addEventListener('input', function() {
                        //     targetElement.classList.remove('border-red-500');
                        // });
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

    document.querySelectorAll('input[hc-invalid-class]').forEach(input => {
        const syncUIValidity = function(this: HTMLInputElement, event: Event) {
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
}