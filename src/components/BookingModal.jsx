"use client";

import { useState } from "react";
import { Button, Input, Modal, TextArea } from "@heroui/react";
import toast from "react-hot-toast";

import {
  Mail,
  MapPin,
  Phone,
  Sparkles,
  Stethoscope,
  User,
  VenusAndMars,
} from "lucide-react";

const Field = ({ label, required, icon: Icon, error, children }) => {
  return (
    <div className="w-full">
      <label className="text-sm text-gray-300 mb-2 block">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div className="relative w-full">
        {Icon && (
          <Icon
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400 z-10"
          />
        )}

        {children}
      </div>

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

const BookingModal = ({ doctor, userEmail }) => {
  const [open, setOpen] = useState(false);

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    email: userEmail || "",
    doctor: doctor?.name || "",
    patient: "",
    phone: "",
    gender: "",
    address: "",
    date: "",
    time: "",
    reason: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const resetForm = () => {
    setFormData({
      email: "",
      doctor: "",
      patient: "",
      phone: "",
      gender: "",
      address: "",
      date: "",
      time: "",
      reason: "",
    });

    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!formData.email.trim()) newErrors.email = "Email is required";

    if (!formData.patient.trim())
      newErrors.patient = "Patient name is required";

    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";

    if (!formData.gender.trim()) newErrors.gender = "Gender is required";

    if (!formData.address.trim()) newErrors.address = "Address is required";

    if (!formData.date.trim()) newErrors.date = "Date is required";

    if (!formData.time.trim()) newErrors.time = "Time is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/booked`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        console.log("Error:", data);

        toast.error("Something went wrong");

        return;
      }

      console.log("Success:", data);

      resetForm();

      setOpen(false);

      toast.success("Appointment booked successfully!");
    } catch (error) {
      console.log(error);

      toast.error("Server error");
    }
  };

  return (
    <>
      <Modal isOpen={open} onOpenChange={setOpen}>
        <Button
          onPress={() => setOpen(true)}
          className="group px-8 py-7 rounded-3xl bg-linear-to-r from-cyan-500 via-sky-500 to-blue-600 text-white text-lg font-semibold shadow-[0_10px_40px_rgba(14,165,233,0.45)] hover:scale-[1.03] transition-all duration-300"
        >
          <Sparkles
            size={20}
            className="mr-2 group-hover:rotate-12 transition"
          />
          Book Appointment
        </Button>

        <Modal.Backdrop
          variant="blur"
          className="bg-slate-950/80 backdrop-blur-md"
        >
          <Modal.Container>
            <Modal.Dialog className="relative overflow-hidden rounded-[36px] border border-white/10 bg-slate-900/90 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.55)] max-w-2xl w-[95%]">
              <Modal.CloseTrigger className="absolute right-5 top-5 w-10 h-10 rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-white/10 flex items-center justify-center">
                ✕
              </Modal.CloseTrigger>

              <Modal.Header className="border-b border-white/10 px-8 py-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-3xl bg-linear-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
                    <Stethoscope className="text-white" size={30} />
                  </div>

                  <div>
                    <Modal.Heading className="text-3xl font-bold text-white">
                      Book Appointment
                    </Modal.Heading>

                    <p className="text-sm text-gray-400 mt-1">
                      Fill all required details
                    </p>
                  </div>
                </div>
              </Modal.Header>

              <Modal.Body className="px-8 py-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-5">
                    <Field
                      label="Email"
                      required
                      icon={Mail}
                      error={errors.email}
                    >
                      <Input
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="example@gmail.com"
                        className="w-full pl-12 h-12 rounded-2xl bg-white/5 border border-white/10 text-white"
                      />
                    </Field>

                    <Field
                      label="Doctor"
                      required
                      icon={Stethoscope}
                      error={errors.doctor}
                    >
                      <Input
                        name="doctor"
                        value={doctor?.name || ""}
                        readOnly
                        placeholder="Doctor name"
                        className="w-full pl-12 h-12 rounded-2xl bg-white/5 border border-white/10 text-white"
                      />
                    </Field>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <Field
                      label="Patient Name"
                      required
                      icon={User}
                      error={errors.patient}
                    >
                      <Input
                        name="patient"
                        value={formData.patient}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className="w-full pl-12 h-12 rounded-2xl bg-white/5 border border-white/10 text-white"
                      />
                    </Field>

                    <Field
                      label="Phone Number"
                      required
                      icon={Phone}
                      error={errors.phone}
                    >
                      <Input
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="01XXXXXXXXX"
                        className="w-full pl-12 h-12 rounded-2xl bg-white/5 border border-white/10 text-white"
                      />
                    </Field>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <Field
                      label="Gender"
                      required
                      icon={VenusAndMars}
                      error={errors.gender}
                    >
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="w-full h-12 pl-12 rounded-2xl bg-white/5 border border-white/10 text-white outline-none"
                      >
                        <option value="" className="text-black">
                          Select Gender
                        </option>

                        <option value="Male" className="text-black">
                          Male
                        </option>

                        <option value="Female" className="text-black">
                          Female
                        </option>

                        <option value="Other" className="text-black">
                          Other
                        </option>
                      </select>
                    </Field>

                    <Field
                      label="Address"
                      required
                      icon={MapPin}
                      error={errors.address}
                    >
                      <Input
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Enter your address"
                        className="w-full h-12 pl-14 rounded-2xl bg-white/5 border border-white/10 text-white"
                      />
                    </Field>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <Field label="Date" required error={errors.date}>
                      <Input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full h-12 rounded-2xl bg-white/20 border border-white/10 text-white"
                      />
                    </Field>

                    <Field label="Time" required error={errors.time}>
                      <Input
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        className="w-full h-12 rounded-2xl bg-white/20 border border-white/10 text-white"
                      />
                    </Field>
                  </div>

                  <Field label="Reason">
                    <TextArea
                      name="reason"
                      value={formData.reason}
                      onChange={handleChange}
                      placeholder="Write your reason (optional)"
                      className="w-full rounded-2xl bg-white/5 border border-white/10 text-white"
                    />
                  </Field>

                  <div className="border-t border-white/10 pt-6">
                    <Button
                      type="submit"
                      className="w-full h-14 text-lg font-semibold rounded-2xl bg-linear-to-r from-cyan-500 via-sky-500 to-blue-600 text-white"
                    >
                      Confirm Booking
                    </Button>
                  </div>
                </form>
              </Modal.Body>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  );
};

export default BookingModal;
