import React, { useRef, useState } from "react";
import { registerUser } from "../api/api";
import { toast } from "react-toastify";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaUserCircle,
  FaTrash,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const fileInputRef = useRef(null);

  const [imgPath, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    contactNumber: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImage(null);
    setPreview(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = new FormData();

      payload.append("name", formData.name);
      payload.append("email", formData.email);
      payload.append("password", formData.password);
      payload.append("contactNumber", formData.contactNumber);

      if (imgPath) {
        payload.append("imgPath", imgPath);
      }

      const res = await registerUser(payload);

      toast.success(res.msg || "Registration Successful");

      setFormData({
        name: "",
        email: "",
        password: "",
        contactNumber: "",
      });

      setImage(null);
      setPreview(null);

      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.msg || "Registration Failed");
    }
  };

  return (
    <div
      className="container py-5"
      style={{
        minHeight: "100vh",
      }}
    >
      <div className="row justify-content-center">
        <div className="col-lg-5 col-md-7">
          <div className="card shadow">
            <div className="card-header bg-primary text-white text-center">
              <h3>Register</h3>
            </div>

            <div className="card-body"></div>
                          {/* Profile Preview */}
              <div className="text-center mb-4">
                <div className="d-flex justify-content-center align-items-center">

                  {preview ? (
                    <img
                      src={preview}
                      alt="Profile Preview"
                      style={{
                        width: "120px",
                        height: "120px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        border: "3px solid #0d6efd",
                      }}
                    />
                  ) : (
                    <FaUserCircle
                      size={120}
                      color="#6c757d"
                    />
                  )}

                  {preview && (
                    <button
                      type="button"
                      className="btn btn-danger ms-3"
                      onClick={removeImage}
                    >
                      <FaTrash className="me-2" />
                   
                    </button>
                  )}
                </div>
              </div>

              <form onSubmit={handleSubmit}>

                {/* Name */}
                <div className="mb-3">
                  <label className="form-label">Name</label>

                  <div className="input-group">
                    <span className="input-group-text">
                      <FaUser />
                    </span>

                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter Name"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label className="form-label">Email</label>

                  <div className="input-group">
                    <span className="input-group-text">
                      <FaEnvelope />
                    </span>

                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter Email"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="mb-3">
                  <label className="form-label">Password</label>

                  <div className="input-group">
                    <span className="input-group-text">
                      <FaLock />
                    </span>

                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter Password"
                      required
                    />
                  </div>
                </div>

                {/* Contact Number */}
                <div className="mb-3">
                  <label className="form-label">Contact Number</label>

                  <div className="input-group">
                    <span className="input-group-text">
                      <FaPhone />
                    </span>

                    <input
                      type="text"
                      className="form-control"
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleChange}
                      placeholder="Enter Contact Number"
                      required
                    />
                  </div>
                </div>

                {/* Profile Image */}
                <div className="mb-3">
                  <label className="form-label">Profile Image</label>

                  <input
                    ref={fileInputRef}
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
                                {/* Register Button */}
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                >
                  Register
                </button>

              </form>

              <p className="text-center mt-3">
                Already have an account?{" "}
                <Link to="/">Login</Link>
              </p>

            </div>
          </div>
        </div>
      </div>
   
  );
};

export default Register;