import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditTask = () => {
    const { ID } = useParams();
    const navigate = useNavigate();

    const [task, setTask] = useState({
        title: "",
        description: "",
        status: "Pending",
        startDate: "",
        endDate: "",
    });

    const getTask = async () => {
        try {
            const res = await axiosInstance.get(
                `/task/getTask/${ID}`
            );

            const data = res.data.task;

            setTask({
                title: data.title || "",
                description: data.description || "",
                status: data.status || "Pending",
                startDate: data.startDate
                    ? data.startDate.slice(0, 10)
                    : "",
                endDate: data.endDate
                    ? data.endDate.slice(0, 10)
                    : "",
            });
        } catch (error) {
            console.log(error);
            toast.error("Failed to load task");
        }
    };

    useEffect(() => {
        getTask();
    }, []);

    const handleChange = (e) => {
        setTask({
            ...task,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axiosInstance.put(
                `/task/updateTask/${ID}`,
                task
            );

            toast.success(res.data.msg);

            navigate("/all-tasks");
        } catch (error) {
            console.log(error);
            toast.error(
                error.response?.data?.msg ||
                "Failed to update task"
            );
        }
    };

    return (
        <div className="d-flex justify-content-center mt-4">
            <div
                className="card shadow p-4"
                style={{
                    width: "900px",
                    maxWidth: "95%",
                }}
            >
                <h2 className="mb-4">Edit Task</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">
                            Title
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            name="title"
                            value={task.title}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">
                            Description
                        </label>

                        <textarea
                            className="form-control"
                            rows="4"
                            name="description"
                            value={task.description}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">
                            Status
                        </label>

                        <select
                            className="form-control"
                            name="status"
                            value={task.status}
                            onChange={handleChange}
                        >
                            <option value="Pending">
                                Pending
                            </option>

                            <option value="Inprogress">
                                Inprogress
                            </option>

                            <option value="Completed">
                                Completed
                            </option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">
                            Start Date
                        </label>

                        <input
                            type="date"
                            className="form-control"
                            name="startDate"
                            value={task.startDate}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">
                            End Date
                        </label>

                        <input
                            type="date"
                            className="form-control"
                            name="endDate"
                            value={task.endDate}
                            onChange={handleChange}
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                    >
                        Update Task
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditTask;