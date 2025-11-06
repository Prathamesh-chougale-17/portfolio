"use client";

import Image from "next/image";
import { useLocale } from "@/context/locale-provider";

export function ContactImage() {
  const { t } = useLocale();

  return (
    <div className="relative h-[500px] animate-fade-in-left overflow-hidden rounded-lg shadow-lg">
      <Image
        alt={t.contact.imageAlt}
        className="object-cover transition-transform duration-700 hover:scale-105"
        fill
        priority
        src={t.contact.imageUrl || "/placeholder.svg"}
        unoptimized // Add this line for GIFs
      />
    </div>
  );
}
