"use client";

import { useState } from "react";
// import { LayoutGroup, motion } from "framer-motion";
import SectionBorder from "@/components/SectionBorder";
import SectionContent from "@/components/SectionContent";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/Button";

const images = [
  { id: 1, src: "/images/image1.png", alt: "Image 1", name: "Ghibli" },
  { id: 2, src: "/images/image2.png", alt: "Image 2", name: "Realistic" },
  { id: 3, src: "/images/image3.png", alt: "Image 3", name: "Van Gogh" },
 
];

export default function ImageSwitcherSection() {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <section id="image-switcher">
      <div className="container">
        <SectionBorder borderTop>
          <SectionContent>
            <h2 className="text-3xl text-center -mt-20 pb-8 md:text-4xl lg:text-5xl font-semibold text-gray-200 leading-tight">
              The Generations
            </h2>
            {/* Responsive Buttons */}
           <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 w-full mb-6">
  {images.map((img) => (
    <button
      key={img.id}
      onClick={() => setSelectedImage(img)}
      className={`w-full py-4 text-sm font-semibold transition rounded-xl ${
        selectedImage.id === img.id
          ? "bg-violet-500 text-white"
          : "bg-black border border-white text-white hover:bg-gray-900"
      }`}
    >
      {img.name}
    </button>
  ))}
</div>

            {/* Image Preview */}
            <div className="relative w-full h-[500px] py-8 bg-white rounded-xl">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                fill
                className="object-cover rounded-xl"
              />
            </div>

            {/* Start Generating Button */}
            <Link href="/gallery" passHref>
              <Button variant="secondary" className="mt-10 mx-auto block">
                <span>Check Out Gallery</span>
              </Button>
            </Link>
          </SectionContent>
        </SectionBorder>
      </div>
    </section>
  );
}
