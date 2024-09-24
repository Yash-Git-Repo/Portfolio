import { useNavigate } from "react-router-dom";
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
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Trash2 } from "lucide-react";
import { deleteTimeline, getTimeline } from "@/redux/slices/timelineSlice";

const ManageTimeline = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const timeline = useSelector((state) => state.timeline.timeline);

  const handleReturnToDashboard = () => {
    navigate("/");
  };

  const handleDeleteTimeline = (id) => {
    dispatch(deleteTimeline(id)).then((result) => {
      if (deleteTimeline.fulfilled.match(result)) {
        toast.success("Timeline deleted successfully");
        dispatch(getTimeline());
      } else if (deleteTimeline.rejected.match(result)) {
        const errorMessage =
          result.payload || "Some error occurred. Please try again.";
        toast.error(errorMessage);
      }
    });
  };

  useEffect(() => {
    // if (error) {
    //   toast.error(error);
    //   dispatch(clearAllTimelineErrors());
    // }
    // if (message) {
    //   toast.success(message);
    //   dispatch(resetTimelineSlice());
    //   dispatch(getAllTimeline());
    // }
  }, [dispatch]);

  return (
    <div className="flex min-h-screen w-[99vw] flex-col bg-muted/40">
      <Tabs defaultValue="week">
        <TabsContent value="week">
          <Card>
            <CardHeader className="flex gap-4 sm:justify-between sm:flex-row sm:items-center">
              <CardTitle>Manage Your Timeline</CardTitle>
              <Button className="w-fit" onClick={handleReturnToDashboard}>
                Return to Dashboard
              </Button>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead className="md:table-cell">Description</TableHead>
                    <TableHead className="md:table-cell">From</TableHead>
                    <TableHead className="md:table-cell">To</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {timeline.length > 0 ? (
                    timeline.map((element) => {
                      return (
                        <TableRow className="bg-accent" key={element._id}>
                          <TableCell className="font-medium">
                            {element.title}
                          </TableCell>
                          <TableCell className="md:table-cell">
                            {element.description}
                          </TableCell>
                          <TableCell className="md:table-cell">
                            {element.timeline.from}
                          </TableCell>
                          <TableCell className="md:table-cell">
                            {element.timeline.to ? element.timeline.to : "____"}
                          </TableCell>
                          <TableCell className="flex justify-end">
                            <button
                              className="border-red-600 border-2 rounded-full h-8 w-8 flex 
                              justify-center items-center text-red-600  hover:text-slate-50 hover:bg-red-600"
                              onClick={() => handleDeleteTimeline(element._id)}
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow className="text-2xl">
                      <TableCell>You have not added any timeline.</TableCell>
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

export default ManageTimeline;
