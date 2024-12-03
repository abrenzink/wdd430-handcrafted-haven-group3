'use client'

import Image from "next/image";
import Link from "next/link";
import React, { useState, Suspense } from "react";
import Search from "./search";

interface NavBarProps{
className? :string;
}

  const NavBar: React.FC<NavBarProps> = ({className}) => {
    const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className=" min-w-[90vw] items-center ">
    <nav  className={`${className} grid grid-cols-[25%,50%,25%] md:grid-cols-[12%,60%,30%] relative `}>

        <Link href={"/"}>
          <Image
            className="flex justify-start"
            src="/hc-icon.png"
            alt="Hancrafted Haven Icon"
            width={90}
            height={90}
            priority
          />
      </Link>
    <div className="md:order-3 md:justify-center">
      <Suspense>
        <Search srchclassName="flex justify-center " inputPlaceholder="Search Products" />
      </Suspense>
    </div>
    <button 
    className=" flex justify-end md:hidden  top-2 right-2 text-6xl"
      onClick={() => setIsOpen(!isOpen)}
      >
      ☰
    </button>
<div
  className={`${
    isOpen ? "block" : "hidden"
  } absolute right-0 mr-auto  top-24 flex-col  md:relative md:flex-row md:top-auto md:block `}
>
      <ul className="relative justify-end border-4 font-ubuntu md:font-bold md:border-0 flex flex-col md:w-full  md:flex-row md:justify-center md:order-3 md:space-x-6 bg-white text-xl text-right">
          <li className="border-b border-grey-500   md:border-none p-2">
            <a href="#home">Home</a>
          </li>
          <li className="border-b border-grey-500 md:border-none p-2">
            <a href="#about">About</a>
          </li>
          <li className="border-b border-grey-500 md:border-none p-2">
            <a href="#services">Services</a>
          </li>
          <li className="p-2">
            <a href="#contact">Contact</a>
          </li>
        </ul>
    </div>
  </nav>
  </div>
  )}
  export default NavBar;