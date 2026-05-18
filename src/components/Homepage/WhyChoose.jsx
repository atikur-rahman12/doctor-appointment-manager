"use client";

import { CalendarCheck2, Users, Clock, Stethoscope } from "lucide-react";

const features = [
  {
    icon: <CalendarCheck2 />,
    title: "Easy Appointment",
    desc: "Quickly book doctor appointments in just a few clicks without any hassle.",
  },
  {
    icon: <Users />,
    title: "Expert Doctors",
    desc: "Browse and choose from verified and experienced medical specialists.",
  },
  {
    icon: <Clock />,
    title: "24/7 Availability",
    desc: "Book appointments anytime, anywhere without time limitations.",
  },
  {
    icon: <Stethoscope />,
    title: "Smart Healthcare System",
    desc: "Modern and efficient platform for managing your full healthcare journey.",
  },
];

const WhyChoose = () => {
  return (
    <section className="py-20 bg-slate-950 relative overflow-hidden">
      <div className="absolute top-10 left-10 w-72 h-72 bg-cyan-500/20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-600/20 blur-[120px] rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white">
            Why Choose{" "}
            <span className="bg-linear-to-r from-cyan-400 via-blue-400 to-indigo-500 bg-clip-text text-transparent mr-2">
              DocAppoint
            </span>
            ?
          </h2>

          <p className="text-gray-400 mt-4">
            A modern, secure, and user-friendly doctor appointment system
            designed to make healthcare easier and faster for everyone.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {features.map((item, index) => (
            <div
              key={index}
              className="group p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl hover:border-cyan-400/40 transition duration-300 hover:scale-[1.03]"
            >
              <div className="flex justify-center">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 text-white mb-4 group-hover:scale-110 transition">
                  {item.icon}
                </div>
              </div>

              <h3 className="text-xl font-semibold text-white mb-2">
                {item.title}
              </h3>

              <p className="text-gray-400 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
