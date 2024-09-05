import { MiddlewareHandler } from "hono";
import { getCookie } from "hono/cookie";
import authService from "../services/authentication.service";

export const authMiddleware: MiddlewareHandler = async (c, next) => {
    const token = getCookie(c, 'token');
    const userId = getCookie(c, 'userId');
    const rememberMe = getCookie(c, 'rememberMe');
    if (token && userId) {
        console.log('checking authentication using userId', userId);
        const isAuthenticated = await authService.isAuthenticated(userId, token, rememberMe === 'true');
        if (isAuthenticated) {
            const loggedInUser = await authService.getLoggedInUser();
            c.set('loggedInUser', loggedInUser);
            await next();
        } else {
            return c.redirect('/login');
        }
    } else {
        return c.redirect('/login');
    }
};