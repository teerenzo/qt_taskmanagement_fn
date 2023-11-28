import {createSlice} from '@reduxjs/toolkit';
import { fetchTasks,fetchTaskById } from './actions/tasks';

const initialState = {
    tasks: [],
    error: { payload: null, status: false },
    loading: false,
    task: {},
};

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        setTasks(state, action) {
            state.tasks = action.payload;
        },
        setTask(state, action) {
            state.task = action.payload;
        },
        addTask(state, action) {
            state.tasks.push(action.payload);
        },
        updateTask(state, action) {
            const index = state.tasks.findIndex((task) => task.id === action.payload.id);
            state.tasks[index] = action.payload;
        },
        deleteTask(state, action) {
            const index = state.tasks.findIndex((task) => task.id === action.payload);
            state.tasks.splice(index, 1);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTasks.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchTasks.fulfilled, (state, action) => {
            state.loading = false;
            state.tasks = action.payload;
            state.error = { payload: null, status: false };
        });
        builder.addCase(fetchTasks.rejected, (state, action) => {
            state.loading = false;
            state.error = { payload: action.payload, status: true };
        }
        );
        builder.addCase(fetchTaskById.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchTaskById.fulfilled, (state, action) => {
            state.loading = false;
            state.task = action.payload;
            state.error = { payload: null, status: false };
        });
        builder.addCase(fetchTaskById.rejected, (state, action) => {
            state.loading = false;
            state.error = { payload: action.payload, status: true };
        }
        );
    },
});

export const { setTasks, setTask, addTask, updateTask, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;