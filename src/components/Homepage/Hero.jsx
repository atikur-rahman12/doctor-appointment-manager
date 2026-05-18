"use client";

import Image from "next/image";
import Link from "next/link";
import { CalendarCheck2, Search, ShieldCheck } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import HeroImage from "@/assets/doctor.jpg";
import HeroImage1 from "@/assets/doctor1.jpg";
import HeroImage2 from "@/assets/doctor2.jpg";

const images = [HeroImage, HeroImage1, HeroImage2];

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-slate-950">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-500/20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-600/20 blur-[120px] rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left Content */}
          <div className="relative z-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 text-cyan-300 text-sm mb-6">
              <ShieldCheck size={18} />
              Trusted Healthcare Appointment Platform
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-white">
              Smart Healthcare Solutions{" "}
              <span className="bg-linear-to-r from-cyan-400 via-blue-400 to-indigo-500 bg-clip-text text-transparent">
                For Modern Patients
              </span>
            </h1>

            {/* Description */}
            <p className="mt-6 text-gray-300 text-lg max-w-xl">
              Easily find experienced doctors, schedule appointments, manage
              bookings, and get quality healthcare services from a secure
              platform.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex gap-4">
              <Link
                href="/appointments"
                className="flex gap-3 px-8 py-3 rounded-2xl bg-linear-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-xl hover:scale-105 transition duration-300"
              >
                <Search /> Explore Doctors
              </Link>

              <Link
                href="/bookings"
                className="flex gap-3 px-8 py-3 rounded-2xl border border-cyan-400 text-cyan-300 hover:bg-cyan-500 hover:text-white transition duration-300"
              >
                <CalendarCheck2 /> My Bookings
              </Link>
            </div>
          </div>

          {/* Right Side Swiper */}
          <div className="flex justify-end">
            <div className="w-full max-w-md lg:max-w-lg rounded-3xl overflow-hidden shadow-lg">
              <Swiper
                modules={[Autoplay, Pagination]}
                autoplay={{ delay: 2500, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                loop={true}
              >
                {images.map((img, index) => (
                  <SwiperSlide key={index}>
                    <Image
                      src={img}
                      alt="Doctor"
                      width={900}
                      height={900}
                      className="w-full h-105 object-cover"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>

        <hr className="my-10 border-white/10" />

        {/* Stats */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-7 gap-5">
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg p-5 text-center">
            <h2 className="text-3xl font-bold text-cyan-300">500+</h2>
            <p className="text-gray-400 text-sm mt-1">Expert Doctors</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg p-5 text-center">
            <h2 className="text-3xl font-bold text-cyan-300">10K+</h2>
            <p className="text-gray-400 text-sm mt-1">Happy Patients</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg p-5 text-center">
            <h2 className="text-3xl font-bold text-cyan-300">4.8⭐</h2>
            <p className="text-gray-400 text-sm mt-1">Average Rating</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg p-5 text-center">
            <h2 className="text-3xl font-bold text-cyan-300">24/7</h2>
            <p className="text-gray-400 text-sm mt-1">Online Support</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
