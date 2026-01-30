
import React from 'react';
import { MdOutlineNotificationsNone } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import { Link, useNavigate } from '@tanstack/react-router';


export const Header: React.FC = () => {
  const navigate = useNavigate()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="max-w-[1440px] mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          {/* Logo */}
          <div className="flex items-center justify-center gap-2 text-primary">
            <div className="flex items-center justify-center w-40 ">
              <img src='/logo-hor.svg' />
            </div>
          </div>

          {/* Search */}
          <div className="hidden lg:flex items-center bg-gray-100 rounded-lg px-3 py-1.5 w-80">
            <IoSearchOutline />
            <input
              onSubmit={() => { navigate({ to: "/discover" }) }}
              className="bg-transparent border-none focus:ring-0 text-sm w-full placeholder:text-gray-500 ml-2"
              placeholder="Search topics, sources..."
              type="text"
            />
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6">
          {['Tech', 'Finance', 'Health', 'Politics', 'Science'].map((link) => (
            <Link key={link} className="text-sm font-medium hover:text-primary transition-colors cursor-pointer">
              {link}
            </Link>
          ))}
        </nav>

        {/* User Profile / Notifications */}
        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
            <MdOutlineNotificationsNone size={25} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>

          <div className="h-8 w-[1px] bg-gray-200 mx-1"></div>

          <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-1 pr-3 rounded-full transition-colors">
            <div className="w-8 h-8 rounded-full bg-primary/10 overflow-hidden border border-gray-100">
              <img
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB48De54WM1iiDfajeEL5bUtOPQUeb9oDnkSapuiniqlO_XEjn_nwUDZ8ofDNdZhLgfnxe1WFu4ttmB7sD1sJ_ZzqF_8M4wUNp9rPRdVeSLTj-0Sk-iLCtjugYMsC8L5K0CEW3Ol828VUtr9x9cSd9uYkU9CRWzAf3pwO0tbfaEjbavZoAJn8UStpbTdM0LmfthTHuG7UfQHBk3mTr7ewGHKP1RJ8XnquEMwqc3dLeuyQI5Byu5zH8fUz7W_J6LMs-o65sl3FMoECR6"
                alt="User Profile"
              />
            </div>
            <span className="text-sm font-semibold hidden sm:inline">Alex Rivera</span>
          </div>
        </div>
      </div>
    </header>
  );
};
