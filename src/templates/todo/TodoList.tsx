/** @jsx h */
import { h } from 'preact';
import { Todo } from '../../models/todo.model';
import { TodoItem } from './TodoItem';

// export const todos: Todo[] = [
//     { id: 1, task: 'Learn Bun', done: false },
//     { id: 2, task: 'Learn Preact', done: true },
//     { id: 3, task: 'Learn HTMX', done: false },
//     { id: 4, task: 'Learn Alpine.js', done: false }
// ];

export function TodoList(todos: Todo[]) {

    return (
        <div class="container mx-auto my-10">
            <h1 class="text-center text-3xl font-semibold mb-4 dark:text-white">Todo List</h1>
            <div class="text-center dark:text-white">
                <small>HTMx, TailwindCSS, Bun (server) &amp; Preact (SSR), MongoDB (Mongoose)</small>
            </div>
            <div class="md:w-[75%] mx-auto">
                <div class="bg-white shadow-md rounded-lg p-6 w-auto border border-gray-200 sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <form id="todo-form" hx-post="/todo" hx-target="#todo-list" hx-swap="afterbegin" hx-on--after-request="this.reset()">
                        <div class="flex mb-4 gap-4">
                            <input type="text" 
                                    required
                                    pattern="^[a-zA-Z0-9 ]{1,}$"
                                    hc-req:disabled
                                    hv-invalid-target="#add-error"
                                    hv-invalid-class="border-red-500 text-red-600"
                                    hv-invalid-events="keyup"
                                    autocomplete="off" name="task" placeholder="New Todo" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="todo-input"/>
                            <button type="submit" hc-req:disabled class="bg-blue-500 hover:bg-blue-700 
                                                    text-white font-bold py-2 px-4 rounded disabled:opacity-10">
                                <span hc-request-loading-hide="#todo-form">Add</span>
                                <span hc-request-loading-show="#todo-form">Adding&hellip;</span>                       
                            </button>
                        </div>
                        <p id="add-error" className='text-red-600 text-sm'></p>
                    </form>
                    <ul id="todo-list">
                        {todos.map(todo => <TodoItem todo={todo} />)}
                    </ul>
                </div>
            </div>
        </div>
    );
}