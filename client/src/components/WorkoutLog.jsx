import React, { useState } from "react";
import NavBar from "./NavBar";
import PopWork from "./PopWork";
import { createBatchLog } from "../api/workoutLogApi";

const WorkoutLog = () => {
  const [finalData, setFinalData] = useState(null);
  const [message, setMessage] = useState(
    "Congratulations on completing your routine"
  );

  const useApiToCreate = async (logs) => {
    for (const log of logs) {
      await createBatchLog(log);
    }
  };

  const handleSubmit = async (data) => {
    // Format the final data as per the requirement
    const formattedData = data.workoutIdsArray.map(
      (workoutId, workoutIndex) => {
        const sets = Array.from(
          { length: data.setsArray[workoutIndex] },
          (_, setIndex) => {
            return {
              setNumber: setIndex + 1,
              reps: data.repsArray[workoutIndex][setIndex] || 0,
              weight: data.weightsArray[workoutIndex][setIndex] || 0,
            };
          }
        );

        return {
          workoutId,
          sets,
        };
      }
    );

    // Store the formatted data in the state
    setFinalData(formattedData);
    try {
      await useApiToCreate(formattedData);
    } catch (error) {
      console.error("Error submitting workout log", error);
    }
  };

  return (
    <div>
      <NavBar nav2="nav2" />
      <PopWork onSubmit={handleSubmit} message={message} />

      <div className="list-group w-100">
        <div className="d-flex flex-row-reverse p-4"></div>
      </div>
    </div>
  );
};

export default WorkoutLog;
