import axiosInstance from "./axiosInstance";

export const registerUser = async (userData) => {
  const res = await axiosInstance.post("/user/register", userData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },});
  return res.data;
};

export const loginUser = async (loginData) => {
  const res = await axiosInstance.post("/user/login", loginData);
  return res.data;
};

export const getUserInfo = async()=>{
    const res = await axiosInstance.get("/user/getUserInfo")
    return res.data
}

export const createTask = async (taskData) => {
  const res = await axiosInstance.post("/task/create", taskData);
  return res.data;
};

export const getAllTasks = async () => {
  const res = await axiosInstance.get("/task/getAll");
  return res.data;
};

export const updateTaskStatus = async () => {
  const res = await axiosInstance.get(`/task/updateStatus/${id}`);
  return res.data;
};

export const deleteTask = async () => {
  const res = await axiosInstance.get(`/task/delete/${id}`);
  return res.data;
};

export const getAllUsers = async () => {
  const res = await axiosInstance.get("/user/all-users");
  return res.data;
};


export const assignTaskToUserAPI = async (payload) => {
  const res = await axiosInstance.post("/assign-task/assign-task", payload);
  return res.data;
};

export const getMyTasksAPI = async () => {
  const res = await axiosInstance.get(
    "/assign-task/get-tasks-by-user"
  );

  return res.data;
};

export const updateProfile = async (formData) => {
    const res = await axiosInstance.put(
        "/user/updateProfile",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return res.data;
};
