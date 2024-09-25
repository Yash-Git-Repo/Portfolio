import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import { deleteSkill, getSkill, updateSkill } from "@/redux/slices/skillSlice";

const ManageSkills = () => {
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const skills = useSelector((state) => state.skills.Skill);

  const handleReturnToDashboard = () => {
    navigateTo("/");
  };

  const [newProficiency, setNewProficiency] = useState(1);
  const handleInputChange = (proficiency) => {
    setNewProficiency(proficiency);
  };

  const handleUpdateSkill = (skillId) => {
    dispatch(updateSkill({ skillId, newProficiency })).then((result) => {
      if (updateSkill.fulfilled.match(result)) {
        toast.success("Skill updated successfully");
        dispatch(getSkill());
      } else if (updateSkill.rejected.match(result)) {
        const errorMessage =
          result.payload || "Some error occurred. Please try again.";
        toast.error(errorMessage);
      }
    });
  };

  const handleDeleteSkill = (skillId) => {
    dispatch(deleteSkill(skillId)).then((result) => {
      if (deleteSkill.fulfilled.match(result)) {
        toast.success("Skill deleted successfully");
        dispatch(getSkill());
      } else if (deleteSkill.rejected.match(result)) {
        const errorMessage =
          result.payload || "Some error occurred. Please try again.";
        toast.error(errorMessage);
      }
    });
  };

  useEffect(() => {
    dispatch(getSkill());
  }, [dispatch]);

  return (
    <div className="flex min-h-screen w-[99vw] flex-col bg-muted/40">
      <Tabs defaultValue="week">
        <TabsContent value="week">
          <Card>
            <CardHeader className="flex gap-4 sm:justify-between sm:flex-row sm:items-center">
              <CardTitle>Manage Your Skills</CardTitle>
              <Button className="w-fit" onClick={handleReturnToDashboard}>
                Return to Dashboard
              </Button>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-4">
              {skills.length === 0 ? (
                <div className="text-center text-lg font-semibold">
                  You have not added any skills yet.
                </div>
              ) : (
                skills.map((element) => (
                  <Card key={element._id}>
                    <CardHeader className="text-3xl font-bold flex items-center justify-between flex-row">
                      {element.title}
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Trash2
                              onClick={() => handleDeleteSkill(element._id)}
                              className="h-5 w-5 hover:text-red-500"
                            />
                          </TooltipTrigger>
                          <TooltipContent side="right" style={{ color: "red" }}>
                            Delete
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </CardHeader>
                    <CardFooter>
                      <Label className="text-2xl mr-2">Proficiency:</Label>
                      <Input
                        type="number"
                        defaultValue={element.proficiency}
                        onChange={(e) => handleInputChange(e.target.value)}
                        onBlur={() => handleUpdateSkill(element._id)}
                      />
                    </CardFooter>
                  </Card>
                ))
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ManageSkills;
