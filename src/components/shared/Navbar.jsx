"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Stethoscope } from "lucide-react";
import Logo from "@/assets/logo.png";
import Image from "next/image";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();

  const user = null;

  const navLinkStyle = (path) =>
    `${
      pathname === path
        ? "text-cyan-300 after:w-full"
        : "text-white/90 after:w-0"
    }
    relative font-medium transition-all duration-300
    hover:text-cyan-300
    after:absolute after:left-0 after:-bottom-1
    after:h-[2px] after:bg-cyan-400
    after:transition-all after:duration-300
    hover:after:w-full`;

  const navLinks = (
    <>
      <Link href="/" className={navLinkStyle("/")}>
        Home
      </Link>

      <Link href="/appointments" className={navLinkStyle("/appointments")}>
        All Appointment
      </Link>

      <Link href="/dashboard" className={navLinkStyle("/dashboard")}>
        Dashboard
      </Link>
    </>
  );

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-950/90 backdrop-blur-xl shadow-lg">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-white"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>

            <Link href="/" className="flex items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-linear-to-r from-cyan-500 to-blue-600 shadow-lg">
                <Image
                  src={Logo}
                  alt="Logo"
                  width={300}
                  height={300}
                  className="rounded-full"
                />
              </div>

              <div>
                <h1 className="hidden sm:block text-2xl font-extrabold bg-linear-to-r from-cyan-400 via-blue-400 to-indigo-500 bg-clip-text text-transparent">
                  DocAppoint
                </h1>

                <h1 className="sm:hidden text-lg font-bold bg-linear-to-r from-cyan-400 via-blue-400 to-indigo-500 bg-clip-text text-transparent">
                  DocApp
                </h1>

                <p className="hidden md:block text-xs text-gray-400 -mt-1">
                  Doctor Appointment System
                </p>
              </div>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-8">{navLinks}</div>

          <div className="hidden md:flex items-center gap-4">
            {!user ? (
              <>
                <Link
                  href="/login"
                  className="px-5 py-2 rounded-xl border border-cyan-400 text-cyan-300 hover:bg-cyan-500 hover:text-white transition duration-300"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="px-5 py-2 rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:scale-105 transition duration-300 shadow-lg"
                >
                  Register
                </Link>
              </>
            ) : (
              <button className="px-5 py-2 rounded-xl bg-red-500 hover:bg-red-600 transition duration-300 text-white">
                Logout
              </button>
            )}
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden pb-5 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex flex-col gap-5 rounded-2xl border border-white/10 bg-slate-900/95 p-5 shadow-2xl">
              {navLinks}

              {!user && (
                <div className="flex flex-col gap-3 pt-3">
                  <Link
                    href="/login"
                    className="w-full text-center px-4 py-3 rounded-xl border border-cyan-400 text-cyan-300 hover:bg-cyan-500 hover:text-white transition duration-300"
                  >
                    Login
                  </Link>

                  <Link
                    href="/register"
                    className="w-full text-center px-4 py-3 rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-lg"
                  >
                    Register
                  </Link>
                </div>
              )}

              {user && (
                <button className="w-full py-3 rounded-xl bg-red-500 hover:bg-red-600 transition duration-300 text-white">
                  Logout
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
