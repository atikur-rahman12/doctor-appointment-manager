"use client";

import { useEffect, useState } from "react";
import { Card, Button } from "@heroui/react";

import {
  User,
  Mail,
  Phone,
  VenusAndMars,
  MapPin,
  CalendarDays,
  Clock3,
  Stethoscope,
  Pencil,
  Trash2,
} from "lucide-react";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/booked`);

      const data = await res.json();
      setBookings(data);
    };

    fetchBookings();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 py-10">
      {/* CONTAINER */}
      <div className="container mx-auto px-6 md:px-12 lg:px-35">
        {/* HEADER */}
        <h1 className="text-3xl font-bold text-white mb-6">My Bookings</h1>

        {/* GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bookings.map((booking) => (
            <Card
              key={booking._id}
              className="relative overflow-hidden w-full max-w-sm mx-auto rounded-2xl border border-white/10 bg-slate-900/70 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.4)] hover:scale-[1.02] transition-all duration-300"
            >
              {/* HEADER */}
              <div className="p-4 border-b border-white/10 flex items-center gap-2">
                <Stethoscope className="text-cyan-400" size={20} />
                <h2 className="text-lg font-semibold text-cyan-400">
                  {booking.doctor}
                </h2>
              </div>

              {/* BODY */}
              <div className="p-4 space-y-2 text-sm text-gray-300">
                <p className="flex items-center gap-2">
                  <User size={14} className="text-cyan-400" />
                  Patient : {booking.patient}
                </p>

                <p className="flex items-center gap-2">
                  <Mail size={14} className="text-cyan-400" />
                  Email : {booking.email}
                </p>

                <p className="flex items-center gap-2">
                  <Phone size={14} className="text-cyan-400" />
                  Phone : {booking.phone}
                </p>

                <p className="flex items-center gap-2">
                  <VenusAndMars size={14} className="text-cyan-400" />
                  Gender : {booking.gender}
                </p>

                <p className="flex items-center gap-2">
                  <MapPin size={14} className="text-cyan-400" />
                  Address : {booking.address}
                </p>

                <p className="flex items-center gap-2">
                  <CalendarDays size={14} className="text-cyan-400" />
                  Date : {booking.date}
                </p>

                <p className="flex items-center gap-2">
                  <Clock3 size={14} className="text-cyan-400" />
                  Time : {booking.time}
                </p>

                <p className="text-gray-400 mt-1">
                  Reason : {booking.reason || "No reason provided"}
                </p>
              </div>

              {/* ACTIONS */}
              <div className="p-4 flex justify-between gap-3 border-t border-white/10">
                <Button
                  size="sm"
                  className="w-full flex items-center justify-center gap-2 bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/30"
                >
                  <Pencil size={16} />
                  Update
                </Button>

                <Button
                  size="sm"
                  className="w-full flex items-center justify-center gap-2 bg-red-500/20 text-red-300 border border-red-500/30 hover:bg-red-500/30"
                >
                  <Trash2 size={16} />
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyBookings;
