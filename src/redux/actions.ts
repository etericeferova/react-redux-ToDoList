import { createAction } from "@reduxjs/toolkit";
import {
  TASKS_ADD_TASK,
  TASKS_CHANGE_FILTER_STATUS,
  TASKS_DELETE_TASKS,
} from "./constants";
import { Task } from "./store";

type AddTaskPayload = {
  id: number;
  text: string;
  completed: boolean;
};

type ChangeFilterStatusPayload = "all" | "active" | "completed";

const addTask = createAction<AddTaskPayload>(TASKS_ADD_TASK);
const toggleStatus = createAction<number>("tasks/toggleStatus");
const changeStatusFilter = createAction<ChangeFilterStatusPayload>(
  TASKS_CHANGE_FILTER_STATUS
);
const deleteTask = createAction<{ id: number }>(TASKS_DELETE_TASKS);

export { addTask, changeStatusFilter, deleteTask, toggleStatus };
