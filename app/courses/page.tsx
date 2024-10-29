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

// const courses = [
//   {
//     id: "1",
//     courseName: "Next JS Mastery",
//     coursePrice: 200,
//     description: "Best in the Game!"
//   }
// ]

export default async function Courses() {
  const courses = await Course.find();

  return (
    <Table>
      {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>Description</TableHead>
          {/* <TableHead>Method</TableHead> */}
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {courses.map((course) => (
          <TableRow key={course._id.toString()}>
            <TableCell className="font-medium">{course.courseName}</TableCell>
            <TableCell>{course.description}</TableCell>
            {/* <TableCell>{course.paymentMethod}</TableCell> */}
            <TableCell className="text-right">{course.coursePrice}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
