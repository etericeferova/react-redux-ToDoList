import React from "react";
import TaskList from "../components/TaskList";
import StatusFilter from "../components/StatusFilter";
import TaskCounter from "../components/TaskCounter";

const Tasks = () => {
  return (
    <div>
      <h1>Tasks Page</h1>
      <TaskCounter />
      <StatusFilter />
      <TaskList />
    </div>
  );
};

export default Tasks;
