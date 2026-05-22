"use client";

import { useEffect, useState } from "react";
import { Camera, User } from "lucide-react";
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import toast from "react-hot-toast";
import { authClient } from "@/app/lib/auth-client";

const UpdateProfileModal = ({ user, setSessionUser }) => {
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ MUST: correct hook usage (NO invalid call)
  const { refetch } = authClient.useSession();

  // Prefill data
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

      const { data: tokenData } = await authClient.token();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${user.email}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${tokenData?.token}`,
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

      // ✅ 1. Instant UI update
      setSessionUser((prev) => ({
        ...prev,
        name,
        image: photo,
      }));

      // ✅ 2. Navbar + session sync FIX
      await refetch();

      toast.success("Profile updated successfully!");

      // close modal
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
      <Button className="flex-1 rounded-xl bg-cyan-600 text-white hover:bg-cyan-700">
        Edit Profile
      </Button>

      <Modal.Backdrop className="bg-black/50 backdrop-blur-sm">
        <Modal.Container placement="center">
          <Modal.Dialog className="w-full max-w-md rounded-3xl bg-white dark:bg-zinc-900 shadow-2xl">
            <Modal.CloseTrigger />

            {/* Header */}
            <Modal.Header className="text-center p-6">
              <div className="mb-4">
                {photo ? (
                  <img
                    src={photo}
                    alt="profile"
                    className="h-24 w-24 rounded-full mx-auto object-cover border-4 border-cyan-500"
                  />
                ) : (
                  <div className="h-24 w-24 rounded-full bg-cyan-500 flex items-center justify-center mx-auto">
                    <User className="text-white" />
                  </div>
                )}
              </div>

              <h2 className="text-xl font-bold">Update Profile</h2>
              <p className="text-sm text-gray-500">Change your name & photo</p>
            </Modal.Header>

            {/* Body */}
            <Modal.Body className="p-6">
              <form
                onSubmit={handleUpdateProfile}
                className="flex flex-col gap-4"
              >
                <TextField>
                  <Label>Name</Label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                  />
                </TextField>

                <TextField>
                  <Label className="flex items-center gap-2">
                    <Camera size={16} />
                    Photo URL
                  </Label>
                  <Input
                    value={photo}
                    onChange={(e) => setPhoto(e.target.value)}
                    placeholder="https://..."
                  />
                </TextField>

                <div className="flex gap-3 justify-end mt-3">
                  <Button id="closeModalBtn" variant="secondary">
                    Cancel
                  </Button>

                  <Button type="submit" disabled={loading}>
                    {loading ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </form>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default UpdateProfileModal;
