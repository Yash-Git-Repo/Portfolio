import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { KEY_ACCESS_TOKEN, setItem } from "@/utils/localStorageManager";
import { useDispatch } from "react-redux";
import { login } from "@/redux/slices/userSlice";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogin(e) {
    e.preventDefault();
    const result = dispatch(
      login({
        email,
        password,
      })
    )
      .then((result) => {
        if (login.fulfilled.match(result)) {
          const user = result.payload;
          setItem(KEY_ACCESS_TOKEN, user.accessToken);
          toast.success("Login successful!");
          navigate("/");
        } else if (login.rejected.match(result)) {
          const errorMessage =
            result.payload || "Login failed. Please try again.";
          toast.error(errorMessage);
        }
      })
      .catch((error) => {
        const errorMessage =
          error?.response?.data?.message ||
          error.message ||
          "Login failed. Please try again.";
        toast.error(errorMessage);
      });
  }

  return (
    <div className="w-[100vw] lg:grid lg:min-h-screen lg:grid-cols-2 xl:min-h-screen">
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-center">Login</h1>
            <p className="mt-2 text-center text-sm text-gray-600">
              Enter your email below to login to your account
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
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
              <div>
                <Label htmlFor="password">Password</Label>
                <div className="flex items-center justify-between">
                  <Link
                    to="/password/forgot"
                    className="text-sm text-blue-500 underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
          </form>
        </div>
      </div>
      <div className="hidden lg:block lg:bg-gray-200">
        <img
          src="/login.png"
          alt="Background"
          className="h-[100vh] w-full object-cover"
        />
      </div>
    </div>
  );
}

export default Login;
