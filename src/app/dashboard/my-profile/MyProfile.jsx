"use client";

import { useEffect, useState } from "react";

import { authClient, useSession } from "@/app/lib/auth-client";

import { Card, Button } from "@heroui/react";

import { Mail, User, LogOut } from "lucide-react";

import Image from "next/image";

import UpdateProfileModal from "@/components/UpdateProfileModal";

const MyProfile = () => {
  const {
    data: session,
    isLoading,
    refetch,
  } = useSession({
    query: {
      disableCookieCache: true,
    },
  });
  console.log(session, "Session");

  const [showLoader, setShowLoader] = useState(true);

  const user = session?.user;

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
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 px-4">
      <Card className="w-full max-w-md rounded-3xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-md">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-white">My Profile</h1>

          <p className="mt-1 text-sm text-gray-300">Your account information</p>
        </div>

        {isLoading || showLoader ? (
          <div className="flex flex-col items-center justify-center py-10">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-white border-t-transparent"></div>

            <p className="mt-3 text-sm text-gray-300">Loading profile...</p>
          </div>
        ) : (
          <>
            <div className="mb-6 flex justify-center">
              {user?.image ? (
                <Image
                  src={user.image}
                  alt="Profile"
                  width={150}
                  height={150}
                  className="h-28 w-28 rounded-full border-4 border-cyan-400 object-cover shadow-2xl"
                />
              ) : (
                <div className="flex h-28 w-28 items-center justify-center rounded-full border border-cyan-300 bg-linear-to-r from-cyan-500 to-blue-600 text-4xl font-bold text-white shadow-xl">
                  {userInitials}
                </div>
              )}
            </div>

            <hr className="mb-7 h-px border-0 bg-linear-to-r from-transparent via-white/30 to-transparent" />

            <div className="mb-5 flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-400">
                <User size={20} />
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-gray-400">
                  Name
                </p>

                <p className="font-semibold text-white">{user?.name}</p>
              </div>
            </div>

            <div className="mb-6 flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-500/20 text-blue-400">
                <Mail size={20} />
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-gray-400">
                  Email Address
                </p>

                <p className="font-semibold text-white">{user?.email}</p>
              </div>
            </div>

            <div className="mt-4 flex gap-3">
              {/* Update Profile */}
              <UpdateProfileModal user={user} refetch={refetch} />

              <Button
                onPress={handleLogout}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 text-white hover:bg-red-700"
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
