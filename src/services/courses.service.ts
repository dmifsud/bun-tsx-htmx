import { courseData } from "../mock_api/course-data.mock.api";
import { CourseActivitiesResponse } from "../models/courses.model";


export class CourseService {

    static async getAllCourses(): Promise<CourseActivitiesResponse> {
        return new Promise((resolve) => {
            resolve(courseData);
        });
    }
}