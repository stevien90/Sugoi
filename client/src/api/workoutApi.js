import axiosInstance from "../utils/axios";

const createWorkout = async (workoutData) => {
  try {
    const response = await axiosInstance.post("/workout/create", workoutData);
    // for testing delete later
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error(error.response.data.message);
    throw error;
  }
};

const retrieveWorkout = async (routineId) => {
  try {
    const response = await axiosInstance.get(`/workout/retrieve/${routineId}`);

    return response.data;
  } catch (error) {
    console.error(error.response?.data?.message || error.message);
    throw error;
  }
};

export { createWorkout, retrieveWorkout };
