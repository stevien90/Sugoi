import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import CustomButtons from "./CustomButtons"; // assuming Button is a custom component
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { retrieveRoutine, createRoutine } from "../api/routineApi";
import { createWorkout } from "../api/workoutApi";

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();

  //The state to handle collapsible form
  const [isFormVisible, setFormVisible] = useState(false);
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [routineList, setRoutineList] = useState([]);
  const [workouts, SetWorkouts] = useState([
    { workoutName: "", sets: 3, reps: 10, breakTime: 1, weights: 10 },
  ]);

  useEffect(() => {
    const getRoutines = async () => {
      try {
        const data = await retrieveRoutine(userId);
        setRoutineList(data.routine);
      } catch (error) {
        console.error(error.message);
      }
    };

    if (userId) {
      getRoutines();
    }
  }, [userId]); // Run the effect whenever userId changes
  // Empty dependency array ensures this runs only once when the component mounts

  //Function to setFormVisibility when button is pressed
  const toggleFormVisibility = () => {
    setFormVisible(!isFormVisible);
  };

  //Function to add another workout form if user press add workout
  const addWorkoutField = (e) => {
    e.preventDefault(); //Turn off button feature to refresh page
    SetWorkouts([
      ...workouts,
      {
        workoutName: "",
        sets: 3,
        reps: 10,
        breakTime: 1,
        weights: 10,
      }, // this adds the new form with the existing ones
    ]);
  };

  const useApiToCreate = async (workouts) => {
    for (const workout of workouts) {
      await createWorkout(workout);
    }
  };

  //Handle input change for each workout field
  const handleInputChange = (index, event) => {
    const newWorkouts = [...workouts];
    const { name, value } = event.target;
    newWorkouts[index] = { ...newWorkouts[index], [name]: value };
    SetWorkouts(newWorkouts);
  };

  //Handle Routine form submission (query create routines, query new list of routines, query create new workout)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get the routine name from the form input
    const routineName = e.target.routineName.value;

    // Prepare the new routine data
    const newRoutineData = {
      userId: userId,
      routineName: routineName,
    };

    try {
      const newRoutine = await createRoutine(newRoutineData);
      const newRoutineId = newRoutine.routine.routine_id;
      const workoutsWithRoutineId = workouts.map((workout) => ({
        ...workout,
        routineId: newRoutineId, // attach the correct routineId to each workout
      }));

      await useApiToCreate(workoutsWithRoutineId);
    } catch (error) {
      console.error("Error creating workout:", error);
    }

    try {
      const updatedRoutines = await retrieveRoutine(userId);
      setRoutineList(updatedRoutines.routine);
      e.target.reset();
      setFormVisible(false);
    } catch (error) {
      console.error("Error retrieving routine:", error);
    }
  };

  //handle route when user choose a routine make sure to pass routine id to the next page
  const handleRoutineChoice = (routine) => {
    navigate("/LogWorkout", {
      state: {
        routineId: routine.routine_id,
        routineName: routine.routine_name,
        userId: userId,
      },
    });
  };

  return (
    <div>
      <NavBar />
      <div className="d-flex flex-column flex-md-row p-4 gap-4 py-md-5 align-items-center justify-content-center">
        <div className="list-group w-100">
          <h1>Routines</h1>

          {routineList.map((routine) => {
            return (
              <div
                className="list-group-item list-group-item-action d-flex gap-3 py-3"
                aria-current="true"
                onClick={() => {
                  handleRoutineChoice(routine);
                }}
                key={routine.routine_id}
              >
                <FitnessCenterIcon style={{ fontSize: "40px" }} />
                <div className="d-flex gap-2 w-100 justify-content-between align-items-center">
                  <div className="d-flex flex-column justify-content-center w-100 text-center">
                    <h6 className="mb-0">{routine.routine_name}</h6>
                  </div>
                  <small className="opacity-50 text-nowrap mx-auto">now</small>
                </div>
              </div>
            );
          })}

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
                        name="workoutName"
                        className="form-control"
                        placeholder="Workout Name"
                        value={workout.workoutName}
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
                        value={workout.weights}
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

export default Home;
