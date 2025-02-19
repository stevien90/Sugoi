import { React, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { retrieveWorkout } from "../api/workoutApi";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import TimerPopup from "./Timer";
import { Collapse } from "@mui/material";
import Box from "@mui/material/Box";

const PopWork = ({ onWorkoutDataChange }) => {
  const location = useLocation();
  const routineId = location.state.routineId;
  const routineName = location.state.routineName;
  const [workoutList, setWorkoutList] = useState([]);
  const [expanded, setExpanded] = useState({});

  // Fetch the workout data from the API
  useEffect(() => {
    const getWorkoutListByRoutineId = async () => {
      try {
        const data = await retrieveWorkout(routineId);
        console.log(data.routine); // This will log your workout data

        setWorkoutList(data.routine);

        // Send workout data to parent component
        if (onWorkoutDataChange) {
          onWorkoutDataChange(data.routine);
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    if (routineId) {
      getWorkoutListByRoutineId();
    }
  }, [routineId, onWorkoutDataChange]);

  // Toggle collapse (show/hide) for each workout
  const handleCollapseToggle = (workoutId) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [workoutId]: !prevExpanded[workoutId],
    }));
  };

  // Handle changes in reps or weights input for each set
  const handleInputChange = (workoutId, setIndex, field, value) => {
    setWorkoutList((prevList) => {
      const updatedList = [...prevList];
      const workout = updatedList.find((w) => w.workout_id === workoutId);

      if (workout) {
        if (!workout.sets) workout.sets = []; // Initialize if not defined
        workout.sets[setIndex] = {
          ...workout.sets[setIndex],
          [field]: value,
        };
      }

      // Send the updated workout list to the parent component
      if (onWorkoutDataChange) {
        onWorkoutDataChange(updatedList);
      }

      return updatedList;
    });
  };

  return (
    <div>
      <Box
        component="section"
        sx={{ p: 4, border: "1px solid grey", fontSize: 50 }}
      >
        Routine: {routineName}
      </Box>

      {workoutList.map((workout) => (
        <div key={workout.workout_id}>
          <div
            className="list-group-item list-group-item-action d-flex gap-3 py-3"
            aria-current="true"
            onClick={() => handleCollapseToggle(workout.workout_id)}
          >
            <FitnessCenterIcon style={{ fontSize: "40px" }} />
            <div className="d-flex gap-2 w-100 justify-content-between align-items-center">
              <div className="d-flex flex-column justify-content-center w-100 text-center">
                <h6 className="mb-0" style={{ fontSize: "30px" }}>
                  {workout.workout_name}
                </h6>
              </div>
            </div>
          </div>

          {/* Collapsible Dropdown */}
          <Collapse in={expanded[workout.workout_id]}>
            <div className="w-100 p-3">
              <div className="d-flex flex-row-reverse p-1">
                <TimerPopup breakTime={workout.break_time} />
              </div>
              {/* Generate input fields based on sets */}
              {Array.from({ length: workout.sets }, (_, index) => (
                <form className="p-2 mb-2 bg-body-tertiary" key={index}>
                  <div className="mb-2">
                    <label
                      htmlFor={`reps-${workout.workout_id}-${index}`}
                      className="form-label"
                    >
                      Set {index + 1} - Reps
                    </label>
                    <input
                      id={`reps-${workout.workout_id}-${index}`}
                      type="number"
                      className="form-control"
                      autoComplete="false"
                      placeholder={`Reps for Set ${index + 1}`}
                      value={workout.sets?.[index]?.reps || ""}
                      onChange={(e) =>
                        handleInputChange(
                          workout.workout_id,
                          index,
                          "reps",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className="mb-2">
                    <label
                      htmlFor={`weights-${workout.workout_id}-${index}`}
                      className="form-label"
                    >
                      Set {index + 1} - Weights
                    </label>
                    <input
                      id={`weights-${workout.workout_id}-${index}`}
                      type="number"
                      className="form-control"
                      autoComplete="false"
                      value={workout.sets?.[index]?.weights || ""}
                      onChange={(e) =>
                        handleInputChange(
                          workout.workout_id,
                          index,
                          "weights",
                          e.target.value
                        )
                      }
                    />
                  </div>
                </form>
              ))}
            </div>
          </Collapse>
        </div>
      ))}
    </div>
  );
};

export default PopWork;
