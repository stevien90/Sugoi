import axiosInstance from "../utils/axios";

const createWorkoutLog = async (logData) => {
  try {
    const response = await axiosInstance.post("/logs/createLogs", logData);
    return response.data;
  } catch (error) {
    console.error(error.response.data.message);
    throw error;
  }
};

const createBatchLog = async (logData) => {
  try {
    const response = await axiosInstance.post("/logs/createBatchLogs", logData);
    return response.data;
  } catch (error) {
    console.error(error.response.data.message);
    throw error;
  }
};

const retrieveLog = async (workoutId) => {
  try {
    const response = await axiosInstance.get("/workout/logs", workoutId);

    return response.data;
  } catch (error) {
    console.error(error.response.data.message);
    throw error;
  }
};

export { createWorkoutLog, retrieveLog, createBatchLog };
