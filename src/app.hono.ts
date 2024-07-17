import { Hono } from 'hono';
import { serveStatic } from 'hono/bun';
import { TodoList, todos } from './templates/todo/TodoList';
import { render } from 'preact-render-to-string';
import { TodoItem } from './templates/todo/TodoItem';

import { Serve } from 'bun';
import { renderBase } from './templates/base';
import { Todo } from './models/todo.model';

const app = new Hono();

app.use("/dist/*", serveStatic({ root: "./" }));

// Function to find a todo by ID
const findTodoById = (id: number) => todos.find(todo => todo.id === id);

app.get('/', (c) => {
    return c.html(renderBase(TodoList()));
});

// Handler for the /todo/:id route
app.get('/todo/:id', (c) => {
  const id = +c.req.param('id');
  const todo = findTodoById(id);
  if (todo) {
    return c.html(render(TodoItem({ todo })));
  } else {
    return c.text('Not found', 404);
  }
});

// Handler for the /todo/:id/edit route
app.get('/todo/:id/edit', (c) => {
  const id = +c.req.param('id');
  const todo = findTodoById(id);
  if (todo) {
    return c.html(render(TodoItem({ todo, edit: true })));
  } else {
    return c.text('Not found', 404);
  }
});

// Function to handle adding a new todo
app.post('/todo', async (c) => {
    const data = await c.req.parseBody();
    const newTodo: Todo = {
      id: Date.now(),
      task: data.task?.toString() || '',
      done: false,
    };
    todos.push(newTodo);
    return c.html(render(TodoItem({ todo: newTodo })));
  });
  
  // Function to handle updating a todo
  app.patch('/todos/:id', async (c) => {
    const id = +c.req.param('id');
    const todoToUpdate = findTodoById(id);
    if (todoToUpdate) {
      const data = await c.req.parseBody();
      todoToUpdate.task = data.task?.toString() ?? todoToUpdate.task;
      todoToUpdate.done = data.done === 'on';
      return c.html(render(TodoItem({ todo: todoToUpdate })));
    } else {
      return c.text('Not found', 404);
    }
  });
  
  // Function to handle deleting a todo
  app.delete('/todo/:id', (c) => {
    const id = +c.req.param('id');
    const todoIndex = todos.findIndex(todo => todo.id === id);
    if (todoIndex !== -1) {
      todos.splice(todoIndex, 1);
      return c.text('', 204); // No content response
    } else {
      return c.text('Not found', 404);
    }
  });

const bunServeConfig: Serve = {
    port: process.env.PORT || 8080, 
    fetch: app.fetch, 
};

export default bunServeConfig;