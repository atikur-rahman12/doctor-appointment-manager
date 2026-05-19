"use client";

import Link from "next/link";

import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";

import { User, Mail, Lock, Image as ImageIcon } from "lucide-react";

import { FaArrowRight } from "react-icons/fa";
import google from "@/assets/google1.jpg";
import Image from "next/image";
import toast from "react-hot-toast";
import { signUp } from "@/app/lib/auth-client";
import { useRouter } from "next/navigation";

const Register = () => {
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const registerData = Object.fromEntries(formData.entries());

    const { data, error } = await signUp.email({
      ...registerData,
    });

    if (error) {
      toast.error(error.message || "Registration failed!", {
        duration: 4000,
        position: "top-center",
        style: {
          background: "rgba(15, 23, 42, 0.95)",
          color: "#fff",
          border: "1px solid rgba(239, 68, 68, 0.3)",
          padding: "16px 20px",
          borderRadius: "16px",
          backdropFilter: "blur(12px)",
          fontWeight: "500",
        },
        iconTheme: {
          primary: "#ef4444",
          secondary: "#fff",
        },
      });

      return;
    }

    toast.success("Account created successfully!", {
      duration: 4000,
      position: "top-center",
      style: {
        background: "rgba(15, 23, 42, 0.95)",
        color: "#fff",
        border: "1px solid rgba(34, 197, 94, 0.3)",
        padding: "16px 20px",
        borderRadius: "16px",
        backdropFilter: "blur(12px)",
        fontWeight: "500",
      },
      iconTheme: {
        primary: "#22c55e",
        secondary: "#fff",
      },
    });

    router.push("/login");
  };

  return (
    <section className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-16 relative overflow-hidden">
      <div className="w-full max-w-md relative z-10">
        <div className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold text-white">Register</h1>

            <p className="text-gray-400 mt-3">
              Create your DocAppoint account and book appointments easily.
            </p>
          </div>

          <Form
            className="flex flex-col gap-5 w-full"
            render={(props) => <form {...props} className="w-full" />}
            onSubmit={handleRegister}
          >
            <TextField isRequired className="w-full mb-4">
              <Label className="text-gray-300">Full Name</Label>

              <div className="relative w-full">
                <User
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400 z-10"
                />

                <Input
                  name="name"
                  placeholder="Enter your full name"
                  className="pl-12 w-full"
                />
              </div>

              <FieldError />
            </TextField>

            <TextField
              isRequired
              name="email"
              type="email"
              className="w-full mb-4"
              validate={(value) => {
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                  return "Please enter a valid email";
                }

                return null;
              }}
            >
              <Label className="text-gray-300">Email</Label>

              <div className="relative w-full">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400 z-10"
                />

                <Input
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                  className="pl-12 w-full"
                />
              </div>

              <FieldError />
            </TextField>

            <TextField className="w-full mb-4">
              <Label className="text-gray-300">Photo URL</Label>

              <div className="relative w-full">
                <ImageIcon
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400 z-10"
                />

                <Input
                  name="image"
                  type="url"
                  placeholder="https://your-photo-url.com"
                  className="pl-12 w-full"
                />
              </div>

              <FieldError />
            </TextField>

            <TextField
              isRequired
              name="password"
              type="password"
              className="w-full"
              validate={(value) => {
                if (value.length < 6) {
                  return "Password must be at least 6 characters";
                }

                if (!/[A-Z]/.test(value)) {
                  return "Must contain one uppercase letter";
                }

                if (!/[a-z]/.test(value)) {
                  return "Must contain one lowercase letter";
                }

                return null;
              }}
            >
              <Label className="text-gray-300">Password</Label>

              <div className="relative w-full">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400 z-10"
                />

                <Input
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  className="pl-12 w-full"
                />
              </div>

              <FieldError />
            </TextField>

            <Button
              type="submit"
              className="w-full mt-10 rounded-2xl bg-linear-to-r from-cyan-500 to-blue-600 text-white font-semibold py-6 text-lg hover:scale-[1.02] transition duration-300 shadow-xl"
            >
              Create Account <FaArrowRight />
            </Button>
          </Form>

          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-white/10"></div>

            <span className="text-gray-400 text-sm">OR</span>

            <div className="flex-1 h-px bg-white/10"></div>
          </div>

          <Button className="w-full rounded-2xl border border-white/10 bg-white/5 text-white hover:bg-white/10 py-6 text-lg font-medium transition duration-300">
            <Image
              src={google}
              alt="google"
              height={25}
              width={25}
              className="rounded-full mr-2"
            />
            Continue with Google
          </Button>

          <p className="text-center text-gray-400 mt-8">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-cyan-300 hover:text-cyan-200 font-medium transition"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;
