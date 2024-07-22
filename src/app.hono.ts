import { Hono, MiddlewareHandler } from 'hono';
import {
    getCookie,
    getSignedCookie,
    setCookie,
    setSignedCookie,
    deleteCookie,
  } from 'hono/cookie'
import { serveStatic } from 'hono/bun';
import { TodoList, todos } from './templates/todo/TodoList';
import { render } from 'preact-render-to-string';
import { TodoItem } from './templates/todo/TodoItem';

import { Serve } from 'bun';
import { renderBase } from './templates/base';
import { Todo } from './models/todo.model';
import Login from './templates/login/Login.page';
import ActivitiesPage from './templates/activities/Activities.page';
import authService, { AuthenticationService } from './services/authentication.service';
import CourseActivities from './templates/activities/CourseActivities';
import { courseData } from './mock_api/course-data.mock.api';
import ActivityModal from './templates/activities/ActivityModal';
import AuthBase from './templates/authBase';

const app = new Hono();


const timeout = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const authMiddleware: MiddlewareHandler = async (c, next) => {
    const token = getCookie(c, 'token');
    const userId = getCookie(c, 'userId');
    const rememberMe = getCookie(c, 'rememberMe');
    if (token && userId) {
        const isAuthenticated = await authService.isAuthenticated(Number(userId), token, rememberMe === 'true');
        if (isAuthenticated) {
            await next();
        } else {
            return c.redirect('/login');
        }
    } else {
        return c.redirect('/login');
    }
};

app.use("/dist/*", serveStatic({ root: "./" }));

// Function to find a todo by ID
const findTodoById = (id: number) => todos.find(todo => todo.id === id);

app.get('/', authMiddleware, (c) => {
    // TODO: create an actual home page
    // return c.html(`<div>Home</div>`);
    return c.redirect('/activities');
});

app.get('/login', (c) => {
    return c.html(renderBase(Login(), 'Login'));
});

app.post('/login', async (c) => {
    const { email, password, remember } = await c.req.parseBody();
    try {
        const rememberMe = (remember as string) === 'on';
        const user = await authService.login(email as string, password as string, rememberMe);
        c.res.headers.append('Set-Cookie', `token=${authService.fakeToken}; HttpOnly; Path=/`);
        c.res.headers.append('Set-Cookie', `userId=${user.id}; HttpOnly; Path=/`);
        c.res.headers.append('Set-Cookie', `rememberMe=${rememberMe}; HttpOnly; Path=/`);
        await timeout(500);
        return c.html(`<meta http-equiv="refresh" content="0;URL='/'">`);
    } catch (err) {
        return c.html(`<p>${err}</p>`);
    }
});

app.post('/signout', async (c) => {
    deleteCookie(c, 'token');
    deleteCookie(c, 'userId');
    await timeout(400);
    return c.html(`<meta http-equiv="refresh" content="0;URL='/'">`);
});

app.get('/activities', authMiddleware, (c) => {
    return c.html(renderBase(ActivitiesPage(), 'Activities'));
});

app.get('/activities/courses', authMiddleware, (c) => {
    return c.html(render(CourseActivities({ title: 'Courses', courseData })));
});

app.get('/activities/courses/:id', authMiddleware, (c) => {
    const id = +c.req.param('id');
    const activity = courseData.activities.find(activity => activity.id === id);
    if (activity) {
        return c.html(render(ActivityModal({ activity })));
    } else {
        return c.text('Not found', 404);
    }
});

app.get('/todo', authMiddleware, (c) => {
    return c.html(renderBase(AuthBase(TodoList(), "/todo"), 'Todo List'));
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
      await timeout(500);
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
      // empty response
      return new Response();
    } else {
      return c.text('Not found', 404);
    }
  });

const bunServeConfig: Serve = {
    port: process.env.PORT || 8080, 
    fetch: app.fetch, 
};

export default bunServeConfig;