import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToDoList, addTodo, updateTodo, deleteTodo, toggleComplete } from "../ToDoSlice";
import { TiPencil } from "react-icons/ti";
import { BsTrash } from "react-icons/bs";
import { FaSave } from "react-icons/fa";
import image from "../assets/9264885.jpg";

function ToDoList() {
  const dispatch = useDispatch();
  const todoList = useSelector((state) => state.todo.todoList);
  const [showModal, setShowModal] = useState(false);
  const [currentToDo, setCurrentToDo] = useState(null);
  const [newTask, setNewTask] = useState("");
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [filter, setFilter] = useState("All");

  // Save todoList to localStorage when todoList changes
  useEffect(() => {
    if (todoList.length > 0) {
      localStorage.setItem("todoList", JSON.stringify(todoList));
    }
  }, [todoList]);

  // Retrieve todoList from localStorage on component mount
  useEffect(() => {
    const localTodoList = JSON.parse(localStorage.getItem("todoList"));
    if (localTodoList) {
      dispatch(setToDoList(localTodoList));
    }
  }, [dispatch]);

  // Handle adding a new task
  const handleAddToDo = (task) => {
    if (task.trim().length === 0) {
      alert("Please enter a task");
    } else {
      dispatch(
        addTodo({
          task: task,
          id: Date.now(),
        })
      );
      setNewTask("");
      setShowModal(false);
    }
  };

  // Handle deleting a task
  const handleDeleteToDo = (id) => {
    dispatch(deleteTodo({ id }));
  };

  // Handle updating an existing task
  const handleUpdateToDo = () => {
    if (currentToDo) {
      dispatch(
        updateTodo({
          id: currentToDo.id,
          task: newTask,
        })
      );
      setCurrentToDo(null);
      setNewTask("");
      setShowModal(false);
    }
  };

  // Handle selecting a task
  const handleSelectTodo = (id) => {
    setSelectedTodo(id);
  };

  // Handle toggling the completion status of a task
  const handleToggleComplete = (id) => {
    dispatch(toggleComplete({ id }));
  };

  // Filter logic for completed, incomplete, and all tasks
  const filteredTodos = todoList.filter((todo) => {
    if (filter === "All") return true;
    if (filter === "Completed") return todo.completed;
    if (filter === "Incomplete") return !todo.completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-white py-10">
  {showModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-all">
    <div className="bg-white p-8 rounded-xl shadow-xl w-[90%] sm:w-[500px] animate-fadeIn transform transition-all duration-300">
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
        {currentToDo ? "Update Task" : "Add New Task"}
      </h2>
      <input
        type="text"
        className="border border-gray-300 w-full p-4 rounded-lg mb-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder={currentToDo ? "Update your task here" : "Enter your task here"}
      />
      <div className="flex justify-end gap-4 mt-6">
        <button
          className="bg-red-500 text-white py-2 px-6 rounded-full shadow hover:bg-red-600 transition duration-200"
          onClick={() => setShowModal(false)}
        >
          Cancel
        </button>
        <button
          className="bg-green-500 text-white py-2 px-6 rounded-full shadow hover:bg-green-600 transition duration-200 flex items-center gap-2"
          onClick={currentToDo ? handleUpdateToDo : () => handleAddToDo(newTask)}
        >
          <FaSave />
          {currentToDo ? "Save" : "Add"}
        </button>
      </div>
    </div>
  </div>
)}


      <div className="flex items-center justify-center flex-col">
        {todoList.length === 0 ? (
          <div className="mb-8 text-center">
            <div className="sm:w-[500px] sm:h-[500px] min-w-[250px] mx-auto">
              <img src={image} alt="No tasks" />
            </div>
            <p className="text-center text-gray-800 text-lg mt-4">You have no todos, please add one</p>
          </div>
        ) : (
          <>
            {/* Filter */}
            <div className="mb-4">
              <label htmlFor="filter" className="block mb-2 text-gray-800 font-medium">Filter Tasks</label>
              <select
                id="filter"
                className="border border-gray-300 p-3 rounded-full shadow-sm focus:ring-2 focus:ring-blue-400"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="All">All</option>
                <option value="Completed">Completed</option>
                <option value="Incomplete">Incomplete</option>
              </select>
            </div>

            {/* Task List */}
            <div className="w-full sm:w-1/2 mx-auto mt-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">All Tasks</h2>
              <ul>
                {filteredTodos.map((todo) => (
                  <li
                    key={todo.id}
                    className={`flex items-center justify-between p-4 mb-3 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer ${
                      selectedTodo === todo.id ? "bg-blue-100" : ""
                    }`}
                    onClick={() => handleSelectTodo(todo.id)}
                  >
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => handleToggleComplete(todo.id)}
                      className="mr-3"
                    />
                    <span className={`flex-1 text-lg ${todo.completed ? "line-through text-gray-500" : "text-gray-800"}`}>
                      {todo.task}
                    </span>
                    <div className="flex gap-3 items-center">
                      <TiPencil
                        className="text-blue-500 cursor-pointer hover:text-blue-700"
                        onClick={() => {
                          setCurrentToDo(todo);
                          setNewTask(todo.task);
                          setShowModal(true);
                        }}
                      />
                      <BsTrash
                        className="text-red-500 cursor-pointer hover:text-red-700"
                        onClick={() => handleDeleteToDo(todo.id)}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>

      <button
        className="bg-gradient-to-r from-orange-400 to-orange-500 text-white py-3 px-10 rounded-full mt-6 mx-auto block shadow hover:from-orange-500 hover:to-orange-600 transition duration-200"
        onClick={() => setShowModal(true)}
      >
        Add Task
      </button>
    </div>
  );
}

export default ToDoList;
