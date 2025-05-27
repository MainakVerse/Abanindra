"use client"

import Logo from "@/components/Logo";
import Orbit from "@/components/Orbit";
import Link from "next/link";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

export const navItems = [
  { name: "Generate", href: "/generation" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contacts", href: "/contacts" },
];

export const Header = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <>
      <header className="border-b border-gray-200/20 relative z-40">
        <div className="container">
          <div className="h-18 lg:h-20 flex justify-between items-center">
            <div className="flex gap-4 items-center">
              <Logo />
              <Link className="font-extrabold text-2xl" href="/">Abanindra</Link>
            </div>

            {/* Desktop Navigation */}
            <div className="h-full hidden lg:block">
              <nav className="h-full">
                {navItems.map(({ name, href }) => (
                  <Link
                    href={href}
                    key={href}
                    className="h-full px-10 relative font-bold text-xs tracking-widest text-gray-400 uppercase inline-flex items-center 
                      before:content-[''] before:absolute before:bottom-0 before:h-2 before:w-px before:bg-gray-200/20 before:left-0 
                      last:after:absolute last:after:bottom-0 last:after:h-2 last:after:w-px last:after:bg-gray-200/20 last:after:right-0"
                  >
                    {name}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center lg:hidden">
              <button
                className="relative size-10 rounded-lg border-2 border-transparent [background:linear-gradient(var(--color-gray-950),var(--color-gray-950))_content-box,conic-gradient(from_45deg,var(--color-violet-400),var(--color-fuchsia-400),var(--color-amber-300),var(--color-teal-300),var(--color-violet-400))_border-box]"
                onClick={() => setIsMobileNavOpen((curr) => !curr)}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className={twMerge("w-4 h-0.5 bg-gray-100 -translate-y-1 transition duration-300", isMobileNavOpen && "translate-y-0 rotate-45")} />
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className={twMerge("w-4 h-0.5 bg-gray-100 translate-y-1 transition duration-300", isMobileNavOpen && "translate-y-0 -rotate-45")} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      {isMobileNavOpen && (
        <div className="fixed top-18 left-0 bottom-0 right-0 bg-gray-950 z-30 overflow-hidden">
          <div className="absolute-center isolate -z-10">
            <Orbit />
          </div>
          <div className="absolute-center isolate -z-10">
            <Orbit className="size-[350px]" />
          </div>
          <div className="absolute-center isolate -z-10">
            <Orbit className="size-[500px]" />
          </div>
          <div className="absolute-center isolate -z-10">
            <Orbit className="size-[650px]" />
          </div>
          <div className="absolute-center isolate -z-10">
            <Orbit className="size-[800px]" />
          </div>
          <div className="container h-full">
            <nav className="flex flex-col items-center gap-4 py-8 h-full justify-center">
              {navItems.map(({ href, name }) => (
                <Link
                  href={href}
                  key={href}
                  className="text-gray-400 uppercase tracking-widest font-bold text-xs h-10"
                  onClick={() => setIsMobileNavOpen(false)}
                >
                  {name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
