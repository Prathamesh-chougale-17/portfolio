"use client";

import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { en } from "@/data/en";
import { trpc } from "@/server/client";

export function ContactForm() {
  const contactMutation = trpc.contact.submit.useMutation({
    onSuccess: (data) => {
      toast.success(data.message || "Message sent successfully!");
      form.reset();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to send message. Please try again.");
    },
  });

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
    onSubmit: async ({ value }) => {
      await contactMutation.mutateAsync(value);
    },
  });

  const isPending = contactMutation.isPending;

  return (
    <Card className="animate-fade-in-right">
      <CardContent className="pt-6">
        <h2 className="mb-6 font-bold text-2xl">{en.contact.form.title}</h2>

        <form
          className="space-y-4"
          id="contact-form-tanstack"
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <form.Field
            name="name"
            validators={{
              onChange: ({ value }) => {
                const result = z
                  .string()
                  .min(2, { message: "Name must be at least 2 characters" })
                  .safeParse(value);
                return result.success
                  ? undefined
                  : result.error.issues[0].message;
              },
            }}
          >
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched &&
                field.state.meta.errors.length > 0;
              return (
                <div className="space-y-2">
                  <label className="font-medium text-sm" htmlFor="name">
                    {en.contact.form.name.label}
                  </label>
                  <Input
                    aria-invalid={isInvalid}
                    className="w-full"
                    disabled={isPending}
                    id="name"
                    name={field.name}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder={en.contact.form.name.placeholder}
                    value={field.state.value}
                  />
                  {isInvalid && (
                    <p className="text-destructive text-sm">
                      {field.state.meta.errors.join(", ")}
                    </p>
                  )}
                </div>
              );
            }}
          </form.Field>

          <form.Field
            name="email"
            validators={{
              onChange: ({ value }) => {
                const result = z
                  .string()
                  .email({ message: "Please enter a valid email address" })
                  .safeParse(value);
                return result.success
                  ? undefined
                  : result.error.issues[0].message;
              },
            }}
          >
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched &&
                field.state.meta.errors.length > 0;
              return (
                <div className="space-y-2">
                  <label className="font-medium text-sm" htmlFor="email">
                    {en.contact.form.email.label}
                  </label>
                  <Input
                    aria-invalid={isInvalid}
                    className="w-full"
                    disabled={isPending}
                    id="email"
                    name={field.name}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder={en.contact.form.email.placeholder}
                    type="email"
                    value={field.state.value}
                  />
                  {isInvalid && (
                    <p className="text-destructive text-sm">
                      {field.state.meta.errors.join(", ")}
                    </p>
                  )}
                </div>
              );
            }}
          </form.Field>

          <form.Field
            name="subject"
            validators={{
              onChange: ({ value }) => {
                const result = z
                  .string()
                  .min(5, { message: "Subject must be at least 5 characters" })
                  .safeParse(value);
                return result.success
                  ? undefined
                  : result.error.issues[0].message;
              },
            }}
          >
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched &&
                field.state.meta.errors.length > 0;
              return (
                <div className="space-y-2">
                  <label className="font-medium text-sm" htmlFor="subject">
                    {en.contact.form.subject?.label || "Subject"}
                  </label>
                  <Input
                    aria-invalid={isInvalid}
                    className="w-full"
                    disabled={isPending}
                    id="subject"
                    name={field.name}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder={
                      en.contact.form.subject?.placeholder ||
                      "Enter message subject"
                    }
                    value={field.state.value}
                  />
                  {isInvalid && (
                    <p className="text-destructive text-sm">
                      {field.state.meta.errors.join(", ")}
                    </p>
                  )}
                </div>
              );
            }}
          </form.Field>

          <form.Field
            name="message"
            validators={{
              onChange: ({ value }) => {
                const result = z
                  .string()
                  .min(10, {
                    message: "Message must be at least 10 characters",
                  })
                  .safeParse(value);
                return result.success
                  ? undefined
                  : result.error.issues[0].message;
              },
            }}
          >
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched &&
                field.state.meta.errors.length > 0;
              return (
                <div className="space-y-2">
                  <label className="font-medium text-sm" htmlFor="message">
                    {en.contact.form.message.label}
                  </label>
                  <Textarea
                    aria-invalid={isInvalid}
                    className="w-full"
                    disabled={isPending}
                    id="message"
                    name={field.name}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder={en.contact.form.message.placeholder}
                    rows={4}
                    value={field.state.value}
                  />
                  {isInvalid && (
                    <p className="text-destructive text-sm">
                      {field.state.meta.errors.join(", ")}
                    </p>
                  )}
                </div>
              );
            }}
          </form.Field>

          <Button
            className="w-full cursor-pointer"
            disabled={isPending}
            type="submit"
          >
            {isPending ? "Sending..." : en.contact.form.submit}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
