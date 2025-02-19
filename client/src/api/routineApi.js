import axiosInstance from "../utils/axios";

const createRoutine = async (routineData) => {
  try {
    const response = await axiosInstance.post("/routines/create", routineData);
    return response.data;
  } catch (error) {
    console.error(error.response.data.message);
    throw error;
  }
};

const retrieveRoutine = async (userId) => {
  try {
    const response = await axiosInstance.get(`/routines/retrieve/${userId}`);

    return response.data; // Ensure response has a data property
  } catch (error) {
    console.error(error.response?.data?.message || error.message);
    throw error;
  }
};

export { createRoutine, retrieveRoutine };
