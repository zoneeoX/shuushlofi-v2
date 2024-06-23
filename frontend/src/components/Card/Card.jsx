import React from "react";
import { FiExternalLink } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { deleteUserSong } from "../../feature/deleteSongSlice";

const Card = ({ id, title, url, image, preview, handleSong }) => {
  const dispatch = useDispatch();

  function deleteSong() {
    dispatch(deleteUserSong({ id }));

    window.location.reload();
  }

  function executeSong() {
    handleSong({ title, url, image });
  }

  return (
    <div className="text-white cursor-pointer">
      <div className="relative h-[34vh]">
        <img
          src={image}
          onClick={executeSong}
          alt="lofi placeholder"
          className="absolute object-cover object-center w-full h-full transition-all duration-200 rounded-lg brightness-50 hover:brightness-100"
        />
        <div className="z-40 flex flex-row items-center justify-between px-2">
          <div className="relative flex flex-row items-center px-2">
            <a href={url} target="_blank">
              <i className="text-2xl text-white">
                <FiExternalLink />
              </i>
            </a>
            <h1 className="w-[20vw] truncate p-2 ">{title}</h1>
          </div>
          {preview === "no" && (
            <i
              className="z-10 p-1 text-xl text-white bg-red-700 rounded-full hover:scale-110"
              onClick={deleteSong}
            >
              <AiOutlineClose />
            </i>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
