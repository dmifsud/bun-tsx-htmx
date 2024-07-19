/** @jsx h */
import { h } from 'preact';
import { Todo } from '../../models/todo.model';
import { TodoItem } from './TodoItem';

export const todos: Todo[] = [
    { id: 1, task: 'Learn Bun', done: false },
    { id: 2, task: 'Learn Preact', done: true },
    { id: 3, task: 'Learn HTMX', done: false },
    { id: 4, task: 'Learn Alpine.js', done: false }
];

export function TodoList() {

    return (
        <div class="container mx-auto my-10">
            <h1 class="text-center text-3xl font-semibold mb-4 dark:text-white">Todo List</h1>
            <div class="text-center dark:text-white">
                <small>HTMx, TailwindCSS, Bun (server) &amp; Preact (SSR)</small>
            </div>
            <div class="md:w-1/2 mx-auto">
                <div class="bg-white shadow-md rounded-lg p-6">
                    <form hx-post="/todo" hx-target="#todo-list" hx-swap="afterbegin" hx-on--after-request="this.reset()">
                        <div class="flex mb-4">
                        <input type="text" autocomplete="off" name="task" placeholder="New Todo" class="w-full px-4 py-2 mr-2 rounded-lg
                                                border-gray-300 focus:outline-none
                                                focus:border-blue-500" id="todo-input"/>
                        <button type="submit" class="bg-blue-500 hover:bg-blue-700 
                                                text-white font-bold py-2 px-4 rounded">Add</button>
                        </div>
                    </form>
                    <ul id="todo-list">
                        {todos.sort((a, b) => b.id - a.id).map(todo => <TodoItem todo={todo} />)}
                    </ul>
                </div>
            </div>
        </div>
    );
}