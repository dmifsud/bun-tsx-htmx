/** @jsx h */
import { h } from 'preact';
import { Activity, CourseActivitiesResponse } from '../../models/courses.model';
import CourseActivityItem from './CourseActivityItem';

const CourseActivities = ({
    title,
    fullWidth,
    courseData
}: {
    title: string;
    fullWidth?: boolean;
    courseData?: CourseActivitiesResponse;
}) => {

    return (
        <div>
            <div id="activity-modal"></div>
            <div
                className={`${fullWidth ? "w-full " : "w-auto "
                    }p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700`}
            >
                <div className="flex items-center justify-between mb-4 gap-4">
                    <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                        {title}
                    </h5>
                    <input id="course-search" type="search" name="search" placeholder="Search courses" 
                            hx-post="/activities/courses/search" hx-trigger="input changed delay:500ms, search" hx-target="#course-list"
                            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    />
                    {/* <a
                        href="#"
                        className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                    >
                        View all
                    </a> */}
                </div>
                <div className="flow-root">
                    <ul
                        id="course-list"
                        hc-req-ref="#course-search"
                        hc-req:class="animate-loadingAnimation"
                        role="list"
                        className="divide-y divide-gray-200 dark:divide-gray-700"
                    >
                        {courseData?.activities.map((activity: Activity) => (
                            <CourseActivityItem activity={activity} />
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CourseActivities;