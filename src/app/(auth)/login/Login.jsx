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

import { Mail, Lock } from "lucide-react";

import google from "@/assets/google1.jpg";
import Image from "next/image";
import { authClient, signIn, useSession } from "@/app/lib/auth-client";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();

  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (session?.user) {
      router.push("/");
    }
  }, [session, router]);

  const handleLogin = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const loginData = Object.fromEntries(formData.entries());

    const { error } = await signIn.email({
      ...loginData,
      redirect: false,
    });

    if (error) {
      toast.error(
        error.message || "Login failed! Please check your credentials.",
      );

      return;
    }

    toast.success("Login successful! Welcome back 👋");

    // Full reload + redirect
    window.location.href = "/";
  };

  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  if (isPending) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-16 relative overflow-hidden">
      <div className="w-full max-w-md relative z-10">
        <div className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl p-8">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-extrabold text-white">Login</h1>

            <p className="text-gray-400 mt-3">
              Welcome back! <br /> Login to manage your appointments.
            </p>
          </div>

          <Form
            onSubmit={handleLogin}
            className="flex flex-col gap-8 w-full"
            render={(props) => <form {...props} className="w-full" />}
          >
            <TextField
              isRequired
              name="email"
              type="email"
              className="w-full mb-4"
              validate={(value) => {
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                  return "Please enter a valid email address";
                }

                return null;
              }}
            >
              <Label className="text-gray-300 mb-2">Email</Label>

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

            <TextField
              isRequired
              minLength={6}
              name="password"
              type="password"
              className="w-full mb-4"
              validate={(value) => {
                if (value.length < 6) {
                  return "Password must be at least 6 characters";
                }

                return null;
              }}
            >
              <Label className="text-gray-300 mb-2">Password</Label>

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

            <div className="-mt-4 text-right">
              <Link
                href="/forgot-password"
                className="text-sm text-cyan-300 hover:text-cyan-200 transition"
              >
                Forgot Password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full rounded-2xl bg-linear-to-r from-cyan-500 to-blue-600 text-white font-semibold py-6 text-lg hover:scale-[1.02] transition duration-300 shadow-xl mt-4"
            >
              Login
            </Button>
          </Form>

          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-white/10"></div>

            <span className="text-gray-400 text-sm">OR</span>

            <div className="flex-1 h-px bg-white/10"></div>
          </div>

          <Button
            onPress={handleGoogleLogin}
            className="w-full rounded-2xl border border-white/10 bg-white/5 text-white hover:bg-white/10 py-6 text-lg font-medium transition duration-300"
          >
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
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-cyan-300 hover:text-cyan-200 font-medium transition"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
