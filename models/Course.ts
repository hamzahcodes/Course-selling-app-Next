import mongoose, { Model } from "mongoose";

export interface CourseInterface {
  courseName: string;
  coursePrice: number;
  description: string;
}

const courseSchema = new mongoose.Schema<CourseInterface>({
    courseName: {
        type: String,
        required: true,
    },
    coursePrice: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true
    }
});

const Course: Model<CourseInterface> = mongoose.models?.Course || mongoose.model("Course", courseSchema);

export default Course;