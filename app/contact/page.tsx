import { Suspense } from "react";
import { ContactForm } from "@/components/contact/contact-form";
import { ContactImage } from "@/components/contact/contact-image";
import { ThoughtSection } from "@/components/contact/thought-section";

export default function ContactPage() {
  return (
    <div className="py-12">
      {/* Section 1: Thought and Social Links */}
      <ThoughtSection />

      {/* Section 2: Image and Contact Form */}
      <section className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
        <ContactImage />

        <Suspense
          fallback={
            <div className="h-[400px] animate-pulse rounded-lg bg-muted" />
          }
        >
          <ContactForm />
        </Suspense>
      </section>
    </div>
  );
}
