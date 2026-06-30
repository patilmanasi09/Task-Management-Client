

import React, { useEffect, useMemo, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useUser } from "../context/UserContext";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

const Dashboard = () => {
  const { user } = useUser();

  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 6;

 // ✅ REAL MONTHLY DATA FROM BACKEND
  const [monthlyData, setMonthlyData] = useState([]);
  
 useEffect(() => {
  if (user) {
    fetchTasks();
     fetchMonthlyData();
  }
}, [user]);

const fetchTasks = async () => {
  try {
    let res;

    if (user?.role === "admin") {
      // Admin ko sabhi tasks dikhenge
      res = await axiosInstance.get("/task/getAll");
      setTasks(res.data.tasks || []);
    } else {
      // User ko sirf assigned tasks dikhenge
      res = await axiosInstance.get("/assign-task/getTasksByUser");
      setTasks(res.data.tasks || []);
    }
  } catch (error) {
    console.log(error);
  }
};

  // ✅ FIXED MONTHLY API CALL
  const fetchMonthlyData = async () => {
    try {
      const res = await axiosInstance.get("/task/tasks-per-month");
      setMonthlyData(res.data.data || []);
    } catch (error) {
      console.log("Monthly API error:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/task/delete/${id}`);
      alert("Task Deleted Successfully");
      fetchTasks();
    } catch (error) {
      console.log(error.response?.data || error);
      alert("Delete Failed");
    }
  };

  const handleUpdate = async () => {
    try {
      await axiosInstance.put(`/task/updateTask/${selectedTask.id}`, {
        title: selectedTask.title,
        description: selectedTask.description,
        status: selectedTask.status,
        startDate: selectedTask.startDate,
        endDate: selectedTask.endDate,
      });

      alert("Task Updated Successfully");
      fetchTasks();
      setSelectedTask(null);
    } catch (error) {
      console.log(error.response?.data || error);
      alert("Update Failed");
    }
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const statusMatch =
        filter === "All" || task.status === filter;

      const searchMatch = task.title
        .toLowerCase()
        .includes(search.toLowerCase());

      return statusMatch && searchMatch;
    });
  }, [tasks, filter, search]);

  const indexOfLast = currentPage * tasksPerPage;
  const indexOfFirst = indexOfLast - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(
    filteredTasks.length / tasksPerPage
  );

  const badgeColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-success";
      case "Pending":
        return "bg-warning text-dark";
      case "Inprogress":
        return "bg-danger";
      default:
        return "bg-secondary";
    }
  };

    // ✅ PIE DATA (unchanged)
  const pieData = useMemo(() => [
    { name: "Pending", value: tasks.filter(t => t.status === "Pending").length },
    { name: "Inprogress", value: tasks.filter(t => t.status === "Inprogress").length },
    { name: "Completed", value: tasks.filter(t => t.status === "Completed").length },
  ], [tasks]);

  const COLORS = ["#ffc107", "#dc3545", "#198754"];

  // ✅ FIXED BAR DATA (REAL BACKEND DATA)
  const barData = useMemo(() => {
    return monthlyData.map((item) => ({
      month: item.month,   // "2026-01"
      tasks: item.count    // number
    }));
  }, [monthlyData]);


  return (
    <div
      className="container-fluid py-3"
      style={{
        height: "calc(100vh - 150px)",
        overflowY: "auto",
      }}
    >
      <h2 className="text-center fw-bold mb-4">
        📋 Task Dashboard
      </h2>

      {/* Dashboard Cards */}

      <div className="row g-3 mb-4">

        <div className="col-md-3">
          <div
            className="card text-center bg-primary text-white shadow"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setFilter("All");
              setCurrentPage(1);
            }}
          >
            <div className="card-body">
              <h5>All Tasks</h5>
              <h2>{tasks.length}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div
            className="card text-center bg-warning shadow"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setFilter("Pending");
              setCurrentPage(1);
            }}
          >
            <div className="card-body">
              <h5>Pending</h5>
              <h2>
                {
                  tasks.filter(
                    (t) => t.status === "Pending"
                  ).length
                }
              </h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div
            className="card text-center bg-danger text-white shadow"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setFilter("Inprogress");
              setCurrentPage(1);
            }}
          >
            <div className="card-body">
              <h5>In Progress</h5>
              <h2>
                {
                  tasks.filter(
                    (t) => t.status === "Inprogress"
                  ).length
                }
              </h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div
            className="card text-center bg-success text-white shadow"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setFilter("Completed");
              setCurrentPage(1);
            }}
          >
            <div className="card-body">
              <h5>Completed</h5>
              <h2>
                {
                  tasks.filter(
                    (t) => t.status === "Completed"
                  ).length
                }
              </h2>
            </div>
          </div>
        </div>



      </div>

      {/* ================= CHARTS ================= */}
      <div className="row mb-5">

        {/* PIE */}
        <div className="col-md-6">
          <h5 className="text-center">Task Status</h5>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={120}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>

              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* BAR */}
        <div className="col-md-6">
          <h5 className="text-center">Tasks Per Month</h5>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="tasks" fill="#0d6efd" />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* Search */}

      <div className="row mb-4">
        <div className="col-md-6 mx-auto">
          <input
            className="form-control"
            placeholder="🔍 Search task by title..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      {/* Task Cards */}

      <div className="row">

        {currentTasks.length > 0 ? (

          currentTasks.map((task) => (

            <div className="col-lg-4 col-md-6 mb-4" key={task.id}>

              <div className="card shadow h-100">

                <div className="card-body">

                  <h4>{task.title}</h4>

                  <p className="text-muted">
                    {task.description}
                  </p>

                  <span className={`badge ${badgeColor(task.status)}`}>
                    {task.status}
                  </span>

                  <hr />

                  <p>
                    <strong>Start Date :</strong>{" "}
                    {new Date(task.startDate).toLocaleDateString()}
                  </p>

                  <p>
                    <strong>End Date :</strong>{" "}
                    {new Date(task.endDate).toLocaleDateString()}
                  </p>

                  {user?.role === "admin" && (
                    // <div className="d-flex gap-2 mt-3">

                    //   <button
                    //     className="btn btn-warning w-100"
                    //     data-bs-toggle="modal"
                    //     data-bs-target="#updateModal"
                    //     onClick={() => setSelectedTask(task)}
                    //   >
                    //     Update
                    //   </button>

                    //   <button
                    //     className="btn btn-danger w-100"
                    //     onClick={() => handleDelete(task.id)}
                    //   >
                    //     Delete
                    //   </button>

                    // </div>
                    <div className="d-flex gap-2 mt-3">
                      <button
                        className="btn btn-warning w-100"
                        data-bs-toggle="modal"
                        data-bs-target="#updateModal"
                        onClick={() => setSelectedTask(task)}
                      >
                        Update
                      </button>

                      <button
                        className="btn btn-danger w-100"
                        onClick={() => handleDelete(task.id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}

                </div>

              </div>

            </div>

          ))

        ) : (

          <div className="text-center mt-5">

            <img
              src="https://cdn-icons-png.flaticon.com/512/7486/7486804.png"
              width="120"
              alt="No Tasks"
            />

            <h4 className="mt-3">
              No Tasks Available
            </h4>

            <p className="text-muted">
              No task matches your search.
            </p>

          </div>

        )}
      </div>
      {/* Pagination */}

      {totalPages > 1 && (
        <div className="d-flex justify-content-center align-items-center mt-4 gap-2">

          <button
            className="btn btn-outline-primary"
            disabled={currentPage === 1}
            onClick={() =>
              setCurrentPage((prev) => prev - 1)
            }
          >
            Previous
          </button>

          {Array.from(
            { length: totalPages },
            (_, index) => (
              <button
                key={index}
                className={`btn ${currentPage === index + 1
                    ? "btn-primary"
                    : "btn-outline-primary"
                  }`}
                onClick={() =>
                  setCurrentPage(index + 1)
                }
              >
                {index + 1}
              </button>
            )
          )}

          <button
            className="btn btn-outline-primary"
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage((prev) => prev + 1)
            }
          >
            Next
          </button>

        </div>
      )}

      {/* Update Modal */}

      <div
        className="modal fade"
        id="updateModal"
        tabIndex="-1"
      >
        <div className="modal-dialog">
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title">
                Update Task
              </h5>

              <button
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            <div className="modal-body">

              {selectedTask && (
                <>

                  <input
                    type="text"
                    className="form-control mb-3"
                    value={selectedTask.title}
                    onChange={(e) =>
                      setSelectedTask({
                        ...selectedTask,
                        title: e.target.value,
                      })
                    }
                  />

                  <textarea
                    className="form-control mb-3"
                    rows="3"
                    value={selectedTask.description}
                    onChange={(e) =>
                      setSelectedTask({
                        ...selectedTask,
                        description: e.target.value,
                      })
                    }
                  />

                  <select
                    className="form-select mb-3"
                    value={selectedTask.status}
                    onChange={(e) =>
                      setSelectedTask({
                        ...selectedTask,
                        status: e.target.value,
                      })
                    }
                  >
                    <option value="Pending">
                      Pending
                    </option>

                    <option value="Inprogress">
                      In Progress
                    </option>

                    <option value="Completed">
                      Completed
                    </option>
                  </select>

                  <label className="form-label">
                    Start Date
                  </label>

                  <input
                    type="date"
                    className="form-control mb-3"
                    value={
                      selectedTask.startDate?.slice(0, 10) ||
                      ""
                    }
                    onChange={(e) =>
                      setSelectedTask({
                        ...selectedTask,
                        startDate: e.target.value,
                      })
                    }
                  />

                  <label className="form-label">
                    End Date
                  </label>

                  <input
                    type="date"
                    className="form-control"
                    value={
                      selectedTask.endDate?.slice(0, 10) ||
                      ""
                    }
                    onChange={(e) =>
                      setSelectedTask({
                        ...selectedTask,
                        endDate: e.target.value,
                      })
                    }
                  />
                </>
              )}

            </div>

            <div className="modal-footer">

              <button
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>

              <button
                className="btn btn-success"
                data-bs-dismiss="modal"
                onClick={handleUpdate}
              >
                Save Changes
              </button>

            </div>

          </div>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;