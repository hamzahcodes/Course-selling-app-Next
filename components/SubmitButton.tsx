import React from "react";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

export default function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button {...(pending && { disabled: true })}>
      {pending ? "Adding..." : "Add Course"}
    </Button>
  );
}