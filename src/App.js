import React from "react";
import "./App.css";
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login.jsx";
import Navbar from "./components/navbar";
import Signup from "./components/signup";
import Dashboard from "./components/dashboard/Dashboard.jsx";
import Profile from "./components/profile.jsx";
import EditPassword from "./components/editPassword.jsx";
import TasksScreen from "./screens/tasks.jsx";
import AddTaskScreen from "./screens/addTask.jsx";
import TaskDetailsScreen from "./screens/taskDetails.jsx";


import NotFound from "./components/notFound";
import Landing from "./components/landing"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/change-password" element={<EditPassword />} />
          <Route path="/tasks" element={<TasksScreen />} />
          <Route path="/add-task" element={<AddTaskScreen />} />
          <Route path="/tasks/:id" element={<TaskDetailsScreen />} />
     
        
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
