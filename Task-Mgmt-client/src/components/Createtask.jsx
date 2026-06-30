import React, { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "./CreateTask.css"

const Createtask = () => {
  const navigate = useNavigate();

  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "Pending",
    startDate: "",
    endDate: "",
  });

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axiosInstance.post("/task/create", task);
      alert("Task Created Successfully");

      setTask({
        title: "",
        description: "",
        status: "Pending",
        startDate: "",
        endDate: "",
      });

      navigate("/all-tasks");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to Create Task");
    }
  };

  return (
    <div className="glass-bg">
       <button
    className="back-btn"
    onClick={() => navigate(-1)}
  >
    ← Back
  </button>
      <div className="glass-card">

        {/* Header */}
        <div className="glass-header">
          <h2>Create New Task</h2>
          <p>Start something new—capture your next task here ✍️</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="glass-form">

          <div className="input-group">
            <label>Task Title</label>
            <input
              type="text"
              name="title"
              value={task.title}
              onChange={handleChange}
              placeholder="Enter task title"
              required
            />
          </div>

          <div className="input-group">
            <label>Description</label>
            <textarea
              name="description"
              value={task.description}
              onChange={handleChange}
              placeholder="Enter task description"
              rows="4"
              required
            />
          </div>

          <div className="input-group">
            <label>Status</label>
            <select name="status" value={task.status} onChange={handleChange}>
              <option>Pending</option>
              <option>InProgress</option>
              <option>Completed</option>
            </select>
          </div>

          <div className="row-fields">
            <div className="input-group">
              <label>Start Date</label>
              <input
                type="date"
                name="startDate"
                value={task.startDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>End Date</label>
              <input
                type="date"
                name="endDate"
                value={task.endDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="button-group">
            <button type="submit" className="btn-primary">
              Create Task
            </button>

            <button
              type="button"
              className="btn-secondary"
              onClick={() =>
                setTask({
                  title: "",
                  description: "",
                  status: "Pending",
                  startDate: "",
                  endDate: "",
                })
              }
            >
              Reset
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

export default Createtask;