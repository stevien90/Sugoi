import axiosInstance from "../utils/axios";

const createUser = async (userData) => {
  try {
    const response = await axiosInstance.post("/users/register", userData);
    return response.data;
  } catch (error) {
    console.error(error.response.data.message);
    throw error;
  }
};

const loginUser = async (userData) => {
  try {
    const response = await axiosInstance.post("/users/login", userData);

    return response.data;
  } catch (error) {
    console.error(error.response.data.message);
    throw error;
  }
};

const logOutUser = async () => {
  try {
    const response = await axiosInstance.post("/users/logout");

    return response.data;
  } catch (error) {
    console.error(error.response.data.message);
    throw error;
  }
};

export { createUser, loginUser, logOutUser };
