import React, { useState } from "react";
import NavBar from "./NavBar";
import CustomButtons from "./CustomButtons"; // assuming Button is a custom component
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import { Link, useLocation } from "react-router-dom";

const User = () => {
  // State to handle visibility of the collapsible form
  const [isFormVisible, setFormVisible] = useState(false);

  const location = useLocation();
  const userId = location.state?.userId;
  console.log(userId);

  // State to manage the workouts, with default values
  const [workouts, setWorkouts] = useState([
    {
      name: "",
      sets: 3, // Default value for sets (as integer)
      reps: 10, // Default value for reps (as integer)
      breakTime: 1, // Default value for break time (in minutes as integer)
      weight: "",
    },
  ]);

  // Handle toggle of form visibility
  const toggleFormVisibility = () => {
    setFormVisible(!isFormVisible);
  };

  // Handle adding new workout field
  const addWorkoutField = (e) => {
    e.preventDefault(); // Prevent the default button behavior
    setWorkouts([
      {
        name: "",
        sets: 3, // Default value for sets
        reps: 10, // Default value for reps
        breakTime: 1, // Default value for break time (in minutes)
        weight: "",
      },
      ...workouts, // Add new workout form above the existing ones
    ]);
  };

  // Handle input change for each workout field
  const handleInputChange = (index, event) => {
    const newWorkouts = [...workouts];
    newWorkouts[index][event.target.name] = event.target.value;
    setWorkouts(newWorkouts);
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted routine:", workouts);
  };

  return (
    <div>
      <NavBar nav2="nav2" />
      <div className="d-flex flex-column flex-md-row p-4 gap-4 py-md-5 align-items-center justify-content-center">
        <div className="list-group w-100">
          <Link
            to="/LogWorkout"
            className="list-group-item list-group-item-action d-flex gap-3 py-3"
            aria-current="true"
          >
            <FitnessCenterIcon style={{ fontSize: "40px" }} />
            <div className="d-flex gap-2 w-100 justify-content-between align-items-center">
              <div className="d-flex flex-column justify-content-center w-100 text-center">
                <h6 className="mb-0">Back and shoulders</h6>
              </div>
              <small className="opacity-50 text-nowrap mx-auto">now</small>
            </div>
          </Link>

          {/* Create New Routine */}
          <a
            href="#"
            className="list-group-item list-group-item-action d-flex gap-3 py-3"
            aria-current="true"
            onClick={toggleFormVisibility}
          >
            <div className="d-flex gap-2 w-100 justify-content-between">
              <div className="d-flex flex-column justify-content-center w-100 text-center ml-3">
                <h6 className="">Create New Routine</h6>
                <CustomButtons type="addBox" onClick={addWorkoutField} />
              </div>
            </div>
          </a>

          {/* Collapsible Form */}
          {isFormVisible && (
            <div className="mt-4 p-4 border rounded">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="text"
                    id="routineName"
                    className="form-control"
                    placeholder="Enter Routine Name"
                  />
                  <label htmlFor="routineName" className="form-label">
                    Routine Name
                  </label>
                </div>

                {/* Workout fields */}
                {workouts.map((workout, index) => (
                  <div key={index} className="mb-3">
                    <div className="d-flex flex-column gap-3">
                      {/* Workout Name */}

                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Workout Name"
                        value={workout.name}
                        onChange={(e) => handleInputChange(index, e)}
                      />
                      <label
                        htmlFor={`workoutName-${index}`}
                        className="form-label"
                      >
                        Workout Name
                      </label>

                      {/* Sets */}

                      <input
                        type="number"
                        name="sets"
                        id={`sets-${index}`}
                        className="form-control"
                        value={workout.sets}
                        onChange={(e) => handleInputChange(index, e)}
                        min="1"
                        max="10"
                        placeholder="Sets"
                      />
                      <label htmlFor={`sets-${index}`} className="form-label">
                        Sets
                      </label>

                      {/* Reps */}

                      <input
                        type="number"
                        name="reps"
                        id={`reps-${index}`}
                        className="form-control"
                        value={workout.reps}
                        onChange={(e) => handleInputChange(index, e)}
                        min="1"
                        max="20"
                        placeholder="Reps"
                      />
                      <label htmlFor={`reps-${index}`} className="form-label">
                        Reps
                      </label>

                      {/* Break Time */}

                      <input
                        type="number"
                        name="breakTime"
                        id={`breakTime-${index}`}
                        className="form-control"
                        value={workout.breakTime}
                        onChange={(e) => handleInputChange(index, e)}
                        min="1"
                        max="5"
                        placeholder="Break Time (min)"
                      />
                      <label
                        htmlFor={`breakTime-${index}`}
                        className="form-label"
                      >
                        Break Time
                      </label>

                      {/* Weight */}

                      <input
                        type="number"
                        name="weight"
                        id={`weight-${index}`}
                        className="form-control"
                        value={workout.weight}
                        onChange={(e) => handleInputChange(index, e)}
                        placeholder="Weight"
                      />
                      <label htmlFor={`weight-${index}`} className="form-label">
                        Initial Weight
                      </label>
                      <hr />
                    </div>
                  </div>
                ))}

                {/* Buttons */}
                <div className="d-flex justify-content-between">
                  {/* Add workout button */}
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={addWorkoutField}
                  >
                    <FitnessCenterIcon /> Add Another Workout
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Submit Routine
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default User;
