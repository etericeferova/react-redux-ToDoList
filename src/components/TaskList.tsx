import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AppState,
  addTask,
  deleteTask,
  toggleStatus,
  changeFilterStatus,
  Task,
} from "../redux/store";

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: AppState) => state.tasks);
  const filterStatus = useSelector((state: AppState) => state.filters.status);

  const [searchText, setSearchText] = useState("");
  const [newTaskText, setNewTaskText] = useState("");

  const handleAddTask = () => {
    if (newTaskText.trim()) {
      const newTask: Task = {
        id: Date.now(),
        text: newTaskText,
        completed: false,
      };
      dispatch(addTask(newTask));
      setNewTaskText("");
    }
  };

  const handleDeleteTask = (id: number) => {
    dispatch(deleteTask({ id }));
  };

  const handleToggleStatus = (id: number) => {
    dispatch(toggleStatus(id));
  };

  const handleChangeFilter = (status: "all" | "active" | "completed") => {
    dispatch(changeFilterStatus(status));
  };

  const filteredTasks = tasks
    .filter((task) => {
      if (filterStatus === "all") return true;
      if (filterStatus === "completed") return task.completed;
      if (filterStatus === "active") return !task.completed;
      return true;
    })
    .filter((task) =>
      task.text.toLowerCase().includes(searchText.toLowerCase())
    );

  return (
    <div>
      <div>
        <input
          type="text"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          placeholder="Enter a new task"
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>

      <div>
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search"
        />
      </div>

      <div>
        <button onClick={() => handleChangeFilter("all")}>All</button>
        <button onClick={() => handleChangeFilter("active")}>Active</button>
        <button onClick={() => handleChangeFilter("completed")}>
          Completed
        </button>
      </div>

      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id}>
            <span>{task.text}</span>
            <button onClick={() => handleToggleStatus(task.id)}>
              {task.completed ? "Activate" : "Complete"}
            </button>
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
