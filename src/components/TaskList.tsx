import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AppState,
  addTask,
  deleteTask,
  toggleStatus,
  changeFilterStatus,
  Task,
  editTask,
} from "../redux/store";

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: AppState) => state.tasks);
  const filterStatus = useSelector((state: AppState) => state.filters.status);

  const [newTaskText, setNewTaskText] = useState("");
  const [searchText, setSearchText] = useState("");
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [editedTaskText, setEditedTaskText] = useState("");

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

  const handleEditTask = (id: number, text: string) => {
    setIsEditing(id);
    setEditedTaskText(text);
  };

  const handleSaveEditTask = (id: number) => {
    if (editedTaskText.trim()) {
      dispatch(editTask({ id, text: editedTaskText }));
      setIsEditing(null);
      setEditedTaskText("");
    }
  };

  const handleCancelEditTask = () => {
    setIsEditing(null);
    setEditedTaskText("");
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          placeholder="Enter new task"
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>

      <div>
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search Task"
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
            {isEditing === task.id ? (
              <div>
                <input
                  type="text"
                  value={editedTaskText}
                  onChange={(e) => setEditedTaskText(e.target.value)}
                />
                <button onClick={() => handleSaveEditTask(task.id)}>
                  Save
                </button>
                <button onClick={handleCancelEditTask}>Cancel</button>
              </div>
            ) : (
              <div>
                <span>{task.text}</span>
                <button onClick={() => handleToggleStatus(task.id)}>
                  {task.completed ? "Activate" : "Complete"}
                </button>
                <button onClick={() => handleDeleteTask(task.id)}>
                  Delete
                </button>
                <button onClick={() => handleEditTask(task.id, task.text)}>
                  Edit
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
