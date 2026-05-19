import { Button, Card } from "@heroui/react";
import Image from "next/image";

import { Star, MapPin, Clock3, Stethoscope, Hospital } from "lucide-react";

const fetchSingleAppointment = async (id) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/appointments/${id}`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch appointment");
  }

  const data = await res.json();

  return data || {};
};

const DetailsPage = async ({ params }) => {
  const { id } = await params;

  const appointment = await fetchSingleAppointment(id);

  const {
    name,
    specialty,
    image,
    experience,
    availability,
    description,
    hospital,
    location,
    fee,
    rating,
  } = appointment;

  return (
    <section className="min-h-screen bg-slate-950 py-16 px-4 md:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left Side */}
          <Card className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-[32px] overflow-hidden shadow-2xl">
            <div className="h-100 md:h-170 w-full">
              <Image
                src={image}
                alt={name}
                fill
                priority
                className="object-cover"
              />
            </div>
          </Card>

          {/* Right Side */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 text-cyan-300 text-sm mb-6">
              <Stethoscope size={16} />
              {specialty}
            </div>

            {/* Name */}
            <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
              {name}
            </h1>

            <div className="inline-flex items-center gap-2 mt-2 rounded-full text-xl text-white backdrop-blur-xl">
              <Star size={18} className="text-yellow-400 fill-yellow-400" />
              <span className="">
                {rating} <span className="text-gray-400"> / 5.0</span>{" "}
              </span>
            </div>

            {/* Description */}
            <p className="mt-6 text-gray-400 leading-relaxed">{description}</p>

            {/* Info Cards */}
            <div className="grid sm:grid-cols-2 gap-5 mt-8">
              {/* Experience */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
                <p className="text-gray-400 text-sm">Experience</p>

                <h3 className="text-white text-lg font-semibold mt-2">
                  {experience} Years
                </h3>
              </div>

              {/* Fee */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
                <p className="text-gray-400 text-sm">Consultation Fee</p>

                <h3 className="text-cyan-300 text-2xl font-bold mt-2">
                  ৳ {fee}
                </h3>
              </div>
            </div>

            {/* More Info */}
            <div className="mt-8 space-y-5">
              <div className="flex items-center gap-3 text-gray-300">
                <Hospital className="text-cyan-400" size={18} />

                <span>{hospital}</span>
              </div>

              <div className="flex items-center gap-3 text-gray-300">
                <MapPin className="text-cyan-400" size={18} />

                <span>{location}</span>
              </div>

              {/* Availability */}
              <div className="mt-8">
                <div className="flex items-center gap-3 mb-4 text-gray-300">
                  <Clock3 className="text-cyan-400" size={18} />
                  <span className="font-semibold text-white">Availability</span>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {availability?.map((time, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-center rounded-full border border-cyan-300/80 bg-white/10 px-3 py-2 text-cyan-300 tracking-wide shadow-md backdrop-blur-md transition-all duration-300"
                    >
                      {time}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Button */}
            <div className="mt-10">
              <Button className="px-8 py-6 rounded-2xl bg-linear-to-r from-cyan-500 to-blue-600 text-white text-lg font-semibold hover:scale-[1.03] transition duration-300 shadow-xl">
                Book Appointment
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailsPage;
