import React from "react";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";


export default function SubmitButton(props: any) {
  const { pending } = useFormStatus();
  return (
    <Button {...(pending && { disabled: true })}>
      {pending ? (props.type === "edit" ? "Updating..." : "Adding...") : (props.type === "edit" ? "Update Course" : "Add Course")}
    </Button>
  );
}