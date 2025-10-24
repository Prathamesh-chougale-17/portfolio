import Image from "next/image";
import { en } from "@/data/en";

export function ContactImage() {
  return (
    <div className="relative h-[500px] animate-fade-in-left overflow-hidden rounded-lg shadow-lg">
      <Image
        alt={en.contact.imageAlt}
        className="object-cover transition-transform duration-700 hover:scale-105"
        fill
        priority
        src={en.contact.imageUrl || "/placeholder.svg"}
        unoptimized // Add this line for GIFs
      />
    </div>
  );
}
