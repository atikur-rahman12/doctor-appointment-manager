"use client";

import { useEffect, useState } from "react";
import AppointCards from "@/components/AppointCards";

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchAppointments = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/appointments`,
      );
      const data = await res.json();
      setAppointments(data);
    };

    fetchAppointments();
  }, []);

  const filteredAppointments = appointments.filter((appointment) =>
    appointment.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <section className="min-h-screen bg-slate-950 py-16 px-4 md:px-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-500/20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-600/20 blur-[120px] rounded-full"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">
            Available{" "}
            <span className="bg-linear-to-r from-cyan-400 via-blue-400 to-indigo-500 bg-clip-text text-transparent">
              Appointments
            </span>
          </h1>

          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Browse experienced doctors and book your appointment quickly with
            DocAppoint.
          </p>

          <div className="mt-8 flex justify-center">
            <input
              type="text"
              placeholder="Search doctor by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full max-w-md px-5 py-3 rounded-2xl bg-white/10 border border-white/10 text-white placeholder:text-gray-400 outline-none focus:border-cyan-400 backdrop-blur-md"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map((appointment) => (
              <AppointCards key={appointment._id} appointment={appointment} />
            ))
          ) : (
            <p className="col-span-full flex flex-col items-center justify-center py-20 text-center">
              <span className="text-6xl mb-4">🩺</span>

              <span className="text-2xl md:text-3xl font-bold bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                No Doctor Found
              </span>

              <span className="text-gray-400 mt-3 max-w-md">
                We couldn&apos;t find any doctor matching your search. Try
                another name.
              </span>
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default AppointmentsPage;
