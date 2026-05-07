import React from "react";
import { useState } from 'react';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
const ListItems = [
    'Home',
    'Cars',
    'favorites',
    'contact',
]
function Navbar() {

    const [nav , setNav] = useState(false)
    const handleNav = () => {
        setNav(!nav);
    };

    return (
        <nav className="bg-black relative">
            <div className='flex justify-between items-center bg-black p-5 max-w-[1400px] mx-auto'>
                
                <h1 className="text-white text-3xl font-black italic tracking-tighter uppercase z-50 ">
                    <span className="text-orange-500"> Auto</span>Drive
                </h1>
                
                
                <ul className="hidden md:flex ml-auto gap-20 mr-15">
                    {ListItems.map((item) => (
                        <li key={item} className="relative group cursor-pointer text-white hover:text-orange-500 transition-colors duration-300 ">
                            {item}
                            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
                        </li>
                    ))}
                </ul>

                
                <div className="flex items-center gap-10 z-50">
                    <button className="text-xl">
                        🧡
                    </button>

                    
                    <div onClick={handleNav} className='block md:hidden cursor-pointer text-white text-3xl'>
                        {nav ? <HiX /> : <HiMenuAlt3 />}
                    </div>
                </div>

                {/*  Menu Overlay */}
                <div className={
                    nav 
                    ? 'fixed left-0 top-0 w-full h-screen bg-black/90 flex flex-col items-center justify-center ease-in-out duration-500 z-40' 
                    : 'fixed left-[-100%] top-0 w-full h-screen ease-in-out duration-500'
                }>
                    <ul className="text-center">
                        {ListItems.map((item) => (
                            <li 
                                key={item} 
                                onClick={() => setNav(false)} // Close menu when item clicked
                                className="p-4 text-2xl text-white uppercase font-bold hover:text-orange-500 cursor-pointer transition-colors"
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;  