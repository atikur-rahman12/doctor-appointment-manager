"use client";

import { useEffect, useState } from "react";

import { Camera, User } from "lucide-react";

import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";

import toast from "react-hot-toast";

const UpdateProfileModal = ({ user, setSessionUser, session }) => {
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");

  const [loading, setLoading] = useState(false);

  // Prefill user data
  useEffect(() => {
    if (user) {
      setName(user?.name || "");
      setPhoto(user?.image || "");
    }
  }, [user]);

  // Update Profile
  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${user.email}`,
        {
          method: "PATCH",

          headers: {
            "Content-Type": "application/json",

            authorization: `Bearer ${session?.token}`,
          },

          body: JSON.stringify({
            name,
            image: photo,
          }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Update failed");
      }

      // Instantly update UI
      setSessionUser((prev) => ({
        ...prev,
        name,
        image: photo,
      }));

      toast.success("Profile updated successfully!");

      // Close Modal
      document.getElementById("closeModalBtn")?.click();
    } catch (error) {
      console.log(error);

      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal>
      {/* Open Button */}
      <Button className="flex-1 rounded-xl bg-cyan-600 text-white hover:bg-cyan-700">
        Edit Profile
      </Button>

      <Modal.Backdrop className="bg-black/50 backdrop-blur-sm">
        <Modal.Container placement="center">
          <Modal.Dialog className="w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-white shadow-2xl dark:bg-zinc-900">
            <Modal.CloseTrigger />

            {/* Header */}
            <Modal.Header className="flex flex-col items-center border-b border-gray-200 px-6 py-8 dark:border-zinc-800">
              {/* Avatar Preview */}
              <div className="mb-4">
                {photo ? (
                  <img
                    src={photo}
                    alt="Preview"
                    className="h-24 w-24 rounded-full border-4 border-cyan-500 object-cover shadow-lg"
                  />
                ) : (
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg">
                    <User className="size-10" />
                  </div>
                )}
              </div>

              <Modal.Heading className="text-2xl font-bold text-gray-900 dark:text-white">
                Update Profile
              </Modal.Heading>

              <p className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
                Update your profile information
              </p>
            </Modal.Header>

            {/* Body */}
            <Modal.Body className="p-6">
              <Surface
                variant="default"
                className="rounded-2xl border border-gray-200 bg-gray-50 p-5 dark:border-zinc-800 dark:bg-zinc-950"
              >
                <form
                  onSubmit={handleUpdateProfile}
                  className="flex flex-col gap-5"
                >
                  {/* Name Field */}
                  <TextField
                    className="w-full"
                    name="name"
                    type="text"
                    variant="secondary"
                  >
                    <Label className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Name
                    </Label>

                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                      className="rounded-xl"
                    />
                  </TextField>

                  {/* Photo URL */}
                  <TextField
                    className="w-full"
                    name="photo"
                    type="text"
                    variant="secondary"
                  >
                    <Label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      <Camera className="size-4" />
                      Photo URL
                    </Label>

                    <Input
                      value={photo}
                      onChange={(e) => setPhoto(e.target.value)}
                      placeholder="https://example.com/photo.jpg"
                      className="rounded-xl"
                    />
                  </TextField>

                  {/* Footer Buttons */}
                  <div className="mt-4 flex justify-end gap-3">
                    <Button
                      id="closeModalBtn"
                      slot="close"
                      variant="secondary"
                      className="rounded-xl px-5"
                    >
                      Cancel
                    </Button>

                    <Button
                      type="submit"
                      disabled={loading}
                      className="rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 px-5 text-white shadow-lg hover:opacity-90"
                    >
                      {loading ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </form>
              </Surface>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default UpdateProfileModal;
