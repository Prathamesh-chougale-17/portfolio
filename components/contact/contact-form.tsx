"use client";
import { ContactFormState, submitContactForm } from "@/actions/contact";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { en } from "@/data/en";
import { useActionState } from "@/hooks/useActionHooks";
const initialState: ContactFormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    submitContactForm,
    initialState,
  );
  return (
    <Card className="animate-fade-in-right">
      <CardContent className="pt-6">
        <h2 className="text-2xl font-bold mb-6">{en.contact.form.title}</h2>

        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              {en.contact.form.name.label}
            </label>
            <Input
              id="name"
              name="name"
              placeholder={en.contact.form.name.placeholder}
              className="w-full"
              disabled={isPending || state.success}
            />
            {state.errors?.name && (
              <p className="text-sm text-destructive">{state.errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              {en.contact.form.email.label}
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder={en.contact.form.email.placeholder}
              className="w-full"
              disabled={isPending || state.success}
            />
            {state.errors?.email && (
              <p className="text-sm text-destructive">{state.errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="subject" className="text-sm font-medium">
              {en.contact.form.subject?.label || "Subject"}
            </label>
            <Input
              id="subject"
              name="subject"
              placeholder={
                en.contact.form.subject?.placeholder || "Enter message subject"
              }
              className="w-full"
              disabled={isPending || state.success}
            />
            {state.errors?.subject && (
              <p className="text-sm text-destructive">{state.errors.subject}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium">
              {en.contact.form.message.label}
            </label>
            <Textarea
              id="message"
              name="message"
              placeholder={en.contact.form.message.placeholder}
              rows={4}
              className="w-full"
              disabled={isPending || state.success}
            />
            {state.errors?.message && (
              <p className="text-sm text-destructive">{state.errors.message}</p>
            )}
          </div>

          {state.errors?._form && (
            <div className="p-3 bg-destructive/20 border border-destructive text-destructive rounded">
              <p>{state.errors._form}</p>
            </div>
          )}

          {state.success && (
            <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded animate-fade-in dark:bg-green-900 dark:text-green-300 dark:border-green-700">
              <p>{en.contact.form.success}</p>
            </div>
          )}

          <Button
            type="submit"
            disabled={isPending || state.success}
            className="w-full cursor-pointer"
          >
            {isPending ? "Sending..." : en.contact.form.submit}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
