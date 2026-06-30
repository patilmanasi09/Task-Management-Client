import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { assignTaskToUserAPI } from "../api/api";
import Select from "react-select";

const AssignTaskModal = ({
  show,
  handleClose,
  task,
  users,
}) => {
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleAssignTask = async () => {
    if (selectedUsers.length === 0) {
      return toast.error("Please select users");
    }

    try {
      const payload = {
        taskID: Number(task?.id),
        userIDs: selectedUsers,
      };

      console.log("PAYLOAD:", payload);

      const res = await assignTaskToUserAPI(payload);

      toast.success(res.msg);

      setSelectedUsers([]);
      handleClose();
    } catch (error) {
      console.log(error.response?.data);

      toast.error(
        error.response?.data?.msg || "Server Error"
      );
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Assign Task</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="mb-3">
          <label className="form-label">Task</label>

          <input
            className="form-control"
            value={task?.title || ""}
            readOnly
          />
        </div>

 <Select
  isMulti
  options={users.map((user) => ({
    value: user.id,
    label: `${user.name} (${user.email})`,
  }))}
  value={users
    .filter((user) =>
      selectedUsers.includes(user.id)
    )
    .map((user) => ({
      value: user.id,
      label: `${user.name} (${user.email})`,
    }))}
  onChange={(selected) =>
    setSelectedUsers(
      selected.map((item) => item.value)
    )
  }
/>
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={handleClose}
        >
          Close
        </Button>

        <Button
          variant="primary"
          onClick={handleAssignTask}
        >
          Assign Task
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AssignTaskModal;