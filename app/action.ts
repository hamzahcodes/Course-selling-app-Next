"use server"

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect, RedirectType } from "next/navigation";
import Course from '@/models/Course';

const courseSchema = z.object({
    courseName: z.string().min(2).max(50),
    coursePrice: z.coerce.number().min(1),
    description: z.string().min(10).max(100)
})
const editCourseSchema = z.object({
    courseId: z.string().min(2),
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

    try {
        const newCourse = new Course()
        newCourse.courseName = courseName
        newCourse.coursePrice = coursePrice
        newCourse.description = description

        await newCourse.save()
        console.log(newCourse._id);
        revalidatePath('/courses')
    } catch (error) {
        console.log(error);
        return {message: 'error creating course'};        
    }
    redirect('/courses', RedirectType.replace)
}

export async function deleteCourse(id: FormData) {
    const courseId = id.get("id")
    try {
        await Course.findByIdAndDelete(courseId)
        revalidatePath('/courses')
        return { message: 'Course Deleted' }
    } catch (error) {
        return { message: "Error while deleting course"}
    }
}

export async function updateCourse(formData: FormData) {
    const { courseId, courseName, coursePrice, description } = editCourseSchema.parse({
        courseId: formData.get('courseId'),
        courseName: formData.get('courseName'),
        coursePrice: formData.get('coursePrice'),
        description: formData.get('description'),
    });

    try {
        const courseExists = await Course.findById(courseId)
        if(courseExists) {
            courseExists.courseName = courseName
            courseExists.coursePrice = coursePrice
            courseExists.description = description
            await courseExists.save()
            revalidatePath('/courses')
        }
    } catch (error) {
        console.log(error);
        return {message: 'error updating course'}; 
    }
    redirect('/courses', RedirectType.replace)
}