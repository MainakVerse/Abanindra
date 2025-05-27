import CallToAction from "@/sections/CallToAction"

import Features from "@/sections/Features"
import Footer from "@/sections/Footer"
import Header from "@/sections/Header"
import Hero from "@/sections/Hero"
import ImageSwitcher from "@/sections/ImageSwitcher"

import Testimonials from "@/sections/Testimonials"

export default function Home() {
  return <>
    <Header />
    <Hero />    
    <Features />
    <ImageSwitcher />
    <Testimonials />
    <CallToAction />
    <Footer/>
  </>
}
