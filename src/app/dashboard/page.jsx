import Link from "next/link";
import { LayoutDashboard, CalendarCheck2, User } from "lucide-react";

export const metadata = {
  title: "DocAppoint | Dashboard",
  description: ".......",
};

const DashboardPage = () => {
  return (
    <section className="min-h-screen bg-slate-950 py-16 px-4 md:px-8 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 text-cyan-300 text-sm mb-6">
            <LayoutDashboard size={18} />
            Dashboard Panel
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-white">
            User{" "}
            <span className="bg-linear-to-r from-cyan-400 via-blue-400 to-indigo-500 bg-clip-text text-transparent">
              Dashboard
            </span>
          </h1>

          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Manage your bookings and profile information easily from your
            dashboard.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Link href="/dashboard/my-bookings">
            <div className="group h-full rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl p-8 hover:border-cyan-400/40 hover:-translate-y-2 transition duration-300 shadow-2xl cursor-pointer">
              <div className="w-16 h-16 rounded-2xl bg-linear-to-r from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 transition duration-300">
                <CalendarCheck2 className="text-white" size={30} />
              </div>

              <h2 className="text-2xl font-bold text-white mb-3">
                My Bookings
              </h2>

              <p className="text-gray-400 leading-relaxed">
                View all your booked appointments, appointment dates, doctor
                details, and manage your schedules easily.
              </p>

              <div className="mt-6 inline-flex items-center text-cyan-300 font-medium group-hover:gap-3 gap-2 transition-all duration-300">
                Explore Now →
              </div>
            </div>
          </Link>

          <Link href="/dashboard/my-profile">
            <div className="group h-full rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl p-8 hover:border-cyan-400/40 hover:-translate-y-2 transition duration-300 shadow-2xl cursor-pointer">
              <div className="w-16 h-16 rounded-2xl bg-linear-to-r from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 transition duration-300">
                <User className="text-white" size={30} />
              </div>

              <h2 className="text-2xl font-bold text-white mb-3">My Profile</h2>

              <p className="text-gray-400 leading-relaxed">
                Update your personal information, profile image, contact
                details, and manage your account settings.
              </p>

              <div className="mt-6 inline-flex items-center text-cyan-300 font-medium group-hover:gap-3 gap-2 transition-all duration-300">
                Manage Profile →
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;
