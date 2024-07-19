/** @jsx h */
import { h, Fragment } from 'preact';
import render from 'preact-render-to-string';


function frontendLib() {
    const env = process.env.NODE_ENV;
    return (
        <Fragment>
            {
                env === 'production' ? 
                    <Fragment>
                        <link rel="stylesheet" href="/dist/style.css" />
                        <script src="/dist/main.es.js"></script>
                    </Fragment> :
                    <script src={`http://localhost:${process.env.VITE_PORT}/frontend/main.ts`} type="module"></script>
            }
        </Fragment>
    )
}


export function renderBase(page: h.JSX.Element, title: string = 'Bun Project') {
    return `
        <!DOCTYPE html>
        <html>
            <head>
                <title>${title}</title>
                ${render(frontendLib())}
            </head>
            <body class="bg-gray-50 dark:bg-gray-900">
                ${render(page)}
            </body>
        </html>
        `;
}