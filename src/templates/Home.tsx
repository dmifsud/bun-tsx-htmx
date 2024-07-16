/** @jsx h */
import { h } from 'preact';
import render from 'preact-render-to-string';

export function HomeItem(props: { person: string; }) {
    return (
        <li>Person: {props.person}</li>
    );
}

export function Home() {

    const p = ['one', 'two', 'three'];

    return (
        <div>
            <h1 class="text-center text-3xl font-semibold mb-4">This is a server side rendered preact (tsx) template</h1>
            <div class="text-center">
                <small>HTMx, TailwindCSS, Bun (Server), Preact (tsx) templates </small>
            </div>
            
            <form hx-post="/add-person" hx-swap="beforeend" hx-target="#persons"
                hx-on--after-request="this.reset()"
                class="text-center"
            >
                <input id="first-name" type="text" name="firstName" 
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mr-4"
                />
                <button type="submit" class="bg-green-500 hover:bg-green-700 
                                    text-white font-bold py-2 px-4 rounded">Add Person</button>
            </form>

            <div class="flex items-center justify-center py-4">
                <ul id="persons">
                    {p.map(pers => HomeItem({ person: pers }))}
                </ul>
            </div>

        </div>
    );

}


export function renderBase(page: h.JSX.Element) {
    return `
        <!DOCTYPE html>
        <html>
            <head>
                <title>Bun Project</title>
                <script src="https://unpkg.com/htmx.org@2.0.1/dist/htmx.min.js"></script>
                <link rel="stylesheet" href="/dist/css/styles.css">
            </head>
            <body>
                ${render(page)}
            </body>
        </html>
    `;
}