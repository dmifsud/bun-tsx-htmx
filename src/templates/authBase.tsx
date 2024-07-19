/** @jsx h */
import { h, Fragment } from 'preact';
import { User } from '../models/users.model';
import authService from '../services/authentication.service';

const AuthBase = (children: h.JSX.Element, activeLink: string) => {
    const user = authService.getLoggedInUser()!;
    const selectedLinkClasses = "block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
    const defaultLinkClasses = "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700";
    const linkClass = (refName: string) => {
        return refName === activeLink ? selectedLinkClasses : defaultLinkClasses;
    };
    
    return (
        <div>
            <nav className="bg-white dark:bg-gray-900 sticky w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <h1 className="text-2xl font-semibold whitespace-nowrap dark:text-white"><span class="rounded-full bg-blue-700 p-2" title={`${user.name} ${user.surname}`}>{user.name[0]+user.surname[0]}</span> {user.name} {user.surname}</h1>
            <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button id="signout-button" type="button" hx-post="/signout" class="disabled:opacity-15 bg-blue-700 w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                <span hc-request-loading-hide="#signout-button">Sign Out</span>
                <span hc-request-loading-show="#signout-button">Loading...</span>
            </button>
            <p id="signout-message"></p>
                {/* <LitButtonReact text={loading ? "Singing out..." : "Sign Out"} disabled={loading} onClick={actions.logout} /> */}
            </div>
            <div
                className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
                id="navbar-sticky"
            >
                <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                    <a
                    href="/activities"
                    class={linkClass("/activities")}
                    >
                    Courses
                    </a>
                </li>
                <li>
                    <a
                    href="#"
                    disabled
                    className={defaultLinkClasses}
                    >
                    About
                    </a>
                </li>
                <li>
                    <a
                    href="#"
                    disabled
                    class={defaultLinkClasses}
                    >
                    Services
                    </a>
                </li>
                <li>  
                    <a
                    href="/todo"
                    class={linkClass("/todo")}
                    >
                    Todo (Demo)
                    </a>
                </li>
                </ul>
            </div>
            </div>
        </nav>
        <div>
            {children}
        </div>
    </div>  
    )
}

export default AuthBase;