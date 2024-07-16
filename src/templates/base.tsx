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


export function renderBase(page: h.JSX.Element) {
    return `
        <!DOCTYPE html>
        <html>
            <head>
                <title>Bun Project</title>
                ${render(frontendLib())}
            </head>
            <body>
            ${render(page)}
            </body>
        </html>
        `;
}