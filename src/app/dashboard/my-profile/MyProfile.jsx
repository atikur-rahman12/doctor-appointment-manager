"use client";

import { useEffect, useState } from "react";
import { authClient, useSession } from "@/app/lib/auth-client";
import { Card, Button } from "@heroui/react";
import { Mail, User, Pencil, LogOut } from "lucide-react";
import Image from "next/image";

const MyProfile = () => {
  const { data: session, isLoading } = useSession();

  const [showLoader, setShowLoader] = useState(true);

  const user = session?.user;

  // Logout Function
  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/login";
        },
      },
    });
  };

  const userInitials = user?.name
    ?.split(" ")
    ?.map((word) => word[0])
    ?.join("")
    ?.slice(0, 2)
    ?.toUpperCase();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 px-4">
      <Card className="w-full max-w-md p-6 rounded-2xl shadow-2xl bg-white/10 backdrop-blur-md border border-white/20">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-white">My Profile</h1>

          <p className="text-sm text-gray-300">Your account information</p>
        </div>

        {/* Loading */}
        {isLoading || showLoader ? (
          <div className="flex flex-col items-center justify-center py-10">
            <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>

            <p className="text-gray-300 mt-3 text-sm">Loading profile...</p>
          </div>
        ) : (
          <>
            {/* Avatar */}
            <div className="flex justify-center mb-5">
              {user?.image ? (
                <Image
                  src={user.image}
                  alt="Profile"
                  width={150}
                  height={150}
                  className="w-24 h-24 rounded-full object-cover border border-white/20 shadow-xl"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-linear-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-4xl border border-cyan-300 shadow-lg">
                  {userInitials}
                </div>
              )}
            </div>

            <hr className="mb-7 border-0 h-px bg-linear-to-r from-transparent via-white/30 to-transparent" />

            {/* Name */}
            <div className="flex items-center gap-3 text-white mb-4">
              <User size={18} />

              <div>
                <p className="text-xs text-gray-300">Name</p>

                <p className="font-semibold">{user?.name}</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-3 text-white mb-6">
              <Mail size={18} />

              <div>
                <p className="text-xs text-gray-300">Email Address</p>

                <p className="font-semibold">{user?.email}</p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-4">
              {/* Update Button */}
              <Button className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl">
                <Pencil size={16} />
                Update
              </Button>

              {/* Logout Button */}
              <Button
                onPress={handleLogout}
                className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white rounded-xl"
              >
                <LogOut size={16} />
                Logout
              </Button>
            </div>
          </>
        )}
      </Card>
    </div>
  );
};

export default MyProfile;
