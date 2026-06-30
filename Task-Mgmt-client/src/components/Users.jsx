import React, { useEffect, useState } from "react";
import { getAllUsers } from "../api/api";


const Users = () => {
 const [users, setUsers] = useState([]);

const fetchUser = async () => {
  try {
    const res = await getAllUsers();

    console.log(res);

    setUsers(res.users);
  } catch (error) {
    console.log(error);
  }
};

    useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="container mt-4">
      <h2>User Information</h2>

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Contact Number</th>
            <th>Role</th>
          </tr>
        </thead>

       <tbody>
  {users.map((user) => (
    <tr key={user.id}>
      <td>{user.id}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.contactNumber}</td>
      <td>{user.role}</td>
    </tr>
  ))}
</tbody>
      </table>
    </div>
  );
};

export default Users;