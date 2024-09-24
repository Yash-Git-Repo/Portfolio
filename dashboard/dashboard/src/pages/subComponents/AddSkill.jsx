import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { addSkill } from "@/redux/slices/skillSlice";
import { useNavigate } from "react-router-dom";

const AddSkill = () => {
  const navigate = useNavigate()
  const [title, setTitle] = useState("");
  const [proficiency, setProficiency] = useState("");
  const [icon, setIcon] = useState("");
  const [iconPreview, setIconPreview] = useState("");

  const handleIcon = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setIconPreview(reader.result);
      setIcon(file);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const dispatch = useDispatch();
  const handleAddNewSkill = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("proficiency", proficiency);
    formData.append("icon", icon);

    dispatch(addSkill(formData)).then((result) => {
      if (addSkill.fulfilled.match(result)) {
        toast.success("Skill added successfully");
        setTitle("");
        setProficiency("");
        setIcon("");
        setIconPreview("");
        navigate('/')
      } else if (addSkill.rejected.match(result)) {
        const errorMessage = result.payload || "Something went wrong. Please try again.";
        toast.error(errorMessage);
      }
    });
  };

  return (
    <div className="flex justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-14">
      <form className="w-[100%] px-5 md:w-[650px]" onSubmit={handleAddNewSkill}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="font-semibold leading-7 text-gray-900 text-3xl text-center">
              ADD A NEW SKILL
            </h2>
            <div className="mt-10 flex flex-col gap-5">
              <div className="w-full sm:col-span-4">
                <label className="block text-sm font-medium leading-6 text-gray-900">Title</label>
                <div className="mt-2">
                  <input
                    type="text"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="React.JS"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full sm:col-span-4">
                <label className="block text-sm font-medium leading-6 text-gray-900">Proficiency</label>
                <div className="mt-2">
                  <input
                    type="number"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="30"
                    value={proficiency}
                    onChange={(e) => setProficiency(e.target.value)}
                  />
                </div>
              </div>

              <div className="w-full col-span-full">
                <label className="block text-sm font-medium leading-6 text-gray-900">Skill Icon</label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    {iconPreview ? (
                      <img className="mx-auto h-12 w-12 text-gray-300" src={iconPreview} alt="Icon preview" />
                    ) : (
                      <div className="mx-auto h-12 w-12 text-gray-300">No Icon</div>
                    )}
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          onChange={handleIcon}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Button type="submit" className="w-full">Add Skill</Button>
        </div>
      </form>
    </div>
  );
};

export default AddSkill;
