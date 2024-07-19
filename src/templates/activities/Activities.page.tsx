/** @jsx h */
import { h } from 'preact';
import { Activity } from '../../models/courses.model';
import CourseActivities from './CourseActivities';
import AuthBase from '../authBase';
interface ActivitiesModalStore {
    activity: Activity | null;
    setActivityToShow: (id: number) => void;
    clearActivity: () => void;
  }
  
  

  
  const ActivitiesPage = () => {
  
    return (
      <div class="flex justify-center">
        {/* <ActivityModal /> */}
        <div class="w-[50%] p-10" hx-get="/activities/courses" hx-trigger="load">
          <span class="dark:white-text">Loading...</span>
        </div>
      </div>
    );
  };
  
  export default () => {
    return AuthBase(ActivitiesPage());
  };