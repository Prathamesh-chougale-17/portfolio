import { Suspense } from "react";
import { ThoughtSection } from "@/components/contact/thought-section";
import { ContactImage } from "@/components/contact/contact-image";
import { ContactForm } from "@/components/contact/contact-form";

export default function ContactPage() {
  return (
    <div className="py-12">
      {/* Section 1: Thought and Social Links */}
      <ThoughtSection />

      {/* Section 2: Image and Contact Form */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <ContactImage />

        <Suspense
          fallback={
            <div className="h-[400px] animate-pulse bg-muted rounded-lg"></div>
          }
        >
          <ContactForm />
        </Suspense>
      </section>
    </div>
  );
}
