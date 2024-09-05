import { Hono } from 'hono';
import { authMiddleware } from '../middleware/auth.middleware';
import { TodoService } from '../services/todo.service';
import { renderBase } from '../templates/base';
import AuthBase from '../templates/authBase';
import { TodoList } from '../templates/todo/TodoList';
import { render } from 'preact-render-to-string';
import { TodoItem } from '../templates/todo/TodoItem';

const timeout = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

// as per best practices here https://hono.dev/docs/guides/best-practices

const todosService = new TodoService();

const todoRoute = new Hono();
todoRoute.get('/', authMiddleware, async (c) => {
    const todos = await todosService.getAllTodos();
    return c.html(renderBase(await AuthBase(TodoList(todos), "/todo"), 'Todo List'));
});

todoRoute.get('/:id', async (c) => {
    const id = c.req.param('id');
    const todo = await todosService.getTodoById(id);
    if (todo) {
        return c.html(render(TodoItem({ todo })));
    } else {
        return c.text('Not found', 404);
    }
});

// Handler for the /todo/:id/edit route
todoRoute.get('/:id/edit', async (c) => {
    const id = c.req.param('id');
    const todo = await todosService.getTodoById(id);
    if (todo) {
        return c.html(render(TodoItem({ todo, edit: true })));
    } else {
        return c.text('Not found', 404);
    }
});

todoRoute.patch('/:id', async (c) => {
    const id = c.req.param('id');
    const data = await c.req.parseBody();
    const taskNameUpdated = data.task?.toString();
    const todoToUpdate = await todosService.patchTodo(id, {
        task: taskNameUpdated,
        done: !taskNameUpdated ? data.done === 'on' : undefined
    });
    if (todoToUpdate) {
        await timeout(500);
        return c.html(render(TodoItem({ todo: todoToUpdate })));
    } else {
        return c.text('Not found', 404);
    }
});

// Function to handle adding a new todo
todoRoute.post('/', async (c) => {
    const data = await c.req.parseBody();
    // TODO: add server side validation
    const newTodo = await todosService.addTodo(data.task?.toString());
    return c.html(render(TodoItem({ todo: newTodo })));
});

todoRoute.delete('/:id', async (c) => {
    const id = c.req.param('id');
    try {
        await todosService.deleteTodo(id);
        // empty response
        return new Response();
    } catch (ex) {
        return c.text('Not found', 404);
    }
});
export default todoRoute;