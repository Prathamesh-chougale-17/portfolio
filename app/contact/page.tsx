import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactForm } from "@/components/contact/contact-form";
import { ContactImage } from "@/components/contact/contact-image";
import { ThoughtSection } from "@/components/contact/thought-section";
import { OG_IMAGE, SITE_URL } from "@/lib/constant";

export const metadata: Metadata = {
  title: "Contact Me",
  description:
    "Get in touch with Prathamesh Chougale. Open to full-stack development opportunities, collaborations, and tech discussions. Reach out via email, LinkedIn, or GitHub.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Prathamesh Chougale | Let's Connect",
    description:
      "Open to full-stack development opportunities and collaborations. Connect via email, LinkedIn, or GitHub.",
    url: `${SITE_URL}/contact`,
    siteName: "Prathamesh Chougale",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Contact Prathamesh Chougale",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Prathamesh Chougale | Let's Connect",
    description:
      "Open to full-stack development opportunities and collaborations.",
    images: [OG_IMAGE],
  },
};

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
