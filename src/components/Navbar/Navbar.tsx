import React from "react";
import logo from "../../assets/logo.png";

function Navbar() {
    return (
        <nav className="flex justify-between items-center px-12 py-6 bg-black border-b border-white/10 w-full">
            
            {/*  Logo Section */}
            <div className="flex items-center gap-3">
                <img className="w-10" src={logo} alt="logo" />
                <h1 className="text-white font-medium text-xl tracking-wider">LuxAuto</h1>
            </div>

            {/* Right: Navigation Section */}
            <div className="flex items-center gap-12">
                <ul className="hidden md:flex gap-10 text-sm font-light">
                    <li className="text-white cursor-pointer">Home</li>
                    <li className="text-gray-400 hover:text-white transition-colors cursor-pointer">Inventory</li>
                    <li className="text-gray-400 hover:text-white transition-colors cursor-pointer">About</li>
                    <li className="text-gray-400 hover:text-white transition-colors cursor-pointer">Services</li>
                    <li className="text-gray-400 hover:text-white transition-colors cursor-pointer">Contact</li>
                </ul>

                {/* Hamburger Icon */}
                <div className="flex flex-col gap-1.5 cursor-pointer ml-4">
                    <div className="w-6 h-0.5 bg-white"></div>
                    <div className="w-6 h-0.5 bg-white"></div>
                </div>
            </div>
            
        </nav>
    );
}
export default Navbar;  