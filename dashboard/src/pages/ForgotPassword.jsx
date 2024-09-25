import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { forgotPassword } from "@/redux/slices/userSlice";
import { toast } from "react-toastify";

function ForgotPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const result = dispatch(forgotPassword({ email })).then((result) => {
      if (forgotPassword.fulfilled.match(result)) {
        toast.success(`Email sent to ${email}`);
      } else if (forgotPassword.rejected.match(result)) {
        const errorMessage = result.payload || "Wrong email. Please try again.";
        toast.error(errorMessage);
      }
    });
  }

  return (
    <div className="w-[100vw] lg:grid lg:min-h-screen lg:grid-cols-2 xl:min-h-screen">
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-center">
              Forgot your Password
            </h1>
            <p className="mt-2 text-center text-sm text-gray-600">
              Enter your email below to reset your password
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="current-email"
                />
              </div>
              <Link
                to="/password/forgot"
                className="text-sm text-blue-500 underline"
              >
                Remember your password?
              </Link>
              <Button type="submit" className="w-full" onClick={handleSubmit}>
                Reset your Password
              </Button>
            </div>
          </form>
        </div>
      </div>
      <div className="hidden lg:block lg:bg-gray-200">
        <img
          src="/forgot.png"
          alt="Background"
          className="h-[100vh] w-full object-cover"
        />
      </div>
    </div>
  );
}

export default ForgotPassword;
