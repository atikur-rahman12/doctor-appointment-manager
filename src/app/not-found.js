"use client";

import Link from "next/link";
import { Home, Stethoscope } from "lucide-react";

const NotFound = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-slate-950 relative overflow-hidden">
      <div className="absolute top-10 left-10 w-72 h-72 bg-cyan-500/20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-600/20 blur-[120px] rounded-full"></div>

      <div className="text-center px-4 relative z-10 max-w-xl">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 flex items-center justify-center rounded-2xl bg-linear-to-r from-cyan-500 to-blue-600 shadow-xl">
            <Stethoscope className="text-white w-10 h-10" />
          </div>
        </div>

        <h1 className="text-6xl sm:text-7xl font-extrabold text-white">404</h1>

        <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-white">
          Page Not Found
        </h2>

        <p className="mt-4 text-gray-400 text-sm sm:text-base leading-relaxed">
          The page you are looking for doesn’t exist or has been moved. Please
          go back to home and continue booking your appointments.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-lg hover:scale-105 transition"
          >
            <Home size={18} />
            Back to Home
          </Link>
        </div>

        <p className="mt-10 text-gray-600 text-xs">
          DocAppoint • Smart Healthcare System
        </p>
      </div>
    </section>
  );
};

export default NotFound;
