"use server"
import { z } from 'zod';

import { revalidatePath } from 'next/cache';
import Course from '@/models/Course';

const courseSchema = z.object({
    courseName: z.string().min(2).max(50),
    coursePrice: z.coerce.number().min(1),
    description: z.string().min(10).max(100)
})

export async function createCourse(formData: FormData) {
    const { courseName, coursePrice, description } = courseSchema.parse({
        courseName: formData.get('courseName'),
        coursePrice: formData.get('coursePrice'),
        description: formData.get('description'),
    });
    console.log(courseName);
    console.log(coursePrice);
    console.log(description);

    try {
        const newCourse = new Course()
        newCourse.courseName = courseName
        newCourse.coursePrice = coursePrice
        newCourse.description = description

        await newCourse.save()
        console.log(newCourse._id);
        revalidatePath('/courses')
        return JSON.stringify({ message: "Course created successfully!", courseId: newCourse._id })
    } catch (error) {
        console.log(error);
        return {message: 'error creating course'};        
    }
}