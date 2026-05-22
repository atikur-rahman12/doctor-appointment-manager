"use client";

import { useEffect, useState } from "react";
import { Camera, User } from "lucide-react";
import { Button, Input, Label, Modal, TextField } from "@heroui/react";
import toast from "react-hot-toast";
import { authClient } from "@/app/lib/auth-client";
import { useRouter } from "next/navigation";
import Image from "next/image";

const UpdateProfileModal = ({ user, refetch }) => {
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();


  useEffect(() => {
    if (user) {
      setName(user?.name || "");
      setPhoto(user?.image || "");
    }
  }, [user]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await authClient.updateUser({
        name,
        image: photo,
      });

      if (res?.data) {
        await refetch();

        toast.success("Profile updated successfully!");

        setIsOpen(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
      <Button
        onPress={() => setIsOpen(true)}
        className="flex-1 rounded-xl bg-cyan-600 text-white hover:bg-cyan-700"
      >
        Update Profile
      </Button>

      <Modal.Backdrop className="bg-black/50 backdrop-blur-sm">
        <Modal.Container placement="center">
          <Modal.Dialog className="w-full max-w-md rounded-3xl bg-white dark:bg-zinc-900 shadow-2xl">
            <Modal.Header className="text-center p-6">
              <div className="mb-4">
                {photo ? (
                  <Image
                    src={photo}
                    alt="profile"
                    height={150}
                    width={150}
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
                  <Button
                    type="button"
                    variant="secondary"
                    onPress={() => setIsOpen(false)}
                  >
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
