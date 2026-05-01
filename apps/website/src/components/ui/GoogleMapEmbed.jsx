"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import Image from "next/image";

const MAP_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3548.2462724676166!2d78.00276847614923!3d27.211416747188895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3974776a3f3b61d9%3A0xc26cc82e5a39a7fc!2sSkillyards%20Versatility%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1774862128520!5m2!1sen!2sin";

export function GoogleMapEmbed({
  previewImageSrc = "/images/Map.webp",
  previewImageAlt = "Skillyards location map",
}) {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <iframe
        title="SkillYards Location"
        src={MAP_SRC}
        className="absolute inset-0 w-full h-full border-0 filter dark:brightness-90 dark:contrast-125 dark:saturate-50 transition-all duration-700"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        aria-label="SkillYards Versatility Pvt. Ltd."
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setLoaded(true)}
      className="absolute inset-0 w-full h-full group"
      aria-label="Click to view map"
    >
      <Image
        src={previewImageSrc}
        alt={previewImageAlt}
        fill
        className="object-cover dark:brightness-90 dark:contrast-125 dark:saturate-50"
        sizes="(max-width: 768px) 100vw, 800px"
      />
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold shadow-lg group-hover:opacity-90 transition">
          <MapPin className="w-4 h-4" />
          Click to View Map
        </div>
      </div>
    </button>
  );
}
