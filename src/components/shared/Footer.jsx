import React from "react";
import Link from "next/link";
import { Stethoscope, MapPinCheck, MailCheck, PhoneCall } from "lucide-react";
import { RiInstagramFill } from "react-icons/ri";
import { FaLinkedin, FaTwitter } from "react-icons/fa";
import { SiFacebook } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-white border-t border-white/10 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-500/20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-600/20 blur-[120px] rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-14 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-xl bg-linear-to-r from-cyan-500 to-blue-600">
                <Stethoscope className="text-white w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold">DocAppoint</h2>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed">
              A modern doctor appointment booking platform that helps you
              connect with trusted healthcare professionals anytime.
            </p>

            <div className="flex gap-4 mt-5">
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-cyan-500/20 hover:border-cyan-400  transition-all duration-300 group"
              >
                <SiFacebook
                  size={18}
                  className="text-gray-300 group-hover:text-cyan-300 transition"
                />
              </a>

              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-cyan-500/20 hover:border-cyan-400  transition-all duration-300 group"
              >
                <FaTwitter
                  size={18}
                  className="text-gray-300 group-hover:text-cyan-300 transition"
                />
              </a>

              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-cyan-500/20 hover:border-cyan-400  transition-all duration-300 group"
              >
                <RiInstagramFill
                  size={18}
                  className="text-gray-300 group-hover:text-cyan-300 transition"
                />
              </a>

              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-cyan-500/20 hover:border-cyan-400  transition-all duration-300 group"
              >
                <FaLinkedin
                  size={18}
                  className="text-gray-300 group-hover:text-cyan-300 transition"
                />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3 text-gray-400">
              <li>
                <Link href="/" className="hover:text-cyan-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/appointments" className="hover:text-cyan-300">
                  Appointments
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-cyan-300">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-cyan-300">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>

            <div className="space-y-3 text-gray-400 text-sm">
              <div className="flex items-center gap-2">
                <PhoneCall size={16} className="text-cyan-400" />
                +880 1234 567 890
              </div>

              <div className="flex items-center gap-2">
                <MailCheck size={16} className="text-cyan-400" />
                support@docappoint.com
              </div>

              <div className="flex items-center gap-2">
                <MapPinCheck size={16} className="text-cyan-400" />
                Sylhet, Bangladesh
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">About</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              DocAppoint is built to simplify healthcare access. Book doctors,
              manage appointments, and stay healthy with ease.
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} DocAppoint. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
