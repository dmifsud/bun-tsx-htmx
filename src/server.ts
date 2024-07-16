import { render } from "preact-render-to-string";
import { renderBase } from "./templates/base";
import { TodoItem } from "./templates/todo/TodoItem";
import { TodoList, todos } from "./templates/todo/TodoList";

Bun.serve({
  port: 3000,
  async fetch(req) {
    const url = new URL(req.url);

    // static files
    if (url.pathname.startsWith("/dist")) {
      const file = Bun.file('.' + url.pathname);
      return new Response(file);
    }

    if (req.method === "GET") {
      if (url.pathname.startsWith("/todo")) {

        if (url.pathname.endsWith("/edit")) {
          console.log(url.pathname);
          const id = +url.pathname.replace("/todo/", "").replace("/edit", "");
          const todo = todos.find(todo => todo.id === id);
          if (todo) {
            return new Response(render(TodoItem({ todo, edit: true })), {
              headers: { "Content-Type": "text/html" },
            });
          } else {
            return new Response('Not found', { status: 404 });
          }
        } else {
          const id = +url.pathname.replace("/todo/", "");
          const todo = todos.find(todo => todo.id === id);
          if (todo) {
            return new Response(render(TodoItem({ todo })), {
              headers: { "Content-Type": "text/html" },
            });
          } else {
            return new Response('Not found', { status: 404 });
          }
        }
      }
    }

    // 
    if (req.method === "POST") {
      if (url.pathname === "/add") {
        const data = await req.formData();
        const newTodo = {
          id: Date.now(),
          task: data.get('task')?.toString() || '',
          done: false
        };
        todos.push(newTodo);
        return new Response(render(TodoItem({ todo: newTodo })), {
          headers: { "Content-Type": "text/html" },
        });
      }
    }

    if (req.method === "PATCH") {
      if (url.pathname.startsWith("/todos")) {
        const id = +url.pathname.replace("/todos/", "");
        const todoToUpdate = todos.find(todo => todo.id === id);
        if (todoToUpdate) {
          const data = await req.formData();
          todoToUpdate.task = data.get('task')?.toString() ?? todoToUpdate.task;
          todoToUpdate.done = data.get('done') === 'on';
          return new Response(render(TodoItem({ todo: todoToUpdate })), {
            headers: { "Content-Type": "text/html" },
          });
        } else {
          return new Response('Not found', { status: 404 });
        }
      }
    }

    if (req.method === "DELETE") {
      if (url.pathname.startsWith("/todo")) {
        const id = +url.pathname.replace("/todo/", "");
        const todoIndex = todos.findIndex(todo => todo.id === id);
        if (todoIndex !== -1) {
          todos.splice(todoIndex, 1);
          // return empty response
          return new Response();
        } else {
          return new Response('Not found', { status: 404 });
        }
      }
    }


    return new Response(renderBase(TodoList()), {
      headers: { "Content-Type": "text/html" },
    });
  },
});

console.log('Listening on localhost:3000')