  'use client'

  import Image from "next/image";
  import React, { useState } from "react";

    const NavBar = () => {
      const [isOpen, setIsOpen] = useState(false);
    
    return (
      <nav className="m-4">
        <div>
        <Image
          className=" absolute top-2  left-2 "
          src="/hc-icon.png"
           alt="Hancrafted Haven Icon"
          width={75}
          height={75}
            priority
        />
      </div>
      <button 
      className=" md:hidden absolute top-2 right-2 text-6xl"
        onClick={() => setIsOpen(!isOpen)}
        >
        ☰
      </button>
      <div
      className="{`${ isOpen? 'block' : 'hidden'} absolute md:relative top-16 md:top:-auto left-0 w-full md-w-auto md:flex `}">
        <ul className="flex flex-col md:flex-row md:space-x-6 bg-white">
            <li className="border-b border-grey-500">
              <a href="#home">Home</a>
            </li>
            <li className="border-b border-grey-500">
              <a href="#about">About</a>
            </li>
            <li className="border-b border-grey-500">
              <a href="#services">Services</a>
            </li>
            <li className="">
              <a href="#contact">Contact</a>
            </li>
          </ul>
      </div>
    </nav>
    )}

    export default NavBar;