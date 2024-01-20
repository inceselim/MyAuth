import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
export const getTodos = createAsyncThunk('todoList/getTodos', async () => {
  let response = await fetch('http://192.168.5.250:5200/todos');
  let json = await response.json();
  return json;
});

const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    todoList: [],
    status: null,
  },
  reducers: {
    addTodo(state, action) {
      state.todoList.push({
        id: 1,
        title: action.payload,
        completed: false,
      });
    },
    toggleTodo(state, action) {
      console.log('toggling');
      const todo = state.todoList.find(td => td.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo(state, action) {
      console.log('deleting');
      state.todoList = state.todoList.filter(td => td.id !== action.payload);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getTodos.fulfilled, (state, action) => {
        let updatedTodos = state.todoList.concat(action.payload);
        state.todoList = updatedTodos;
        state.status = null;
      })
      .addCase(getTodos.pending, (state, action) => {
        state.todoList = [];
        state.status = 'Fetching todos. Please wait a moment...';
      })
      .addCase(getTodos.rejected, (state, action) => {
        state.todoList = [];
        state.status = 'Failed to fetch data...';
      });
  },
});
export const {addTodo, toggleTodo, deleteTodo} = todosSlice.actions;

export default todosSlice.reducer;
