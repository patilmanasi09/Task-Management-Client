import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);

  useEffect(() => {
    fetchTask();
  }, []);

  const fetchTask = async () => {
    try {
      const res = await axiosInstance.get("/task/getAll");

      const selectedTask = res.data.tasks.find(
        (item) => item.id === Number(id)
      );

      setTask(selectedTask);
    } catch (error) {
      console.log(error);
    }
  };

  if (!task)
    return <h3 className="text-center mt-5">Loading...</h3>;

  // Progress Percentage
  const progress =
    task.status === "Pending"
      ? 25
      : task.status === "InProgress"
      ? 60
      : 100;

  return (
    <div
      className="container-fluid"
      style={{
        minHeight: "calc(100vh - 70px)",
        padding: "20px",
      }}
    >
      {/* Back Button */}
      <div className="mb-4">
        <button
          className="btn btn-secondary"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>
      </div>

      {/* Center Card */}
      <div
        className="d-flex justify-content-center align-items-start"
        style={{
          minHeight: "calc(100vh - 180px)",
          paddingTop: "10px",
        }}
      >
        <div
          className="card shadow"
          style={{
            width: "700px",
            borderRadius: "15px",
          }}
        >
          <div className="card-header bg-primary text-white">
            <h3 className="mb-0">{task.title}</h3>
          </div>

          <div className="card-body p-4">

            <h5>Description</h5>
            <p>{task.description}</p>

            <hr />

            {/* Status Progress */}
            {/* Task Status */}
<div className="mb-4">
  <div className="d-flex justify-content-between align-items-center mb-2">
    <h6 className="mb-0 fw-bold">Task Progress</h6>

    <span
      className={`badge px-3 py-2 ${
        task.status === "Completed"
          ? "bg-success"
          : task.status === "InProgress"
          ? "bg-warning text-dark"
          : "bg-danger"
      }`}
    >
      {task.status}
    </span>
  </div>

  <div
    className="progress shadow-sm"
    style={{
      height: "22px",
      borderRadius: "20px",
      backgroundColor: "#e9ecef",
    }}
  >
    <div
      className={`progress-bar progress-bar-striped ${
        task.status === "Completed"
          ? "bg-success"
          : task.status === "InProgress"
          ? "bg-warning text-dark"
          : "bg-danger"
      } ${
        task.status !== "Completed" ? "progress-bar-animated" : ""
      }`}
      role="progressbar"
      style={{
        width: `${progress}%`,
        fontWeight: "600",
      }}
    >
      {progress}%
    </div>
  </div>

  <div className="d-flex justify-content-between mt-2">
    <small className="text-muted">Task Started</small>
    <small className="fw-semibold">{progress}% Completed</small>
  </div>
</div>

            <div className="row">

              <div className="col-md-6 mb-3">
                <strong>Start Date</strong>
                <p>
                  {task.startDate
                    ? task.startDate.slice(0, 10)
                    : "-"}
                </p>
              </div>

              <div className="col-md-6 mb-3">
                <strong>End Date</strong>
                <p>
                  {task.endDate
                    ? task.endDate.slice(0, 10)
                    : "-"}
                </p>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Created At</strong>
                <p>
                  {task.createdAt
                    ? task.createdAt.slice(0, 10)
                    : "-"}
                </p>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Updated At</strong>
                <p>
                  {task.updatedAt
                    ? task.updatedAt.slice(0, 10)
                    : "-"}
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;