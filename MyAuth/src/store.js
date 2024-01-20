import {configureStore} from '@reduxjs/toolkit';
import todosSlice from './features/todos/todosSlice';
import authSlice from './features/auth/authSlice';

export const store = configureStore({
  reducer: {
    todos: todosSlice,
    auth: authSlice,
  },
});
