import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { deleteProject, getProject } from "@/redux/slices/projectSlice";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { Eye, Pen, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ManageProjects = () => {
  const navigate = useNavigate();
  const projects = useSelector((state) => state.projects.Project);
  const dispatch = useDispatch();

  const handleReturnToDashboard = () => {
    navigate("/");
  };

  const handleProjectDelete = (id) => {
    dispatch(deleteProject(id)).then((result) => {
      if (deleteProject.fulfilled.match(result)) {
        toast.success("Project deleted successfully");
        dispatch(getProject());
      } else if (deleteProject.rejected.match(result)) {
        const errorMessage =
          result.payload || "Something went wrong. Please try again.";
        toast.error(errorMessage);
      }
    });
  };

  useEffect(() => {}, [dispatch]);

  return (
    <div className="flex min-h-screen w-[100vw] flex-col bg-muted/40">
      <Tabs defaultValue="week" className="w-full h-full">
        <TabsContent value="week">
          <Card className="w-full h-full">
            <CardHeader className="flex gap-4 sm:justify-between sm:flex-row sm:items-center">
              <CardTitle>Manage Your Projects</CardTitle>
              <Button className="w-fit" onClick={handleReturnToDashboard}>
                Return to Dashboard
              </Button>
            </CardHeader>
            <CardContent className="w-full h-full">
              <Table className="w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead>Banner</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Stack
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Deployed
                    </TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects && projects.length > 0 ? (
                    projects.map((element) => (
                      <TableRow className="bg-accent" key={element._id}>
                        <TableCell>
                          <img
                            src={element.projectBanner?.url}
                            alt={element.title}
                            className="w-16 h-16 object-cover"
                          />
                        </TableCell>
                        <TableCell>{element.title}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          {element.stack}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {element.deployed}
                        </TableCell>
                        <TableCell className="flex gap-2">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Link to={`/view/project/${element._id}`}>
                                  <Button  className="border-2 rounded-full bg-green-200
                                      justify-center items-center text-green-600  hover:text-slate-950 
                                      hover:bg-green-600">
                                    <Eye className="h-5 w-5" />
                                  </Button >
                                </Link>
                              </TooltipTrigger>
                              <TooltipContent side="bottom">
                                View
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Link to={`/update/project/${element._id}`}>
                                  <Button className="border-2 rounded-full bg-yellow-200
                                      justify-center items-center text-yellow-600  hover:text-slate-950 
                                      hover:bg-yellow-600">
                                    <Pen className="h-5 w-5" />
                                  </Button>
                                </Link>
                              </TooltipTrigger>
                              <TooltipContent side="bottom">
                                Edit
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button className="border-2 rounded-full bg-red-200
                                      justify-center items-center text-red-600  hover:text-slate-950 
                                      hover:bg-red-600"
                                  onClick={() =>
                                    handleProjectDelete(element._id)
                                  }
                                >
                                  <Trash2 className="h-5 w-5" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent side="bottom">
                                Delete
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="text-center text-lg font-semibold"
                      >
                        You have not added any projects yet.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ManageProjects;
