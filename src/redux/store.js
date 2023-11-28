import { configureStore } from '@reduxjs/toolkit'
import usersSlice from './features/usersSlice'
import tasksSlice from './features/tasksSlice'

export const store = configureStore({
  reducer: {
    users: usersSlice,
    tasks: tasksSlice,
  },
})