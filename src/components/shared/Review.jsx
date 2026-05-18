"use client";

import { Star } from "lucide-react";

const reviews = [
  {
    name: "Sarah Ahmed",
    role: "Heart Patient",
    review:
      "DocAppoint made it so easy to book my cardiologist appointment. The system is fast, simple, and very user-friendly.",
    rating: 5,
  },
  {
    name: "Mohammad Rahim",
    role: "Regular Patient",
    review:
      "I really like how I can manage all my appointments in one place. Doctors are also very professional.",
    rating: 4,
  },
  {
    name: "Nusrat Jahan",
    role: "Dermatology Patient",
    review:
      "Great platform! I booked my appointment within minutes and got timely consultation from a specialist.",
    rating: 5,
  },
  {
    name: "Abdul Karim",
    role: "Diabetes Patient",
    review:
      "Very smooth experience. I was able to find an endocrinologist quickly and book my appointment without any hassle.",
    rating: 5,
  },
  {
    name: "Fatema Akter",
    role: "Child Care Patient",
    review:
      "The platform is very helpful for booking pediatric appointments. Everything is organized and easy to use.",
    rating: 4,
  },
  {
    name: "Imran Hossain",
    role: "General Patient",
    review:
      "DocAppoint saved me a lot of time. I can easily choose doctors and manage my bookings anytime.",
    rating: 5,
  },
];

const Review = () => {
  return (
    <section className="py-20 bg-slate-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white">
            What Our{" "}
            <span className="bg-linear-to-r from-cyan-400 via-blue-400 to-indigo-500 bg-clip-text text-transparent">
              Patients Say
            </span>
          </h2>

          <p className="text-gray-400 mt-4">
            Real feedback from patients who use DocAppoint for their healthcare
            needs.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((item, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl hover:border-cyan-400/40 transition duration-300 hover:scale-[1.03]"
            >
              <div className="flex gap-1 mb-4 text-cyan-400">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
              </div>

              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                {item.review}
              </p>

              <div>
                <h4 className="text-white font-semibold">{item.name}</h4>
                <p className="text-gray-400 text-sm">{item.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Review;
