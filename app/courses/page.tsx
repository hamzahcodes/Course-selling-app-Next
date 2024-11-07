import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Course from '@/models/Course';
import { deleteCourse } from "../action";
import Link from 'next/link';


export default async function Courses() {
  const courses = await Course.find();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {courses.map((course) => (
          <TableRow key={course._id.toString()}>
            <TableCell className="font-medium">{course.courseName}</TableCell>
            <TableCell>{course.description}</TableCell>
            <TableCell className="text-right">{course.coursePrice}</TableCell>
            <TableCell>
              <Link href={{ pathname: `/courses/${course._id.toString()}` }}>
                <Button>View</Button>
              </Link>
            </TableCell>
            <TableCell>
              <Link
                href={{
                  pathname: `/edit-course`,
                  query: {
                    courseId: course._id.toString(),
                    courseName: course.courseName,
                    coursePrice: course.coursePrice,
                    description: course.description
                  },
                }}
              >
                <Button>Edit</Button>
              </Link>
            </TableCell>
            <TableCell>
              <form action={deleteCourse}>
                <input hidden type="text" name="id" defaultValue={course._id.toString()}/>
                <Button>Delete</Button> 
              </form>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}