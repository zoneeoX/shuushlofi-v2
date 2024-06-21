import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postTodo } from "../feature/postTodoSlice";
import { fetchUserTodo } from "../feature/getTodoSlice";

const Modal = ({ setIsModal }) => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const handleTodo = async () => {
    await dispatch(postTodo({ title })).then(() => {
      dispatch(fetchUserTodo());
    });
    setIsModal(false);
  };

  return (
    <div className="absolute w-screen h-screen bg-slate-700/50 backdrop-blur-sm top-0 left-0 z-50 flex justify-center items-center">
      <label
        htmlFor="todo"
        className="bg-slate-800 w-fit h-fit py-2 px-4 text-white font-comfortaa flex flex-row gap-4 rounded-lg"
      >
        <input
          type="text"
          className="bg-transparent"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter todo."
        />
        <button
          className="p-2 bg-slate-700 rounded-lg text-sm"
          onClick={handleTodo}
        >
          Add
        </button>
      </label>
    </div>
  );
};

export default Modal;
