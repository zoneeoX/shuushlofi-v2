import React, { useEffect, useState } from "react";
import TotoroVideo from "../assets/Totoro.mp4";
import BottomNav from "../components/BottomNav";
import PlaylistSpace from "../components/PlaylistSpace";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserSongs } from "../feature/getSongSlice";
import ReactPlayer from "react-player";
import Pomodoro from "../components/Pomodoro";
import PomodoroSettings from "../components/PomodoroSettings";
import { IoAdd } from "react-icons/io5";
import Modal from "../components/Modal";
import { fetchUserTodo } from "../feature/getTodoSlice";
import { BsTrash } from "react-icons/bs";
import { deleteTodo } from "../feature/deleteTodoSlice";

const Home = () => {
  const dispatch = useDispatch();
  const [isPlaylistModal, setPlaylistModal] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.2);
  const [isModal, setIsModal] = useState(false);
  const [isVintage, setIsVintage] = useState(false);
  const [isPomodoroMenu, setIsPomodoroMenu] = useState(false);
  const [songInformation, setSongInformation] = useState({
    title: "",
    url: "",
    image: "",
  });

  const [isStartPomodoro, setIsStartPomodoro] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const { user_todo } = useSelector((state) => state.get_todo);

  const [pomodoro, setPomodoro] = useState({
    duration: 25,
    break: 5,
    session: 1,
  });

  useEffect(() => {
    dispatch(fetchUserSongs());
    dispatch(fetchUserTodo());
  }, []);

  const handlePause = () => {
    setIsPaused((prev) => !prev);
  };

  const handleStop = () => {
    setIsStartPomodoro(false);
    setIsPaused(false);
  };

  const handleTodoDelete = async ({ id }) => {
    await dispatch(deleteTodo({ id })).then(() => {
      dispatch(fetchUserTodo());
    });
  };

  return (
    <div className="w-screen h-screen relative overflow-hidden font-comfortaa">
      <img
        src={
          songInformation.image ||
          "https://i.pinimg.com/originals/1a/f6/89/1af689d42bdb7686df444f22925f9e89.gif"
        }
        className="w-screen h-screen absolute object-center object-cover brightness-50"
      />

      {isModal && <Modal setIsModal={setIsModal} />}

      <div className="absolute top-0 right-0 p-10">
        <div className="bg-slate-800/75 w-96 min-h-72 max-h-full relative flex flex-col gap-4 text-white p-4 border border-white/20 backdrop-blur-sm">
          <div className="flex flex-row justify-between items-center">
            <h1 className="font-poppins text-xl">Tasks</h1>
            <button
              className="bg-slate-700 p-2 text-2xl rounded-full hover:bg-slate-600"
              onClick={() => {
                setIsModal(true);
              }}
            >
              <i>
                <IoAdd />
              </i>
            </button>
          </div>
          <div className="bg-white/20 w-full h-[0.5px]" />
          <div className="flex flex-col gap-4 overflow-scroll">
            {user_todo.map(({ title, id }, i) => (
              <div className="bg-slate-700 py-1 px-2 font-comfortaa rounded-lg flex flex-row gap-2 items-center justify-between group">
                <label className="flex flex-row gap-2 items-center">
                  <input
                    type="checkbox"
                    className="peer w-4 h-4"
                    name={"todo" + id}
                  />
                  <h1 className="peer-checked:line-through ">{title}</h1>
                </label>
                <i
                  className="invisible group-hover:visible hover:text-red-400"
                  onClick={() => {
                    handleTodoDelete({ id });
                  }}
                >
                  <BsTrash />
                </i>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="-z-50 invisible absolute">
        <ReactPlayer
          url={
            songInformation?.url ||
            "https://www.youtube.com/watch?v=jfKfPfyJRdk"
          }
          loop={true}
          playing={isPlaying}
          volume={volume}
          config={{
            youtube: {
              playerVars: { showinfo: 0 },
            },
          }}
        />
      </div>

      {isPlaylistModal && (
        <PlaylistSpace
          setPlaylistModal={setPlaylistModal}
          setSongInformation={setSongInformation}
        />
      )}

      {isStartPomodoro && (
        <Pomodoro
          pomodoro={pomodoro}
          isPaused={isPaused}
          setIsPaused={setIsPaused}
          isStartPomodoro={isStartPomodoro}
          setIsStartPomodoro={setIsStartPomodoro}
        />
      )}

      {isPomodoroMenu && (
        <PomodoroSettings
          pomodoro={pomodoro}
          setPomodoro={setPomodoro}
          setIsStartPomodoro={setIsStartPomodoro}
          isStartPomodoro={isStartPomodoro}
          isPaused={isPaused}
          setIsPaused={setIsPaused}
          handlePause={handlePause}
          handleStop={handleStop}
        />
      )}

      <BottomNav
        setPlaylistModal={setPlaylistModal}
        setIsPlaying={setIsPlaying}
        setVolume={setVolume}
        isPlaying={isPlaying}
        setIsVintage={setIsVintage}
        setIsPomodoroMenu={setIsPomodoroMenu}
        title={songInformation?.title}
      />
    </div>
  );
};

export default Home;
