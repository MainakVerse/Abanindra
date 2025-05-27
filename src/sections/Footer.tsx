"use client";

import React from "react";
import Link from "next/link";

export const navItems = [
  { name: "Generate", href: "/generation" },
  { name: "Gallery", href: "/pricing" },
  { name: "Contacts", href: "/contacts" },
];

// If you want to activate social links later:
// export const socialLinks = [
//   { name: "Youtube", icon: faYoutube, href: "#" },
//   { name: "X", icon: faXTwitter, href: "#" },
//   { name: "Discord", icon: faDiscord, href: "#" },
// ];

export const Footer = () => {
  return (
    <footer className="border-t border-[var(--color-border)]">
      <div className="container py-8">
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:justify-between">
          <div className="font-extrabold text-2xl">Abanindra</div>

          <nav className="flex flex-col gap-8 md:flex-row md:gap-16 items-center">
            {navItems.map(({ href, name }) => (
              <Link
                key={href}
                href={href}
                className="uppercase text-xs tracking-widest font-bold text-gray-400 hover:text-white transition-colors"
              >
                {name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-16 flex flex-col md:flex-row-reverse md:justify-between items-center gap-8">
          <p className="text-gray-500 text-sm">
            &copy; Supernova Business. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
