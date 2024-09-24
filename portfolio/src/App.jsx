import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProjectView from "./pages/ProjectView";
import Footer from "./pages/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div >
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/project/:id" element={<ProjectView />}></Route>
      </Routes>
      <Footer />
      <ToastContainer position ="bottom-right" theme="dark" />
    </div>
  );
}

export default App;
