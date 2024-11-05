"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import SubmitButton from "@/components/SubmitButton"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useSearchParams } from 'next/navigation';
import { updateCourse } from "../action"


const editCourseSchema = z.object({
  courseId: z.string().min(2),
  courseName: z.string().min(2).max(50),
  coursePrice: z.coerce.number().min(1),
  description: z.string().min(10).max(100)
})


export default function EditCourse() {
    const searchParams  = useSearchParams();
    const { courseId, courseName, coursePrice, description } = editCourseSchema.parse(Object.fromEntries(searchParams.entries()));
    
    const form = useForm<z.infer<typeof editCourseSchema>>({
        resolver: zodResolver(editCourseSchema),
        defaultValues: {
            courseId: courseId,
            courseName: courseName,
            coursePrice: coursePrice,
            description: description
        },
      })

  return (
    <Form {...form}>    
      <form action={updateCourse} className="space-y-8">
        <FormField
          control={form.control}
          name="courseName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course Name</FormLabel>
              <FormControl>
                <Input placeholder="Ultimate Prime" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display course name
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="coursePrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input placeholder="150$" {...field} />
              </FormControl>
              <FormDescription>
                Set a price to attract customers
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Definite Banger" {...field} />
              </FormControl>
              <FormDescription>
                Describe the course
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <input hidden type="text" name="courseId" defaultValue={courseId}/>
        <SubmitButton type={"edit"} />
      </form>
    </Form>
  )
}