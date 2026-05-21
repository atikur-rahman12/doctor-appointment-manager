"use client";

import { useState } from "react";

import { Button, Input, Modal, TextArea } from "@heroui/react";

import { Toaster } from "react-hot-toast";

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

const UpdateModal = ({ booking }) => {
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
        alert("Appointment updated successfully");
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#0f172a",
            color: "#ffffff",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "16px",
            padding: "14px 18px",
          },
        }}
      />

      <Modal isOpen={open} onOpenChange={setOpen}>
        {/* OPEN BUTTON */}
        <Button
          onPress={() => setOpen(true)}
          size="sm"
          className="w-full flex items-center justify-center gap-2 bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/30"
        >
          <Pencil size={16} />
          Update
        </Button>

        {/* MODAL */}
        <Modal.Backdrop
          variant="blur"
          className="bg-slate-950/80 backdrop-blur-md"
        >
          <Modal.Container>
            <Modal.Dialog className="relative overflow-hidden rounded-[36px] border border-white/10 bg-slate-900/90 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.55)] max-w-xl w-[92%]">
              {/* CLOSE */}
              <Modal.CloseTrigger className="absolute right-5 top-5 w-10 h-10 rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-white/10 flex items-center justify-center">
                ✕
              </Modal.CloseTrigger>

              {/* HEADER */}
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

              {/* BODY */}
              <Modal.Body className="px-8 py-8">
                <form className="space-y-6" onSubmit={onSubmit}>
                  {/* DOCTOR */}
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

                  {/* DATE + TIME */}
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

                  {/* REASON */}
                  <Field label="Reason">
                    <TextArea
                      name="reason"
                      defaultValue={booking?.reason}
                      placeholder="Write your reason (optional)"
                      className="w-full rounded-2xl bg-white/5 border border-white/10 text-white"
                    />
                  </Field>

                  {/* BUTTON */}
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
