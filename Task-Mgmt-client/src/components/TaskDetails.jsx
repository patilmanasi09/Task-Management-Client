import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

const TaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);

  const fetchTask = async () => {
    try {
      const res = await axiosInstance.get(`/task/get/${id}`);
      setTask(res.data.task);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTask();
  }, [id]);

  const timeline = (task) => {
    return [
      { label: "Created", date: task?.createdAt },
      { label: "Started", date: task?.startDate },
      { label: "Completed", date: task?.endDate },
    ];
  };

  return (
    <div className="container mt-4">
      {task ? (
        <>
          <h2>{task.title}</h2>
          <p>{task.description}</p>

          <h5>📌 Task Timeline</h5>

          <ul className="list-group">
            {timeline(task).map((t, i) => (
              <li key={i} className="list-group-item">
                <b>{t.label}:</b>{" "}
                {t.date
                  ? new Date(t.date).toLocaleString()
                  : "Not yet"}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default TaskDetails;