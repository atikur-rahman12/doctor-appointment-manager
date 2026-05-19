"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X, LogOut } from "lucide-react";
import Logo from "@/assets/logo.png";
import Image from "next/image";
import { authClient } from "@/app/lib/auth-client";

const Navbar = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const profileRef = useRef(null);

  const pathname = usePathname();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navLinkStyle = (path) =>
    `${
      pathname === path
        ? "text-cyan-300 after:w-full"
        : "text-white/90 after:w-0"
    }
    relative font-medium transition-all duration-300 hover:text-cyan-300 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-cyan-400 after:transition-all after:duration-300 hover:after:w-full`;

  const navLinks = (
    <>
      <Link
        href="/"
        onClick={() => setIsOpen(false)}
        className={navLinkStyle("/")}
      >
        Home
      </Link>

      <Link
        href="/appointments"
        onClick={() => setIsOpen(false)}
        className={navLinkStyle("/appointments")}
      >
        All Appointment
      </Link>

      <Link
        href="/dashboard"
        onClick={() => setIsOpen(false)}
        className={navLinkStyle("/dashboard")}
      >
        Dashboard
      </Link>
    </>
  );

  const userInitials = user?.name
    ?.split(" ")
    ?.map((word) => word[0])
    ?.join("")
    ?.slice(0, 2)
    ?.toUpperCase();

  const handleLogout = async () => {
    console.log("logout");
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-950/90 backdrop-blur-xl shadow-lg">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-white"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 md:w-12 md:h-12 rounded-full bg-linear-to-r from-cyan-500 to-blue-600 shadow-lg overflow-hidden">
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

                <h1 className="sm:hidden text-base font-bold bg-linear-to-r from-cyan-400 via-blue-400 to-indigo-500 bg-clip-text text-transparent">
                  DocApp
                </h1>

                <p className="hidden md:block text-xs text-gray-400 -mt-1">
                  Doctor Appointment System
                </p>
              </div>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-8">{navLinks}</div>

          <div className="flex items-center gap-4 relative">
            {!user ? (
              <>
                <div className="hidden md:flex items-center gap-4">
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
                </div>
              </>
            ) : (
              <>
                <div className="hidden md:flex items-center gap-3">
                  <div className="flex flex-col text-right">
                    <span className="text-white font-semibold text-sm">
                      {user?.name}
                    </span>

                    <span className="text-xs text-cyan-300">Logged In</span>
                  </div>

                  {user?.image ? (
                    <Image
                      src={user.image}
                      alt={user.name}
                      width={120}
                      height={120}
                      className="w-11 h-11 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-11 h-11 rounded-full bg-linear-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg border border-cyan-300 shadow-lg">
                      {userInitials}
                    </div>
                  )}

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-red-500/90 hover:bg-red-600 text-white font-medium transition duration-300 shadow-lg"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>

                <div ref={profileRef} className="md:hidden relative">
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="focus:outline-none"
                  >
                    {user?.image ? (
                      <Image
                        src={user.image}
                        alt={user.name}
                        width={80}
                        height={80}
                        className="w-9 h-9 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-linear-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-[14px] border border-cyan-300 shadow-lg">
                        {userInitials}
                      </div>
                    )}
                  </button>

                  {profileOpen && (
                    <div className="absolute right-0 top-12 w-60 rounded-2xl border border-white/10 bg-slate-900/95 backdrop-blur-xl shadow-2xl p-4 animate-in fade-in zoom-in-95 duration-200">
                      <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                        {user?.image ? (
                          <Image
                            src={user.image}
                            alt={user.name}
                            width={40}
                            height={40}
                            className="w-10 h-10 rounded-full object-cover border-2 border-cyan-400"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-linear-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-xs">
                            {userInitials}
                          </div>
                        )}

                        <div>
                          <h3 className="text-white font-semibold text-sm">
                            {user?.name}
                          </h3>

                          <p className="text-xs text-cyan-300">Logged In</p>
                        </div>
                      </div>

                      <button
                        onClick={handleLogout}
                        className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-medium transition duration-300"
                      >
                        <LogOut size={16} />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-slate-900/95 p-4 shadow-2xl">
              {navLinks}

              {!user && (
                <div className="flex flex-col gap-3 pt-3">
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="w-full text-center px-4 py-2.5 rounded-xl border border-cyan-400 text-cyan-300 hover:bg-cyan-500 hover:text-white transition duration-300"
                  >
                    Login
                  </Link>

                  <Link
                    href="/register"
                    onClick={() => setIsOpen(false)}
                    className="w-full text-center px-4 py-2.5 rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-lg"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
