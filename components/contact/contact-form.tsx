"use client";

import { z } from "zod";
import { useForm } from "@tanstack/react-form";

import type { ContactFormState } from "@/actions/contact";
import { submitContactForm } from "@/actions/contact";
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

const clientFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z
    .string()
    .min(5, { message: "Subject must be at least 5 characters" }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters" }),
});

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    submitContactForm,
    initialState,
  );

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
    validators: {
      onSubmit: clientFormSchema,
      // You can also enable onBlur/onChange validation if desired:
      // onBlur: clientFormSchema,
      // onChange: clientFormSchema,
    },
    onSubmit: async ({ value }) => {
      // Build FormData to send to the server action (preserves server-side behavior)
      const formData = new FormData();
      formData.append("name", value.name);
      formData.append("email", value.email);
      formData.append("subject", value.subject);
      formData.append("message", value.message);

      // Call the bound server action via the useActionState hook
      await formAction(formData);
    },
  });

  return (
    <Card className="animate-fade-in-right">
      <CardContent className="pt-6">
        <h2 className="text-2xl font-bold mb-6">{en.contact.form.title}</h2>

        <form
          id="contact-form-tanstack"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="space-y-4"
          noValidate
        >
          <form.Field name="name">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    {en.contact.form.name.label}
                  </label>
                  <Input
                    id="name"
                    name={field.name}
                    placeholder={en.contact.form.name.placeholder}
                    className="w-full"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    disabled={isPending || state.success}
                  />
                  {/* Client-side validation errors */}
                  {isInvalid && field.state.meta.errors?.length ? (
                    <p className="text-sm text-destructive">
                      {field.state.meta.errors.join(", ")}
                    </p>
                  ) : null}
                  {/* Server-side errors returned from action */}
                  {state.errors?.name && (
                    <p className="text-sm text-destructive">
                      {Array.isArray(state.errors.name)
                        ? state.errors.name.join(", ")
                        : state.errors.name}
                    </p>
                  )}
                </div>
              );
            }}
          </form.Field>

          <form.Field name="email">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    {en.contact.form.email.label}
                  </label>
                  <Input
                    id="email"
                    name={field.name}
                    type="email"
                    placeholder={en.contact.form.email.placeholder}
                    className="w-full"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    disabled={isPending || state.success}
                  />
                  {isInvalid && field.state.meta.errors?.length ? (
                    <p className="text-sm text-destructive">
                      {field.state.meta.errors.join(", ")}
                    </p>
                  ) : null}
                  {state.errors?.email && (
                    <p className="text-sm text-destructive">
                      {Array.isArray(state.errors.email)
                        ? state.errors.email.join(", ")
                        : state.errors.email}
                    </p>
                  )}
                </div>
              );
            }}
          </form.Field>

          <form.Field name="subject">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    {en.contact.form.subject?.label || "Subject"}
                  </label>
                  <Input
                    id="subject"
                    name={field.name}
                    placeholder={
                      en.contact.form.subject?.placeholder ||
                      "Enter message subject"
                    }
                    className="w-full"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    disabled={isPending || state.success}
                  />
                  {isInvalid && field.state.meta.errors?.length ? (
                    <p className="text-sm text-destructive">
                      {field.state.meta.errors.join(", ")}
                    </p>
                  ) : null}
                  {state.errors?.subject && (
                    <p className="text-sm text-destructive">
                      {Array.isArray(state.errors.subject)
                        ? state.errors.subject.join(", ")
                        : state.errors.subject}
                    </p>
                  )}
                </div>
              );
            }}
          </form.Field>

          <form.Field name="message">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    {en.contact.form.message.label}
                  </label>
                  <Textarea
                    id="message"
                    name={field.name}
                    placeholder={en.contact.form.message.placeholder}
                    rows={4}
                    className="w-full"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    disabled={isPending || state.success}
                  />
                  {isInvalid && field.state.meta.errors?.length ? (
                    <p className="text-sm text-destructive">
                      {field.state.meta.errors.join(", ")}
                    </p>
                  ) : null}
                  {state.errors?.message && (
                    <p className="text-sm text-destructive">
                      {Array.isArray(state.errors.message)
                        ? state.errors.message.join(", ")
                        : state.errors.message}
                    </p>
                  )}
                </div>
              );
            }}
          </form.Field>

          {state.errors?._form && (
            <div className="p-3 bg-destructive/20 border border-destructive text-destructive rounded">
              <p>
                {Array.isArray(state.errors._form)
                  ? state.errors._form[0]
                  : state.errors._form}
              </p>
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
