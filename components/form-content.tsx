import { Send } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

export function FormContent() {
  const { pending } = useFormStatus();
  return (
    <>
      <Textarea
        disabled={pending}
        minLength={4}
        name="quiz"
        required
        placeholder="Write some text"
      />
      <Button type="submit" size="icon" className="min-w-10">
        <Send className='h-5 w-5' />
        <span className='sr-only'>Submit Text</span>
      </Button>
    </>
  )
}