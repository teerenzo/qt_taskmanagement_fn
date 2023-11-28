import {createAsyncThunk} from '@reduxjs/toolkit';

export const fetchTasks = createAsyncThunk(
    'tasks/fetchTasks',
    async (data, thunkAPI) => {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/tasks`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        });
        const result = await response.json();
        if (response.status === 200) {
            return result.tasks;
        } else {
            return thunkAPI.rejectWithValue(result);
        }
    }
);


// fetch tasks by id
export const fetchTaskById = createAsyncThunk(
    'tasks/fetchTaskById',
    async (id, thunkAPI) => {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/tasks/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        });
        const result = await response.json();
        if (response.status === 200) {
            return result;
        } else {
            return thunkAPI.rejectWithValue(result);
        }
    }
);