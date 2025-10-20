import Image from "next/image";
import { en } from "@/data/en";

export function ContactImage() {
  return (
    <div className="relative h-[500px] rounded-lg overflow-hidden shadow-lg animate-fade-in-left">
      <Image
        src={en.contact.imageUrl || "/placeholder.svg"}
        alt={en.contact.imageAlt}
        fill
        className="object-cover hover:scale-105 transition-transform duration-700"
        priority
      />
    </div>
  );
}
