"use client";

import { useEffect, useState } from "react";
import { Card, Button } from "@heroui/react";

import {
  User,
  VenusAndMars,
  CalendarDays,
  Clock3,
  Stethoscope,
  Trash2,
  CalendarX,
} from "lucide-react";

import UpdateModal from "@/components/UpdateModal";
import toast from "react-hot-toast";

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

  const handleBookingUpdate = (updatedBooking) => {
    const updatedBookings = bookings.map((item) =>
      item._id === updatedBooking._id ? updatedBooking : item,
    );

    setBookings(updatedBookings);
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/booked/${id}`,
        {
          method: "DELETE",
        },
      );

      const data = await res.json();

      if (data.deletedCount > 0) {
        const remainingBookings = bookings.filter(
          (booking) => booking._id !== id,
        );

        setBookings(remainingBookings);

        toast.success("Appointment deleted successfully!", {
          duration: 3000,
          style: {
            background: "#0f172a",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.1)",
            padding: "14px 18px",
            borderRadius: "16px",
          },
          iconTheme: {
            primary: "#22c55e",
            secondary: "#fff",
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 py-10">
      <div className="container mx-auto px-6 md:px-12 lg:px-35">
        <h1 className="text-3xl font-bold text-white mb-6">My Bookings</h1>

        {bookings.length === 0 ? (
          <div className="flex items-center justify-center h-[60vh]">
            <div className="text-center">
              <CalendarX size={60} className="mx-auto text-cyan-400 mb-4" />

              <h2 className="text-2xl font-semibold text-white">
                No Bookings Found
              </h2>

              <p className="text-gray-400 mt-2">
                You have not booked any appointment yet.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bookings.map((booking) => (
              <Card
                key={booking._id}
                className="relative overflow-hidden w-full max-w-sm mx-auto rounded-2xl border border-white/10 bg-slate-900/70 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.4)] hover:scale-[1.02] transition-all duration-300"
              >
                <div className="p-4 border-b border-white/10 flex items-center gap-2">
                  <Stethoscope className="text-cyan-400" size={20} />

                  <h2 className="text-lg font-semibold text-cyan-400">
                    {booking.doctor}
                  </h2>
                </div>

                <div className="p-4 space-y-2 text-sm text-gray-300">
                  <p className="flex items-center gap-2">
                    <User size={14} className="text-cyan-400" />
                    Patient : {booking.patient}
                  </p>

                  <p className="flex items-center gap-2">
                    <VenusAndMars size={14} className="text-cyan-400" />
                    Gender : {booking.gender}
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

                <div className="p-4 flex justify-between gap-3 border-t border-white/10">
                  <UpdateModal
                    booking={booking}
                    onUpdate={handleBookingUpdate}
                  />

                  <Button
                    onPress={() => handleDelete(booking._id)}
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
        )}
      </div>
    </div>
  );
};

export default MyBookings;
