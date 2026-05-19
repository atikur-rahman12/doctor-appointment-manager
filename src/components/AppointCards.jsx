"use client";

import { Card, Button } from "@heroui/react";

import { Star, MapPin, Stethoscope } from "lucide-react";
import Image from "next/image";

const AppointCards = ({ appointment }) => {
  const {
    name,
    specialty,
    image,
    experience,
    description,
    location,
    fee,
    rating,
  } = appointment;
  return (
    <div>
      <div className="h-full">
        <Card className="h-full p-0 flex flex-col bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl hover:border-cyan-400/40 hover:-translate-y-2 transition duration-300">
          <div className="relative h-64 overflow-hidden">
            <Image
              src={image}
              alt={name}
              width={500}
              height={500}
              className="w-full  object-cover hover:scale-110 transition duration-500"
            />

            <div className="absolute top-4 right-4 flex items-center gap-1 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
              <Star size={14} className="text-yellow-400 fill-yellow-400" />
              <span className="text-white text-sm">{rating}</span>
            </div>
          </div>

          <div className="p-5 flex flex-col flex-1">
            <h2 className="text-xl font-bold text-white">{name}</h2>

            <div className="flex items-center gap-2 mt-2 text-cyan-300">
              <Stethoscope size={16} />
              <p className="text-sm">{specialty}</p>
            </div>

            <p className="text-gray-400 text-sm mt-3">
              {experience} Experience
            </p>

            <p className="text-gray-400 text-xs mt-3">{description}</p>

            <div className="flex items-center gap-2 mt-3 text-gray-300 text-sm">
              <MapPin size={15} className="text-cyan-400" />
              {location}
            </div>

            <hr className="my-5 border-white/10" />

            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-400 text-[16px] ">Consultation Fee</p>
                <span className="text-[16px] font-semibold text-cyan-300">
                  <span className="text-xl">৳</span> {fee}
                </span>
              </div>

              <Button className="rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:scale-[1.02] transition">
                View Details
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AppointCards;
