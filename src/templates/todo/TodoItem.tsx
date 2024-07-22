/** @jsx h */
import { h } from 'preact';
import { Todo } from '../../models/todo.model';

export function TodoItem(props: { todo: Todo, edit?: boolean }) {
    const { edit, todo } = props;

    const classes = {
        taskText: todo.done ? 'line-through' : ''
    };
    
    return (
        <li class="[&:not(:last-child)]:border-b border-gray-200 hover:bg-slate-50">
            <form id={`item-${todo.id}`} hx-patch={`/todos/${todo.id}`} hx-target="closest li" hx-swap="outerHTML" class="flex items-center justify-between py-4 gap-4">
                <label class="flex items-center w-[70%] cursor-pointer">
                    {
                        edit ?
                            <input type="text" autocomplete="off" class="w-full px-4 py-2 mr-2 rounded-lg
                                            border-gray-300 focus:outline-none
                                            focus:border-blue-500" value={todo.task} name="task"/> :
                            <span>
                                <input type="checkbox" name="done" hx-patch={`/todos/${todo.id}`} hx-trigger="change" checked={todo.done} class="mr-2"/>
                                <span class={classes.taskText}>{todo.task}</span>
                            </span>
                    }
                </label>

                <div class="w-[30%] flex items-end justify-end">
                    {
                        edit ?
                            <span>
                                <button hx-get={`/todo/${todo.id}`} hx-target="closest li" hx-swap="outerHTML" type="button" class="bg-white hover:bg-gray-50 text-black font-bold py-2 px-4 rounded border border-gray-200">Cancel</button>
                                <button type="submit" class="bg-green-500 hover:bg-green-700 
                                            text-white font-bold py-2 px-4 rounded">
                                        <span hc-request-loading-hide={`#item-${todo.id}`}>Update</span>
                                        <span hc-request-loading-show={`#item-${todo.id}`}>Updating&hellip;</span>
                                </button>
                            </span> :
                            <span>
                                <button type="button" hx-delete={`/todo/${todo.id}`} hx-confirm="Are you sure you want to delete?" hx-target="closest li" hx-swap="outerHTML" 
                                class="bg-red-500 hover:bg-red-700 
                                            text-white font-bold py-2 px-4 rounded mr-4">Delete</button>
                                <button hx-get={`/todo/${todo.id}/edit`} hx-target="closest li" hx-swap="outerHTML" type="button" class="bg-blue-500 hover:bg-blue-700 
                                            text-white font-bold py-2 px-4 rounded">Edit</button>
                            </span>
                    }
                </div>
            </form>
        </li>
    );
}