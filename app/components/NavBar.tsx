"use client";
import React from "react";
import { navItems } from "./utils";
import Link from "next/link";
import { AiFillBug } from "react-icons/ai";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const currentPath = usePathname();
  return (
    <nav className="mb-5 border-b h-14 px-5 flex items-center space-x-6 ">
      <ul className="flex items-center space-x-6">
        <Link href={"/"}>
          <AiFillBug size={30} />
        </Link>
        {navItems.map((link) => (
          <Link
            className={`${
              currentPath === link.href ? "text-zinc-800" : "text-zinc-500"
            } hover:text-zinc-800 transition-colors text-xl`}
            key={link.href}
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
