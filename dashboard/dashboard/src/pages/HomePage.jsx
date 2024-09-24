import { logout } from "@/redux/slices/userSlice";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  FolderGit,
  History,
  Home,
  LayoutGrid,
  LogOut,
  MessageSquareMore,
  Package2,
  PanelLeft,
  PencilRuler,
  User,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import Dashboard from "./subComponents/Dashboard";
import AddProject from "./subComponents/AddProject";
import AddSkill from "./subComponents/AddSkill";
import AddSoftwareApplications from "./subComponents/AddSoftwareApplications";
import AddTimeline from "./subComponents/AddTimeline";
import Messages from "./subComponents/Messages";
import Account from "./subComponents/Account";
import { KEY_ACCESS_TOKEN, removeItem } from "@/utils/localStorageManager";

function HomePage() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [active, setActive] = useState("Dashboard");

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const content = () => {
    switch (active) {
      case "Dashboard":
        return <Dashboard />;
        break;
      case "Add Project":
        return <AddProject />;
        break;
      case "Add Skill":
        return <AddSkill />;
        break;
      case "Add Uses":
        return <AddSoftwareApplications />;
        break;
      case "Add Timeline":
        return <AddTimeline />;
        break;
      case "Messages":
        return <Messages />;
        break;
      case "Account":
        return <Account />;
        break;
      default:
        return <Dashboard />;
        break;
    }
  };

  function handleLogout() {
    dispatch(logout());
    removeItem(KEY_ACCESS_TOKEN);
    toast.success("Logout successful!");
    navigate("/login");
  }

  return (
    <div className="flex min-h-screen w-[99vw] flex-col bg-muted/40 ">
      <aside className="fixed inset-y-0 left-0 hidden w-14 flex flex-col border-r bg-background sm:flex z-50">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5 flex-grow">
          <Link className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base">
            <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
            <span className="sr-only">Acme Inc</span>
          </Link>

          {[
            {
              name: "Dashboard",
              icon: <Home className="h-5 w-5" />,
              key: "Dashboard",
            },
            {
              name: "Add Project",
              icon: <FolderGit className="h-5 w-5" />,
              key: "Add Project",
            },
            {
              name: "Add Skill",
              icon: <PencilRuler className="h-5 w-5" />,
              key: "Add Skill",
            },
            {
              name: "Add Uses",
              icon: <LayoutGrid className="h-5 w-5" />,
              key: "Add Uses",
            },
            {
              name: "Add Timeline",
              icon: <History className="h-5 w-5" />,
              key: "Add Timeline",
            },
            {
              name: "Messages",
              icon: <MessageSquareMore className="h-5 w-5" />,
              key: "Messages",
            },
            {
              name: "Account",
              icon: <User className="h-5 w-5" />,
              key: "Account",
            },
          ].map((item) => (
            <TooltipProvider key={item.key}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                      active === item.key
                        ? "text-accent-foreground bg-accent"
                        : "text-muted-foreground"
                    } transition-colors hover:text-foreground md:h-8 md:w-8`}
                    onClick={() => setActive(item.key)}
                  >
                    {item.icon}
                    <span className="sr-only">{item.name}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="bg-gray-800 text-white p-2 rounded-lg shadow-lg text-sm whitespace-nowrap"
                >
                  {item.name}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}

          {/* Spacer to push the logout button to the bottom */}
          <div className="flex-grow"></div>

          {/* Logout Button at the Bottom */}
          <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-5 w-5" />
                    <span className="sr-only">Logout</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="bg-gray-800 text-white p-2 rounded-lg shadow-lg text-sm whitespace-nowrap"
                >
                  Logout
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </nav>
        </nav>
      </aside>

      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 max-[900px]:h-[100px]">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="sm:hidden">
              <PanelLeft className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="sm:max-w-xs">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                className={`group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base`}
              >
                <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                <span className="sr-only">Acme Inc</span>
              </Link>

              {[
                {
                  name: "Dashboard",
                  icon: <Home className="h-5 w-5" />,
                  key: "Dashboard",
                },
                {
                  name: "Add Project",
                  icon: <FolderGit className="h-5 w-5" />,
                  key: "Add Project",
                },
                {
                  name: "Add Skill",
                  icon: <PencilRuler className="h-5 w-5" />,
                  key: "Add Skill",
                },
                {
                  name: "Add Uses",
                  icon: <LayoutGrid className="h-5 w-5" />,
                  key: "Add Uses",
                },
                {
                  name: "Timeline",
                  icon: <History className="h-5 w-5" />,
                  key: "Timeline",
                },
                {
                  name: "Messages",
                  icon: <MessageSquareMore className="h-5 w-5" />,
                  key: "Messages",
                },
                {
                  name: "Account",
                  icon: <User className="h-5 w-5" />,
                  key: "Account",
                },
              ].map((item) => (
                <Link
                  key={item.key}
                  className={`flex items-center gap-4 px-2.5 ${
                    active === item.key
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => setActive(item.key)}
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}

              <Link
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5" />
                Logout
              </Link>
            </nav>
          </SheetContent>
        </Sheet>

        <div className="flex items-center gap-4 md:grow-0 sm:ml-16 sm:mt-5">
          <img
            src={user?.avatar?.url}
            alt="avatar"
            className="w-20 h-20 rounded-full max-[900px]:hidden"
          />
          <h1 className="text-4xl max-[900px]:text-2xl">
            Welcome back, {user?.fullName}
          </h1>
        </div>
      </header>
      <main className="flex-1 ml-14 p-4">{content()}</main>
    </div>
  );
}

export default HomePage;
