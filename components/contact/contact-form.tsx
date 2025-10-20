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
          <form.Field
            name="name"
            validators={{
              onChange: z.string().min(2, { message: "Name must be at least 2 characters" }),
            }}
          >
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && field.state.meta.errors.length > 0;
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
                    disabled={isPending}
                  />
                  {isInvalid && (
                    <p className="text-sm text-destructive">
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
              onChange: z.string().email({ message: "Please enter a valid email address" }),
            }}
          >
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && field.state.meta.errors.length > 0;
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
                    disabled={isPending}
                  />
                  {isInvalid && (
                    <p className="text-sm text-destructive">
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
              onChange: z.string().min(5, { message: "Subject must be at least 5 characters" }),
            }}
          >
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && field.state.meta.errors.length > 0;
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
                    disabled={isPending}
                  />
                  {isInvalid && (
                    <p className="text-sm text-destructive">
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
              onChange: z.string().min(10, { message: "Message must be at least 10 characters" }),
            }}
          >
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && field.state.meta.errors.length > 0;
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
                    disabled={isPending}
                  />
                  {isInvalid && (
                    <p className="text-sm text-destructive">
                      {field.state.meta.errors.join(", ")}
                    </p>
                  )}
                </div>
              );
            }}
          </form.Field>

          <Button
            type="submit"
            disabled={isPending}
            className="w-full cursor-pointer"
          >
            {isPending ? "Sending..." : en.contact.form.submit}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
