
/** @jsx h */
import { h } from 'preact';
import { fakeUsersDb } from '../../services/authentication.service';
interface Values {
    email: string;
    password: string;
}

const Login = () => {

    const numOfUsers = fakeUsersDb.length;
    const randomUserIndex = Math.floor(Math.random() * numOfUsers);

    return (
        <section class="bg-gray-50 dark:bg-gray-900">
            <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>
                        <form id="login-form" class="space-y-4 md:space-y-6" hx-post="/login" hx-target="#login-message" hx-swap="innerHTML">
                            <div className='text-left'>
                                <label htmlFor="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input type="email" name="email" placeholder={fakeUsersDb[randomUserIndex].email} required hc-invalid-target="#email-error" hc-invalid-class="invalid:border-red-500 invalid:text-red-600" hc-invalid-events="blur"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    />
                                <p id="email-error" className='text-red-600 text-sm'></p>
                            </div>
                            <div className='text-left'>
                                <label htmlFor="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" name="password" placeholder="••••••••" required hc-invalid-target="#password-error" hc-invalid-class="invalid:border-red-500 invalid:text-red-600" hc-invalid-events="blur keyup"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    />
                                     <p id="password-error" className='text-red-600 text-sm'></p>
                            </div>
                            <div class="flex items-center justify-between">
                                <div class="flex items-start">
                                    <div class="flex items-center h-5">
                                        <input id="remember" name="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"/>
                                    </div>
                                    <div class="ml-3 text-sm">
                                        <label htmlFor="remember" class="text-gray-500 dark:text-gray-300">Remember me</label>
                                    </div>
                                </div>
                                <a href="#" class="text-sm font-medium text-primary-600 hover:underline dark:text-white opacity-5" disabled hx-on:click="comingSoon(event, 'Forgot password coming soon!')">Forgot password?</a>
                            </div>
                            <button type="submit" hc-req:disabled class="disabled:opacity-10 bg-blue-700 w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                <span hc-request-loading-hide="#login-form">Sign In</span>
                                <span hc-request-loading-show="#login-form">Loading&hellip;</span>
                            </button>
                            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet? <a href="#" class="font-medium text-primary-600 hover:underline dark:text-primary-500 opacity-5" disabled hx-on:click="comingSoon(event, 'Sign up coming soon!')">Sign up</a>
                            </p>
                            <p id="login-message" class="text-red-600 text-sm"></p>
                        </form>
                    </div>
                </div>
            </div>
            <script>
                {
                // This is less than ideal and wouldn't recommend it in a real-world app
                `${function comingSoon(event: Event, text: string) {
                    alert(text);
                    event.preventDefault();
                }}`
                }
            </script>
        </section>
    );
};

export default Login;