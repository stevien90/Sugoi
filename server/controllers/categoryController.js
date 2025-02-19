import retrieveCategory from "../models/categoryWorkout.js";

const allCategory = async (req, res) => {
  try {
    const categories = await retrieveCategory(); // Get categories from the model

    res.status(200).json({
      message: "All categories received successfully",
      categories: categories, // Send categories in the response
    });
  } catch (err) {
    res.status(500).json({
      message: "The allCategory function in controller is causing the error",
      error: err.message,
    });
  }
};

export default allCategory;
