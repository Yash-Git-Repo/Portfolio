import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "@/redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

function ResetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const params = useParams();
  const token = params?.token;

  async function handleSubmit(e) {
    e.preventDefault();
    dispatch(
      resetPassword({
        token,
        body: {
          newPassword,
          confirmNewPassword,
        },
      })
    ).then((result) => {
      if (resetPassword.fulfilled.match(result)) {
        toast.success(`Password reset successfully`);
        navigate("/login");
      } else if (resetPassword.rejected.match(result)) {
        const errorMessage =
          result.payload || "Some error occured . Please try again.";
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
              Reset your Password
            </h1>
            <p className="mt-2 text-center text-sm text-gray-600">
              Set your new password
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="email">New Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
              </div>
              <div>
                <Label htmlFor="email">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  required
                  autoComplete="current-password"
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
          src="/reset.png"
          alt="Background"
          className="h-[99vh] w-full object-cover"
        />
      </div>
    </div>
  );
}

export default ResetPassword;
