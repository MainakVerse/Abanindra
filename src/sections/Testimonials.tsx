"use client"
import React, { useState } from "react";
import AshwinSantiago from "@/assets/images/ashwin-santiago.jpg";
import AlecWhitten from "@/assets/images/alec-whitten.jpg";
import ReneWells from "@/assets/images/rene-wells.jpg";
import MollieHall from "@/assets/images/mollie-hall.jpg";
import SectionBorder from "@/components/SectionBorder";
import SectionContent from "@/components/SectionContent";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";


export const testimonials = [
  {
    quote:
      "Ababnindra has completely transformed the way we design. The AI image generator's ability to create beautiful images have saved us hours each week. It's now an indispensable part of our workflow.",
    name: "Rudra Deka",
    title: "CTO, Lux Magazine",
    image: AshwinSantiago,
  },
  {
    quote:
      "Ababnindra integrates effortlessly with our existing image generation styles, and the AI tool feels like a natural extension of our team. The responses are impressively accurate, and it's always learning from our interactions.",
    name: "Utkarsh Chaturvedi",
    title: "CEO, Humax Synkrome",
    image: AlecWhitten,
  },
  {
    quote:
      "Ababnindra's AI has elevated our customer service to a whole new level. Its real-time responses and personalized recommendations help us address client needs faster than ever. I can't imagine our support team without it.",
    name: "Rimpi Deka",
    title: "CEO, Lux Magazine",
    image: ReneWells,
  },
  {
    quote:
      "I've never seen a tool like Ababnindra. It's intuitive, responsive, and has helped us streamline projects that would normally take days. The AI capabilities are unmatched in terms of accuracy and speed.",
    name: "Nista Chaturvedi",
    title: "Interior Designer",
    image: MollieHall,
  },
];





export const Testimonials = () => {
  const [testimonialIndex, setTestimonialIndex] = useState(0)
  return (
    <section id="testimonials">
      <div className="container">
        <SectionBorder borderTop>
          <SectionContent>
            <LayoutGroup>
            <motion.div layout className="border-gradient rounded-3xl px-6  md:px-10 lg:px-16 lg:py-24 py-16 relative flex flex-col   md:flex-row  gap-12 lg:mx-20" >
              <FontAwesomeIcon icon={faQuoteLeft} className="absolute size-20 text-violet-400 top-0 left-6 md:left-10 lg:left-16 -translate-y-1/2" />
              <AnimatePresence mode="wait" initial={false}>
                {testimonials.map((testimonial, index) =>
                  testimonialIndex === index ? (
                    <motion.blockquote key={testimonial.name}
                      initial={{ opacity: 0, y: 25 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 25 }}
                      transition={{ duration: 0.5 }}
                      layout
                      className="flex flex-col gap-12 lg:flex-row">
                      <p className="text-xl md:text-2xl font-medium">{testimonial.quote}</p>
                      <cite className="not-italic lg:text-right">
                        <Image src={testimonial.image} alt={testimonial.name} className="rounded-xl size-28 max-w-none" />
                        <div className="font-bold mt-4">{testimonial.name}</div>
                        <div className="text-xs text-gray-400 mt-2">{testimonial.title}</div>
                      </cite>
                    </motion.blockquote>

                  ) : null

                )}
              </AnimatePresence>
              <motion.div layout="position" className="flex gap-2 md:flex-col  ">
                {testimonials.map((testimonial, index) => (
                  <div className="size-6 relative isolate inline-flex items-center justify-center" key={testimonial.name} onClick={() => setTestimonialIndex(index)} >
                    {testimonialIndex === index && (
                      <motion.div className="absolute border-gradient size-full rounded-full -z-10" layoutId="testimonial-dot"></motion.div>
                    )}
                    <div className="size-1.5 bg-gray-200 rounded-full"></div>
                  </div>
                ))}
              </motion.div>
            
            </motion.div>
            </LayoutGroup>
          </SectionContent>
        </SectionBorder>
      </div>
    </section>);
};

export default Testimonials;
