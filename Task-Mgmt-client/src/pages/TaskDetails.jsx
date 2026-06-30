import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useParams } from "react-router-dom";

const TaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);

  useEffect(() => {
    fetchTask();
  }, []);

  const fetchTask = async () => {
    try {
      const res = await axiosInstance.get(`/task/getTaskByID/${id}`);
      setTask(res.data.task);
    } catch (error) {
      console.log(error);
    }
  };

  if (!task) {
    return <h4 className="text-center mt-5">Loading...</h4>;
  }

  return (
    <div className="container mt-4">
      <h2>{task.title}</h2>
      <p className="text-muted">{task.description}</p>

      {/* TIMELINE */}
      <div className="card p-3 mt-4 shadow">
        <h5>Task Timeline</h5>

        <ul className="list-group">

          <li className="list-group-item">
            <strong>Created:</strong>{" "}
            {new Date(task.createdAt).toLocaleString()}
          </li>

          <li className="list-group-item">
            <strong>Started:</strong>{" "}
            {task.startedAt
              ? new Date(task.startedAt).toLocaleString()
              : "Not Started Yet"}
          </li>

          <li className="list-group-item">
            <strong>Completed:</strong>{" "}
            {task.completedAt
              ? new Date(task.completedAt).toLocaleString()
              : "Not Completed Yet"}
          </li>

        </ul>
      </div>
    </div>
  );
};

export default TaskDetails;