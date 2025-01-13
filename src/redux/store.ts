import {
  Action,
  configureStore,
  createAction,
  createReducer,
  PayloadAction,
} from "@reduxjs/toolkit";

export type StatusFilterType = "all" | "active" | "completed";

export type Task = {
  id: number;
  text: string;
  completed: boolean;
};

export type AppState = {
  tasks: Task[];
  filters: { status: StatusFilterType };
};

const initialState: AppState = {
  tasks: [
    { id: 0, text: "Learn HTML and CSS", completed: true },
    { id: 1, text: "Get good at JavaScript", completed: true },
    { id: 2, text: "Master React", completed: false },
    { id: 3, text: "Discover Redux", completed: false },
    { id: 4, text: "Build amazing apps", completed: false },
  ],
  filters: {
    status: "completed",
  },
};

export const addTask = createAction<Task>("tasks/addTask");
export const deleteTask = createAction<{ id: number }>("tasks/deleteTask");
export const toggleStatus = createAction<number>("tasks/toggleStatus");
export const changeFilterStatus = createAction<StatusFilterType>(
  "tasks/changeFilterStatus"
);
export const editTask = createAction<{ id: number; text: string }>(
  "tasks/editTask"
);

const rootReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(
      changeFilterStatus,
      (state, action: PayloadAction<StatusFilterType>) => {
        state.filters.status = action.payload;
      }
    )
    .addCase(addTask, (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    })
    .addCase(deleteTask, (state, action: PayloadAction<{ id: number }>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload.id);
    })
    .addCase(toggleStatus, (state, action: PayloadAction<number>) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    })
    .addCase(
      editTask,
      (state, action: PayloadAction<{ id: number; text: string }>) => {
        const task = state.tasks.find((task) => task.id === action.payload.id);
        if (task) {
          task.text = action.payload.text;
        }
      }
    );
});

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
