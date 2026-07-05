import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { Link, useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaEdit,
  FaTrash,
  FaUserPlus,
} from "react-icons/fa";
import AssignTaskModal from "./AssignTaskModal";
import "./AllTasks.css";

const AllTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);

  // Loading Spinner
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [month, setMonth] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [showAssignModal, setShowAssignModal] =
    useState(false);

  const [selectedTask, setSelectedTask] =
    useState(null);

  const navigate = useNavigate();

  const recordsPerPage = 10;

  // Highlight Search Text
  const highlightText = (text) => {
    if (!search) return text;

    const regex = new RegExp(`(${search})`, "gi");

    return text.split(regex).map((part, index) =>
      part.toLowerCase() === search.toLowerCase() ? (
        <mark
          key={index}
          style={{
            backgroundColor: "#ffe066",
            padding: "2px 4px",
            borderRadius: "4px",
            fontWeight: "bold",
          }}
        >
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  // Fetch Tasks
  const fetchTasks = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.get(
        "/task/getAll"
      );

      setTasks(res.data.tasks || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch Users
  const fetchUsers = async () => {
    try {
      const res = await axiosInstance.get(
        "/user/all-users"
      );

      setUsers(res.data.users || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchUsers();
  }, []);

  // Assign Modal
  const openAssignModal = (task) => {
    setSelectedTask(task);
    setShowAssignModal(true);
  };

  const closeAssignModal = () => {
    setShowAssignModal(false);
    setSelectedTask(null);
  };

  // Delete Task
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) return;

    try {
      await axiosInstance.delete(
        `/task/delete/${id}`
      );

      fetchTasks();
    } catch (error) {
      console.log(error);
      alert("Failed to delete task");
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const matchSearch =
      task.title
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      task.description
        ?.toLowerCase()
        .includes(search.toLowerCase());

    const matchStatus =
      filter === "All" ||
      task.status === filter;

    const taskMonth = task.endDate
      ? new Date(task.endDate).getMonth() + 1
      : "";

    const matchMonth = month
      ? taskMonth === Number(month)
      : true;

    return (
      matchSearch &&
      matchStatus &&
      matchMonth
    );
  });

  const totalPages = Math.ceil(
    filteredTasks.length / recordsPerPage
  );

  const indexOfLastRecord =
    currentPage * recordsPerPage;

  const indexOfFirstRecord =
    indexOfLastRecord - recordsPerPage;

  const currentTasks = filteredTasks.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  // Loading Spinner
  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "70vh" }}
      >
        <div className="text-center">
          <div
            className="spinner-border text-primary"
            style={{
              width: "4rem",
              height: "4rem",
            }}
            role="status"
          >
            <span className="visually-hidden">
              Loading...
            </span>
          </div>

          <h5 className="mt-3 text-primary">
            Loading Tasks...
          </h5>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
  {/* Back Button */}
  <button
    className="back-btnn"
    onClick={() => navigate(-1)}
  >
    <FaArrowLeft /> Back
  </button>

  {/* Header */}
  <div className="header">
    <h2>All Task Manager</h2>
  </div>

  {/* Search & Filters */}
  <div className="filterBar">
    <input
      type="text"
      placeholder="Search Tasks..."
      value={search}
      onChange={(e) => {
        setSearch(e.target.value);
        setCurrentPage(1);
      }}
    />

    <select
      value={filter}
      onChange={(e) => {
        setFilter(e.target.value);
        setCurrentPage(1);
      }}
    >
      <option value="All">All Status</option>
      <option value="Pending">Pending</option>
      <option value="Inprogress">InProgress</option>
      <option value="Completed">Completed</option>
    </select>

    <select
      value={month}
      onChange={(e) => {
        setMonth(e.target.value);
        setCurrentPage(1);
      }}
    >
      <option value="">Month Wise Search</option>
      <option value="1">January</option>
      <option value="2">February</option>
      <option value="3">March</option>
      <option value="4">April</option>
      <option value="5">May</option>
      <option value="6">June</option>
      <option value="7">July</option>
      <option value="8">August</option>
      <option value="9">September</option>
      <option value="10">October</option>
      <option value="11">November</option>
      <option value="12">December</option>
    </select>
  </div>

  {/* Task Table */}
  <div className="table-responsive">
    <table className="table table-bordered table-hover align-middle">
      <thead className="table-dark">
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Description</th>
          <th>Status</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th width="180">Actions</th>
        </tr>
      </thead>

      <tbody>
        {currentTasks.length > 0 ? (
          currentTasks.map((task) => (
            <tr key={task.id}>
              <td>{task.id}</td>

              <td>
                <Link
                  to={`/task-details/${task.id}`}
                  className="task-link"
                  style={{
                    color: "#0d6efd",
                    textDecoration: "none",
                    fontWeight: "600",
                  }}
                >
                  {highlightText(task.title)}
                </Link>
              </td>

              <td>{task.description}</td>

              <td>
                <span
                  className={`badge ${
                    task.status === "Completed"
                      ? "bg-success"
                      : task.status === "InProgress"
                      ? "bg-warning text-dark"
                      : "bg-danger"
                  }`}
                >
                  {task.status}
                </span>
              </td>

              <td>
                {task.startDate
                  ? new Date(task.startDate)
                      .toISOString()
                      .slice(0, 10)
                  : "-"}
              </td>

              <td>
                {task.endDate
                  ? new Date(task.endDate)
                      .toISOString()
                      .slice(0, 10)
                  : "-"}
              </td>

              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() =>
                    navigate(
                      `/dashboard/edit-task/${task.id}`
                    )
                  }
                >
                  <FaEdit />
                </button>

                <button
                  className="btn btn-danger btn-sm me-2"
                  onClick={() =>
                    handleDelete(task.id)
                  }
                >
                  <FaTrash />
                </button>

                <button
                  className="btn btn-info btn-sm text-white"
                  onClick={() =>
                    openAssignModal(task)
                  }
                >
                  <FaUserPlus />
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="7">
              <div className="text-center py-5">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/7486/7486804.png"
                  alt="No Tasks"
                  width="120"
                />

                <h4 className="mt-3 text-secondary">
                  No Tasks Found
                </h4>

                <p className="text-muted">
                  There are no tasks available at the moment.
                </p>
              </div>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
        {/* Pagination */}
      {totalPages > 0 && (
        <div className="d-flex justify-content-center mt-4">
          <nav>
            <ul className="pagination">

              <li
                className={`page-item ${
                  currentPage === 1 ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() =>
                    setCurrentPage(currentPage - 1)
                  }
                >
                  Previous
                </button>
              </li>

              {[...Array(totalPages)].map((_, index) => (
                <li
                  key={index}
                  className={`page-item ${
                    currentPage === index + 1
                      ? "active"
                      : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() =>
                      setCurrentPage(index + 1)
                    }
                  >
                    {index + 1}
                  </button>
                </li>
              ))}

              <li
                className={`page-item ${
                  currentPage === totalPages
                    ? "disabled"
                    : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() =>
                    setCurrentPage(currentPage + 1)
                  }
                >
                  Next
                </button>
              </li>

            </ul>
          </nav>
        </div>
      )}

      {/* Assign Task Modal */}
      <AssignTaskModal
        show={showAssignModal}
        handleClose={closeAssignModal}
        task={selectedTask}
        users={users}
      />
    </div>
  );
};

export default AllTasks;