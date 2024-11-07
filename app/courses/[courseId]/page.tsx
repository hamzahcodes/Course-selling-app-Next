import { Button } from "@/components/ui/button"
import Course from "@/models/Course";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


export default async function CoursePage({ params }: { params: { courseId: string }}) {
    const courseId = params.courseId
    const course = await Course.findById(courseId)

    return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{course?.courseName}</CardTitle>
          <CardDescription>{course?.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{course?.description}</p>
        </CardContent>
        <CardFooter>
          <p>{course?.coursePrice}</p>
        </CardFooter>
      </Card>
    </>
  );
}
