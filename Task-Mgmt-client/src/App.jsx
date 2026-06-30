import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Layout from "./pages/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Createtask from "./components/Createtask";
import AllTasks from "./components/AllTasks";
import Users from "./components/Users";
import EditTask from "./components/EditTask";
import MyTasks from "./components/MyTasks";
import Profile from "./components/Profile";
import TaskDetails from "./components/TaskDetails";
import ChangePassword from "./pages/ChangePassword";

function App() {
  return (
    <>
      <ToastContainer position="top-right" />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-task" element={<Createtask />} />
          <Route path="/all-tasks" element={<AllTasks />} />
          <Route path="/users" element={<Users />} />
          <Route path="/dashboard/edit-task/:ID" element={<EditTask />} />
          <Route path="/my-tasks" element={<MyTasks />} />
          <Route path="/profile" element={<Profile />} />
          
          <Route
  path="/task-details/:id"
  element={<TaskDetails />}
/>
<Route path="/change-password" element={<ChangePassword />} />

        </Route>
      </Routes>
    </>
  );
}

export default App;