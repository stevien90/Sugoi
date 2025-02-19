import { React, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { retrieveWorkout } from "../api/workoutApi";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import TimerPopup from "./Timer";
import { Collapse } from "@mui/material";
import Box from "@mui/material/Box";

const PopWork = ({ onSubmit, message }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const routineId = location.state.routineId;
  const routineName = location.state.routineName;
  const [workoutIdsArray, setWorkoutIdsArray] = useState([]);
  const [workoutNamesArray, setWorkoutNamesArray] = useState([]);
  const [setsArray, setSetsArray] = useState([]);
  const [repsArray, setRepsArray] = useState([]); // Array of arrays for reps
  const [weightsArray, setWeightsArray] = useState([]); // Array of arrays for weights
  const [breakTimeArray, setBreakTimeArray] = useState([]);
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    const getWorkoutListByRoutineId = async () => {
      try {
        const data = await retrieveWorkout(routineId);

        const workoutDetails = data.routine.map(
          ({ workout_id, workout_name, sets, reps, break_time, weights }) => {
            return {
              workout_id,
              workout_name,
              sets,
              reps,
              break_time,
              weights,
            };
          }
        );

        // Separate into different arrays
        const ids = workoutDetails.map(({ workout_id }) => workout_id);
        const names = workoutDetails.map(({ workout_name }) => workout_name);
        const setCounts = workoutDetails.map(({ sets }) => sets);
        const breakTimeCounts = workoutDetails.map(
          ({ break_time }) => break_time
        );

        // Initialize reps and weights as arrays of empty arrays for each workout
        const initialReps = workoutDetails.map(() => []);
        const initialWeights = workoutDetails.map(() => []);

        // Update state with separate arrays
        setWorkoutIdsArray(ids);
        setWorkoutNamesArray(names);
        setSetsArray(setCounts);
        setRepsArray(initialReps); // Initialize empty arrays for each workout
        setWeightsArray(initialWeights); // Initialize empty arrays for each workout
        setBreakTimeArray(breakTimeCounts);
      } catch (error) {
        console.error(error.message);
      }
    };

    if (routineId) {
      getWorkoutListByRoutineId();
    }
  }, [routineId]);

  const handleCollapseToggle = (workoutId) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [workoutId]: !prevExpanded[workoutId],
    }));
  };

  const handleInputChange = (workoutIndex, setIndex, field, value) => {
    if (field === "reps") {
      setRepsArray((prevReps) => {
        const newReps = [...prevReps];
        // Ensure we have a sufficient number of reps for the current workout
        while (newReps[workoutIndex].length <= setIndex) {
          newReps[workoutIndex].push(""); // Initialize empty entries
        }
        newReps[workoutIndex][setIndex] = value;
        return newReps;
      });
    } else if (field === "weights") {
      setWeightsArray((prevWeights) => {
        const newWeights = [...prevWeights];
        // Ensure we have a sufficient number of weights for the current workout
        while (newWeights[workoutIndex].length <= setIndex) {
          newWeights[workoutIndex].push(""); // Initialize empty entries
        }
        newWeights[workoutIndex][setIndex] = value;
        return newWeights;
      });
    }
  };

  const handleSubmit = () => {
    // Collect the final data (reps, weights, etc.)
    const finalData = {
      workoutIdsArray,
      workoutNamesArray,
      setsArray,
      repsArray,
      weightsArray,
      breakTimeArray,
    };

    // Send the final data to the parent component
    onSubmit(finalData);
    alert(message);
    navigate("/Home");
  };

  return (
    <div>
      <Box
        component="section"
        sx={{ p: 4, border: "1px solid grey", fontSize: 50 }}
      >
        Routine: {routineName}
      </Box>

      {workoutIdsArray.map((workoutId, workoutIndex) => (
        <div key={workoutId}>
          <div
            className="list-group-item list-group-item-action d-flex gap-3 py-3"
            aria-current="true"
            onClick={() => handleCollapseToggle(workoutId)}
          >
            <FitnessCenterIcon style={{ fontSize: "40px" }} />
            <div className="d-flex gap-2 w-100 justify-content-between align-items-center">
              <div className="d-flex flex-column justify-content-center w-100 text-center">
                <h6 className="mb-0" style={{ fontSize: "30px" }}>
                  {workoutNamesArray[workoutIndex]}
                </h6>
              </div>
            </div>
          </div>

          <Collapse in={expanded[workoutId]}>
            <div className="w-100 p-3">
              <div className="d-flex flex-row-reverse p-1">
                <TimerPopup breakTime={breakTimeArray[workoutIndex]} />
              </div>

              {/* Create inputs for reps and weights based on the sets */}
              {Array.from(
                { length: setsArray[workoutIndex] },
                (_, setIndex) => (
                  <form className="p-2 mb-2 bg-body-tertiary" key={setIndex}>
                    <div className="mb-2">
                      <label
                        htmlFor={`reps-${workoutId}-${setIndex}`}
                        className="form-label"
                      >
                        Set {setIndex + 1} - Reps
                      </label>
                      <input
                        id={`reps-${workoutId}-${setIndex}`}
                        type="number"
                        className="form-control"
                        autoComplete="false"
                        placeholder="Enter reps"
                        value={repsArray[workoutIndex][setIndex] || ""}
                        onChange={(e) =>
                          handleInputChange(
                            workoutIndex,
                            setIndex,
                            "reps",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div className="mb-2">
                      <label
                        htmlFor={`weights-${workoutId}-${setIndex}`}
                        className="form-label"
                      >
                        Set {setIndex + 1} - Weights
                      </label>
                      <input
                        id={`weights-${workoutId}-${setIndex}`}
                        type="number"
                        className="form-control"
                        autoComplete="false"
                        value={weightsArray[workoutIndex][setIndex] || ""}
                        onChange={(e) =>
                          handleInputChange(
                            workoutIndex,
                            setIndex,
                            "weights",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </form>
                )
              )}
            </div>
          </Collapse>
        </div>
      ))}
      <button
        type="submit"
        className="btn btn-primary w-100 btn-lg mt-4"
        style={{ fontSize: "1.5rem" }}
        onClick={handleSubmit}
      >
        Submit Workout
      </button>
    </div>
  );
};

export default PopWork;
