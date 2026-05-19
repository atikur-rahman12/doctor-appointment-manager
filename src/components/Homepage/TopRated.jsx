import AppointCards from "@/components/AppointCards";

const fetchAppointments = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/appointments`, {
    cache: "no-store",
  });

  const data = await res.json();
  return data || [];
};

const TopRated = async () => {
  const appointments = await fetchAppointments();

  const topRatedDoctors = appointments
    ?.sort((a, b) => b.rating - a.rating)
    ?.slice(0, 3);

  return (
    <section className="py-20 bg-slate-950 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-500/20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-600/20 blur-[120px] rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white">
            Top Rated{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500 bg-clip-text text-transparent">
              Doctors
            </span>
          </h2>

          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Meet our highest-rated medical specialists trusted by thousands of
            patients for quality healthcare and professional consultation.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {topRatedDoctors?.map((appointment) => (
            <AppointCards key={appointment._id} appointment={appointment} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopRated;
