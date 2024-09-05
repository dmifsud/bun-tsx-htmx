import { Hono } from 'hono';
import {
    getCookie,
    getSignedCookie,
    setCookie,
    setSignedCookie,
    deleteCookie,
  } from 'hono/cookie'
import { serveStatic } from 'hono/bun';
import { render } from 'preact-render-to-string';

import { Serve } from 'bun';
import { renderBase } from './templates/base';
import Login from './templates/login/Login.page';
import ActivitiesPage from './templates/activities/Activities.page';
import authService from './services/authentication.service';
import CourseActivities from './templates/activities/CourseActivities';
import { courseData } from './mock_api/course-data.mock.api';
import ActivityModal from './templates/activities/ActivityModal';
import { CourseActivityItems } from './templates/activities/CourseActivityItem';
import { OnlineLearningDB } from './db';
import { authMiddleware } from './middleware/auth.middleware';
import todoRoutes from './routes/todo.routes';


const app = new Hono();

const db = new OnlineLearningDB();
await db.connect();

// SET ROUTES
app.route('/todo', todoRoutes);


const timeout = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

app.use("/dist/*", serveStatic({ root: "./" }));


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
        console.log('user found', user);
        if (user) {
          c.res.headers.append('Set-Cookie', `token=${authService.fakeToken}; HttpOnly; Path=/`);
          c.res.headers.append('Set-Cookie', `userId=${user._id.toString()}; HttpOnly; Path=/`);
          c.res.headers.append('Set-Cookie', `rememberMe=${rememberMe}; HttpOnly; Path=/`);
        } else {
          return c.html(`<p>User ${email} not found</p>`);
        }
        await timeout(500); // NOTE: for simulation purposes only
        c.res.headers.append('HX-Redirect', '/');
        return c.html('');
    } catch (err) {
        return c.html(`<p>${err}</p>`);
    }
});

app.post('/signout', async (c) => {
    deleteCookie(c, 'token');
    deleteCookie(c, 'userId');
    await timeout(400);
    c.res.headers.append('HX-Refresh', 'true');
    return c.html('');
});

app.get('/activities', authMiddleware, async (c) => {
    return c.html(renderBase(await ActivitiesPage(), 'Activities'));
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

app.post('/activities/courses/search', authMiddleware, async (c) => {
    const data = await c.req.parseBody();
    const search = data.search?.toString() || '';
    const filteredActivities = courseData.activities.filter(activity => activity.name.toLowerCase().includes(search.toLowerCase()));
    await timeout(1000);
    return c.html(render(CourseActivityItems({ activities: filteredActivities })));
});


const bunServeConfig: Serve = {
    port: process.env.PORT || 8080, 
    fetch: app.fetch, 
};

export default bunServeConfig;