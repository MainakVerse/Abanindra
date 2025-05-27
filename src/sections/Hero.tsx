"use client"
// import robotImg from "@/assets/images/robot.jpg"
import Loader from "@/assets/images/loader-animated.svg"
import { Button } from "@/components/Button";

import Planet from "@/components/Planet"
import SectionBorder from "@/components/SectionBorder";
import SectionContent from "@/components/SectionContent";
import { motion, useMotionValue,  useScroll, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Typewriter from 'typewriter-effect';

export const useMousePosition = () => {
  const [innerWidth, setInnerWidth] = useState(1)
  const [innerHeight, setInnerHeight] = useState(1)
  const clientX = useMotionValue(0)
  const clientY = useMotionValue(0)
  const xProgress = useTransform(clientX, [0, innerWidth], [0, 1])
  const yProgress = useTransform(clientY, [0, innerHeight], [0, 1])

  useEffect(() => {
    setInnerWidth(window.innerWidth)
    setInnerHeight(window.innerHeight)

    window.addEventListener('resize', () => {
      setInnerWidth(window.innerWidth)
      setInnerHeight(window.innerHeight)
    })
  }, [])

  useEffect(() => {
    window.addEventListener('mousemove', (e) => {
      clientX.set(e.clientX)
      clientY.set(e.clientY)
    })
  }, [clientX, clientY])

  return { xProgress, yProgress }
}

export const Hero = () => {
  const { xProgress, yProgress } = useMousePosition()
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['end start', 'start end']
  })

  const transformedY = useTransform(scrollYProgress, [0, 1], [200, -200])

  const springX = useSpring(xProgress)

  const springY = useSpring(yProgress)

  const translateLargeX = useTransform(springX, [0, 1], ['-25%', '25%'])

  const translateLargeY = useTransform(springY, [0, 1], ['-25%', '25%'])

  const translateMediumX = useTransform(springX, [0, 1], ['-50%', '50%'])
  const translateMediumY = useTransform(springY, [0, 1], ['-50%', '50%'])

  const translateSmallX = useTransform(springX, [0, 1], ['-200%', '200%'])
  const translateSmallY = useTransform(springY, [0, 1], ['-200%', '200%'])

  return (
    <section ref={sectionRef}>
      <div className="container">
        <SectionBorder>
          <SectionContent className="relative isolate  [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]">
            <div className="absolute -z-10 inset-0 bg-[radial-gradient(circle_farthest-corner,var(--color-fuchsia-900)_50%,var(--color-indigo-900)_75%,transparent)] [mask-image:radial-gradient(circle_farthest-side,black,transparent)]">
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-8xl font-semibold text-gray-100 text-center  leading-tight">Generate</h1>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-100 text-center  leading-tight">
              <Typewriter
  options={{
    strings: [
      '<span style="color: #00ffff;">Sci-fi Images</span>',
      '<span style="color: #ff69b4;">Anime Art</span>',
      '<span style="color: #ffa500;">Oil Paintings</span>',
      '<span style="color:rgb(195, 140, 246);">Abstract Art</span>',
      '<span style="color: #00ff00;">Pixel Art</span>',
      '<span style="color: #ff4500;">Retro Designs</span>'
    ],
    autoStart: true,
    loop: true,
    delay: 50,
    deleteSpeed: 30
  }}
/>

              
            </h1>
            <p className="text-center text-lg md:text-xl mt-8 max-w-3xl mx-auto">Harness the power of AI to generate stunning images with Ababnindra</p>
            <div className="flex justify-center ">
              <Link href="/generation" passHref>
  <Button variant="secondary" className="mt-10">
    <span>Start Generating</span>
  </Button>
</Link>
            </div>
            <div className="relative isolate max-w-5xl  mx-auto">
              <div className="absolute left-1/2 top-0">
                <motion.div style={{ x: translateLargeX, y: translateLargeY }}>
                  <Planet size="lg" color="violet" className=" -translate-x-[316px] -translate-y-[76px] rotate-135" />
                </motion.div>
                <motion.div style={{ x: translateLargeX, y: translateLargeY }}>
                  <Planet size="lg" color="violet" className="-translate-y-[188px] translate-x-[334px] -rotate-135" />
                </motion.div>
                <motion.div style={{ x: translateMediumX, y: translateMediumY }}>
                  <Planet size="md" color="teal" className="-translate-y-[342px] translate-x-[486px] -rotate-135" />
                </motion.div>
                <motion.div style={{ x: translateSmallX, y: translateSmallY }}>
                  <Planet size="sm" color="fuchsia" className="-translate-y-[372px] -translate-x-[508px] rotate-135" />
                </motion.div>
              </div>
              <div className="absolute left-0 z-10 top-[30%] -translate-x-10 hidden lg:block">
                <motion.div className="bg-gray-800/70 backdrop-blur-md border-gray-700 rounded-xl p-4 w-72" style={{
                  y: transformedY
                }}>
                  <div>Create a retro design house with a car at porch</div>
                  
                </motion.div>
              </div>
              <motion.div className="absolute right-0 z-10 top-[50%] translate-x-10 hidden lg:block" style={{
                y: transformedY
              }}>
                <div className="bg-gray-800/70 backdrop-blur-md border-gray-700 rounded-xl p-4 w-72">
                  <div>
                    Create a Ghibli styled image of a robot in a futuristic city
                  </div>
                  
                </div>
              </motion.div>
              
              <div className="mt-20 rounded-2xl border-2 overflow-hidden border-gradient relative flex">
              <video
              src="/bg.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto"
            />
                <div className="absolute bottom-2 md:bottom-4 lg:bottom-10 left-1/2 -translate-x-1/2 w-full max-w-xs px-4 p-[15px]">
                  <div className="bg-gray-950/80 flex items-center gap-4 px-4 py-2 rounded-2xl 
                w-[320px] max-w-full">
                    <Loader className="text-violet-400" />
                    <div className="font-semibold text-md text-gray-100">Sketching Masterpiece...<span className="animate-cursor-blink">|</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SectionContent>
        </SectionBorder>
      </div>
    </section>
  );
};

export default Hero;
