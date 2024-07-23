/** @jsx h */
import { h, Fragment } from 'preact';
import { Activity } from '../../models/courses.model';

const CourseActivityItem = ({ activity } : { activity: Activity }) => {


    return (
        <li className="py-3 sm:py-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer" hx-get={`/activities/courses/${activity.id}`} hx-swap="innerHTML" hx-target="#activity-modal">
            <div className="flex items-center">
                <div className="flex-shrink-0">
                    <img
                        className="w-8 h-8 rounded-full"
                        src={activity.badge_image}
                        alt={activity.name}
                    />
                </div>
                <div className="flex-1 min-w-0 ms-4">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {activity.name}
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        {activity.description}
                    </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    {activity.mark_total} points
                </div>
            </div>
        </li>
    )
};

export const CourseActivityItems = ({ activities } : { activities: Activity[] }) => {
    return (
        <Fragment>
            {
                activities.length > 0 ?
                activities.map((activity: Activity) => (
                    <CourseActivityItem activity={activity} />
                )) :
                <li class="text-center dark:text-white">No results found</li>    
            }
        </Fragment>
    );
};

export default CourseActivityItem;