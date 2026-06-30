import React, { useState } from "react";
import axiosInstance from "../api/axiosInstance";

const ChangePassword = () => {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Frontend validation
    if (form.newPassword !== form.confirmPassword) {
      alert("New password and confirm password do not match");
      return;
    }

    try {
      const res = await axiosInstance.put("/user/change-password", {
        oldPassword: form.oldPassword,
        newPassword: form.newPassword,
      });

      alert(res.data.msg || "Password changed successfully");

      setForm({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      alert(error.response?.data?.msg || "Something went wrong");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow">
            <div className="card-header text-center bg-primary text-white">
              <h3>Change Password</h3>
            </div>

            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label>Old Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="oldPassword"
                    value={form.oldPassword}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label>New Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="newPassword"
                    value={form.newPassword}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                  />
                </div>

                <button className="btn btn-success w-100" type="submit">
                  Change Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;