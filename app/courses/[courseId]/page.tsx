import { Button } from "@/components/ui/button"

export default function Course({ params }: { params: { courseId: string }}) {
    const courseId = params.courseId
  
    return (
    <>
      <h1 className="text-3xl font-bold underline">
        {courseId}
      </h1>
      <Button>Click me</Button>
    </>
  );
}
