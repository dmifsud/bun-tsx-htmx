/** @jsx h */
import { h, Fragment } from 'preact';
import { Activity } from '../../models/courses.model';
import CourseActivity from './CourseActivity';

const ActivityModal = ({ activity } : { activity: Activity }) => {
    return (
        <div
            id="small-modal"
            tabIndex={-1}
            hx-on:click="event.target === this && this.remove()"
            className="flex justify-center items-center fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full bg-gray-500 bg-opacity-40"
            >
                <div className="relative w-full max-w-md max-h-full">
                    <CourseActivity activity={activity} />
                </div>
            </div>
    )
};

export default ActivityModal;