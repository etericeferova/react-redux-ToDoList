import React from "react";
import { useSelector } from "react-redux";
import { AppState } from "../redux/store";

const TaskCounter = () => {
  const tasks = useSelector((state: AppState) => state.tasks);

  const count = tasks.reduce(
    (acc, task) => {
      if (task.completed) {
        acc.completed += 1;
      } else {
        acc.active += 1;
      }

      return acc;
    },
    { active: 0, completed: 0 }
  );
  return (
    <div>
      <p>active: {count.active}</p>
      <p>completed:{count.completed}</p>
    </div>
  );
};

export default TaskCounter;
