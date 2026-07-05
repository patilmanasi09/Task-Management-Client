

import React, { useEffect, useState } from "react";
import { getMyTasksAPI } from "../api/api";
import { Link } from "react-router-dom";

const MyTasks = () => {
  const [tasks, setTasks] = useState([]);

  const fetchMyTasks = async () => {
    try {
      const res = await getMyTasksAPI();

      console.log("API Response:", res);

      setTasks(res.tasks || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMyTasks();
  }, []);

  return (
    <div className="container mt-4">
      <h2>My Assigned Tasks</h2>

      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Status</th>
            <th>Start Date</th>
            <th>End Date</th>
          </tr>
        </thead>

        <tbody>
         {tasks.length > 0 ? (
  tasks
    .filter((item) => item !== null)   // 🔥 IMPORTANT FIX
    .map((item) => (
      <tr key={item.id}>
        <td>{item.id}</td>

        <td>
          <Link to={`/task-details/${item.id}`}>
            {item.title}
          </Link>
        </td>

        <td>{item.status}</td>

        <td>
          {item.startDate ? item.startDate.slice(0, 10) : "-"}
        </td>

        <td>
          {item.endDate ? item.endDate.slice(0, 10) : "-"}
        </td>
      </tr>
    ))
) : (
            <tr>
              <td colSpan="5" className="text-center py-5">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/7486/7486804.png"
                  width="120"
                  alt="No Tasks"
                />

                <h5 className="mt-3 text-secondary">
                  No Assigned Tasks
                </h5>

                <p className="text-muted">
                  You don't have any assigned tasks yet.
                </p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MyTasks;