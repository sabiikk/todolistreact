import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    todoList: [],
    sortCriteria: "All",
};

const ToDoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        setToDoList: (state, action) => {
            state.todoList = action.payload;
        },
        addTodo: (state, action) => {
            state.todoList.push({
                task: action.payload.task,
                id: action.payload.id,
                completed: false, // All new tasks are incomplete by default
            });
        },
        updateTodo: (state, action) => {
            const { id, task } = action.payload;
            const index = state.todoList.findIndex((todo) => todo.id === id);
            if (index !== -1) {
                state.todoList[index].task = task;
            }
        },
        deleteTodo: (state, action) => {
            const { id } = action.payload;
            state.todoList = state.todoList.filter((todo) => todo.id !== id);
        },
        // New action to toggle completion status
        toggleComplete: (state, action) => {
            const { id } = action.payload;
            const index = state.todoList.findIndex((todo) => todo.id === id);
            if (index !== -1) {
                state.todoList[index].completed = !state.todoList[index].completed;
            }
        },
    },
});

export const { setToDoList, addTodo, updateTodo, deleteTodo, toggleComplete } = ToDoSlice.actions;

export default ToDoSlice.reducer;
