import AppointCards from "@/components/AppointCards";

const fetchAppointments = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/appointments`);
  const data = res.json();
  return data || [];
};

const AppointmentsPage = async () => {
  const appointments = await fetchAppointments();

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
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {appointments?.map((appointment) => (
            <AppointCards key={appointment._id} appointment={appointment} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AppointmentsPage;
