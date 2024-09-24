import React, { useEffect, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ManageSkills from "./pages/ManageSkills";
import ManageTimeline from "./pages/ManageTimeline";
import ManageProjects from "./pages/ManageProjects";
import ViewProject from "./pages/ViewProject";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UpdateProject from "./pages/UpdateProject";
import LoadingBar from "react-top-loading-bar";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { getMessages } from "./redux/slices/messageSlice";
import { getTimeline } from "./redux/slices/timelineSlice";
import { getSkill } from "./redux/slices/skillSlice";
import { getApplication } from "./redux/slices/applicationSlice";
import { getProject } from "./redux/slices/projectSlice";

function App() {
  const dispatch = useDispatch();
  const loadingRef = useRef();
  const isLoading = useSelector((state) => state.user.loading);

  useEffect(() => {
    if (isLoading) {
      loadingRef.current?.continuousStart();
    } else {
      loadingRef.current?.complete();
    }
  });

  useEffect(() => {
    dispatch(getMessages());
    dispatch(getTimeline());
    dispatch(getSkill());
    dispatch(getApplication());
    dispatch(getProject());
  }, []);
  return (
    <>
      <LoadingBar color="red" ref={loadingRef} />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/password/forgot" element={<ForgotPassword />}></Route>
        <Route
          path="/password/reset/:token"
          element={<ResetPassword />}
        ></Route>
        <Route path="/manage/skills" element={<ManageSkills />}></Route>
        <Route path="/manage/timeline" element={<ManageTimeline />}></Route>
        <Route path="/manage/projects" element={<ManageProjects />}></Route>
        <Route
          path="/view/project/:projectId"
          element={<ViewProject />}
        ></Route>
        <Route
          path="/update/project/:projectId"
          element={<UpdateProject />}
        ></Route>
      </Routes>
      <ToastContainer position="bottom-right" theme="dark" />
    </>
  );
}

export default App;
