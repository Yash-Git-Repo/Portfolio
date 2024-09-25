import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updatePassword } from "@/redux/slices/userSlice";
import { KEY_ACCESS_TOKEN, removeItem } from "@/utils/localStorageManager";
import { useNavigate } from "react-router-dom";

const UpdatePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUpdatePassword = () => {
    const result = dispatch(
      updatePassword({ currentPassword, newPassword, confirmNewPassword })
    ).then((result) => {
      if (updatePassword.fulfilled.match(result)) {
        removeItem(KEY_ACCESS_TOKEN);
        toast.success("Password updated successfully, Please login again!", {
          onClose: () => navigate("/login"),
        });
      } else if (updatePassword.rejected.match(result)) {
        const errorMessage =
          result.payload || "Something went wrong. Please try again.";
        toast.error(errorMessage);
      }
    });
  };

  useEffect(() => {}, [dispatch]);

  return (
    <div className="w-full h-full ">
      <div className="w-full">
        <div className="grid w-full gap-6">
          <div className="grid gap-2">
            <h1 className="text-3xl font-bold">Update Password</h1>
            <p className="text-balance text-muted-foreground">
              Update Your Password
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2 ">
              <Label>Current Password</Label>
              <Input
                id="current-password"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>
            <div className="grid gap-2">
              <Label>New Password</Label>
              <Input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
            </div>
            <div className="grid gap-2">
              <Label>Confirm New Password</Label>
              <Input
                id="confirm-new-password"
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
            </div>
            <Button onClick={() => handleUpdatePassword()} className="w-full">
              Update Password
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
