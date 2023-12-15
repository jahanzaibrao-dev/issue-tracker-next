"use client";
import React from "react";
import { navItems } from "./utils";
import Link from "next/link";
import { AiFillBug } from "react-icons/ai";
import { usePathname } from "next/navigation";
import { Session } from "next-auth";
import { Button } from "@radix-ui/themes";

interface Props {
  session: Session | null;
}

const NavBar = ({ session }: Props) => {
  const currentPath = usePathname();
  return (
    <nav className="mb-5 border-b h-14 w-full bg-white px-5 fixed z-10 flex items-center space-x-6 ">
      <ul className="flex items-center space-x-6">
        <Link href={"/"}>
          <AiFillBug size={30} />
        </Link>
        {!!session &&
          navItems.map((link) => (
            <Link
              className={`${
                currentPath === link.href ? "text-zinc-800" : "text-zinc-500"
              } hover:text-zinc-800 transition-colors text-xl`}
              key={link.href}
              href={link.href}
              onClick={link.onClick}
            >
              {link.label}
            </Link>
          ))}

        {!session && (
          <>
            <Link
              className={`${
                currentPath === "/login" ? "text-zinc-800" : "text-zinc-500"
              } hover:text-zinc-800 transition-colors text-xl`}
              href={"/login"}
            >
              {" "}
              Login{" "}
            </Link>
            <Link
              className={`${
                currentPath === "/register" ? "text-zinc-800" : "text-zinc-500"
              } hover:text-zinc-800 transition-colors text-xl`}
              href={"/register"}
            >
              {" "}
              Sign Up{" "}
            </Link>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
