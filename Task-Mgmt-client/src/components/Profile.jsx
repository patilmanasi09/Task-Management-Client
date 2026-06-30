import React, { useEffect, useState } from "react";
import { updateProfile } from "../api/api";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const Profile = () => {
  const { user, fetchUser } = useUser();
  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    contactNumber: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        email: user.email || "",
        contactNumber: user.contactNumber || "",
      });

      setPreview(user.imgPath || "");
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("contactNumber", form.contactNumber);

      if (image) {
        formData.append("imgPath", image);
      }

      const res = await updateProfile(formData);

      if (res.success) {
        await fetchUser();
        setEditMode(false);
        setImage(null);
        alert("Profile Updated Successfully");
      } else {
        alert(res.msg);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="container mt-4 d-flex justify-content-center">
      <div className="card p-4 shadow" style={{ width: "500px" }}>
        <h3 className="text-center mb-3">My Profile</h3>

        <div className="text-center mb-3">
         <img
  src={
    preview
      ? preview
      : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
  }
  alt="Profile"
  width="110"
  height="110"
  className="rounded-circle border"
  style={{ objectFit: "cover" }}
/>

          {editMode && (
            <input
              type="file"
              className="form-control mt-3"
              onChange={handleImage}
            />
          )}
        </div>

        <div className="mb-3">
          <label>Name</label>

          {editMode ? (
            <input
              className="form-control"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
          ) : (
            <p>{user?.name}</p>
          )}
        </div>

        <div className="mb-3">
          <label>Email</label>

          {editMode ? (
            <input
              className="form-control"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          ) : (
            <p>{user?.email}</p>
          )}
        </div>

        <div className="mb-3">
          <label>Contact Number</label>

          {editMode ? (
            <input
              className="form-control"
              name="contactNumber"
              value={form.contactNumber}
              onChange={handleChange}
            />
          ) : (
            <p>{user?.contactNumber}</p>
          )}
        </div>

        <div className="mb-3">
          <label>Role</label>
          <p>{user?.role}</p>
        </div>

        {editMode ? (
          <div className="d-flex gap-2">
            <button
              className="btn btn-success w-50"
              onClick={handleUpdate}
            >
              Save
            </button>

            <button
              className="btn btn-secondary w-50"
              onClick={() => {
                setEditMode(false);
                setImage(null);

                setForm({
                  name: user.name,
                  email: user.email,
                  contactNumber: user.contactNumber,
                });

                setPreview(user.imgPath);
              }}
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            className="btn btn-primary w-100"
            onClick={() => setEditMode(true)}
          >
            Edit Profile
          </button>
        )}

        <button
          className="btn btn-danger w-100 mt-3"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;