"use client";

import { useState } from "react";

import { Button, Input, Modal, TextArea } from "@heroui/react";

import toast from "react-hot-toast";

import { Pencil, SquarePen, Stethoscope, User } from "lucide-react";

const Field = ({ label, icon: Icon, children }) => {
  return (
    <div className="w-full">
      <label className="text-sm text-gray-300 mb-2 block">{label}</label>

      <div className="relative w-full">
        {Icon && (
          <Icon
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400 z-10"
          />
        )}

        {children}
      </div>
    </div>
  );
};

const UpdateModal = ({ booking, onUpdate }) => {
  const [open, setOpen] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const updateBooking = Object.fromEntries(formData.entries());

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/booked/${booking?._id}`,
        {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(updateBooking),
        },
      );

      const data = await res.json();

      console.log(data);

      if (data.modifiedCount > 0) {
        const updatedData = {
          ...booking,
          ...updateBooking,
        };

        onUpdate(updatedData);

        toast.success("Appointment updated successfully ✨", {
          duration: 3000,
          style: {
            background:
              "linear-gradient(135deg, rgba(6,182,212,0.15), rgba(59,130,246,0.15))",
            color: "#fff",
            border: "1px solid rgba(34,211,238,0.25)",
            backdropFilter: "blur(12px)",
            borderRadius: "18px",
            padding: "16px 20px",
            boxShadow: "0 10px 30px rgba(6,182,212,0.15)",
          },
          iconTheme: {
            primary: "#22d3ee",
            secondary: "#0f172a",
          },
        });

        setOpen(false);
      } else {
        toast.error("Please update at least one field or close !!", {
          duration: 3000,
          style: {
            background:
              "linear-gradient(135deg, rgba(239,68,68,0.15), rgba(127,29,29,0.2))",
            color: "#fff",
            border: "1px solid rgba(248,113,113,0.25)",
            backdropFilter: "blur(12px)",
            borderRadius: "18px",
            padding: "16px 20px",
            boxShadow: "0 10px 30px rgba(239,68,68,0.15)",
          },
        });
      }
    } catch (error) {
      console.log(error);

      toast.error("Something went wrong!", {
        duration: 3000,
        style: {
          background:
            "linear-gradient(135deg, rgba(239,68,68,0.15), rgba(127,29,29,0.2))",
          color: "#fff",
          border: "1px solid rgba(248,113,113,0.25)",
          backdropFilter: "blur(12px)",
          borderRadius: "18px",
          padding: "16px 20px",
          boxShadow: "0 10px 30px rgba(239,68,68,0.15)",
        },
      });
    }
  };

  return (
    <>
      <Modal isOpen={open} onOpenChange={setOpen}>
        <Button
          onPress={() => setOpen(true)}
          size="sm"
          className="w-full flex items-center justify-center gap-2 bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/30"
        >
          <Pencil size={16} />
          Update
        </Button>

        <Modal.Backdrop
          variant="blur"
          className="bg-slate-950/80 backdrop-blur-md"
        >
          <Modal.Container>
            <Modal.Dialog className="relative overflow-hidden rounded-[36px] border border-white/10 bg-slate-900/90 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.55)] max-w-xl w-[92%]">
              <Modal.CloseTrigger className="absolute right-5 top-5 w-10 h-10 rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-white/10 flex items-center justify-center">
                ✕
              </Modal.CloseTrigger>

              <Modal.Header className="border-b border-white/10 px-8 py-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-3xl bg-linear-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
                    <SquarePen className="text-white" size={30} />
                  </div>

                  <div>
                    <Modal.Heading className="text-3xl font-bold text-white">
                      Update Appointment
                    </Modal.Heading>
                  </div>
                </div>
              </Modal.Header>

              <Modal.Body className="px-8 py-8">
                <form className="space-y-6" onSubmit={onSubmit}>
                  <Field label="Doctor" icon={Stethoscope}>
                    <Input
                      name="doctor"
                      defaultValue={booking?.doctor}
                      readOnly
                      placeholder="Doctor name"
                      className="w-full pl-12 h-12 rounded-2xl bg-white/5 border border-white/10 text-white"
                    />
                  </Field>

                  <Field label="Patient Name" icon={User}>
                    <Input
                      name="patient"
                      defaultValue={booking?.patient}
                      placeholder="Your full name"
                      className="w-full pl-12 h-12 rounded-2xl bg-white/5 border border-white/10 text-white"
                    />
                  </Field>

                  <div className="grid md:grid-cols-2 gap-5">
                    <Field label="Date">
                      <Input
                        type="date"
                        name="date"
                        defaultValue={booking?.date}
                        className="w-full h-12 rounded-2xl bg-white/20 border border-white/10 text-white"
                      />
                    </Field>

                    <Field label="Time">
                      <Input
                        type="time"
                        name="time"
                        defaultValue={booking?.time}
                        className="w-full h-12 rounded-2xl bg-white/20 border border-white/10 text-white"
                      />
                    </Field>
                  </div>

                  <Field label="Reason">
                    <TextArea
                      name="reason"
                      defaultValue={booking?.reason}
                      placeholder="Write your reason (optional)"
                      className="w-full rounded-2xl bg-white/5 border border-white/10 text-white"
                    />
                  </Field>

                  <Button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-linear-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 text-white hover:from-cyan-500/30 hover:to-blue-500/30 shadow-lg shadow-cyan-500/10 transition-all duration-300 backdrop-blur-md"
                  >
                    <SquarePen size={18} />
                    Save Changes
                  </Button>
                </form>
              </Modal.Body>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  );
};

export default UpdateModal;
