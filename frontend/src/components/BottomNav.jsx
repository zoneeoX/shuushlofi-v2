import React from "react";
import { BsPlayFill, BsPauseFill } from "react-icons/bs";
import { RiPlayListFill } from "react-icons/ri";
import { MdTimer } from "react-icons/md";
import { GiBatteryPackAlt } from "react-icons/gi";

const BottomNav = ({
  setPlaylistModal,
  setIsPlaying,
  setVolume,
  isPlaying,
  setIsVintage,
  setIsPomodoroMenu,
  title,
}) => {
  function handlePlaying() {
    setIsPlaying((prevState) => !prevState);
  }

  function handlePlaylistModal() {
    setPlaylistModal((prevState) => !prevState);
  }

  function handleVintage() {
    setIsVintage((prevState) => !prevState);
  }

  function handlePomodoroMenu() {
    setIsPomodoroMenu((prevState) => !prevState);
  }

  function handleVolume(e) {
    setVolume(e.target.value);
  }

  return (
    <div className="text-white z-10 text-5xl absolute bottom-0 w-full h-[10vh] flex flex-row items-center justify-start p-10">
      <div className="flex flex-col gap-2 overflow-auto">
        <div className="flex flex-row gap-4 items-center *:cursor-pointer">
          <div className="flex flex-row gap-4 *:text-2xl">
            <i onClick={handlePlaying}>
              {isPlaying ? <BsPauseFill /> : <BsPlayFill />}
            </i>
            <i onClick={handlePlaylistModal}>
              <RiPlayListFill />
            </i>
            <i onClick={handleVintage}>
              <GiBatteryPackAlt />
            </i>
            <i onClick={handlePomodoroMenu}>
              <MdTimer />
            </i>
          </div>
          <input
            type="range"
            name=""
            id=""
            onChange={handleVolume}
            defaultValue={0.2}
            min={0}
            step={0.01}
            max={1}
            className="w-96"
          />
        </div>
        <h1
          className="text-xl animate-pulse cursor-pointer relative bottom-6"
          onClick={handlePlaylistModal}
        >
          {title ? title : "lofi hip hop radio - beats to relax/study to"}
        </h1>
      </div>
    </div>
  );
};

export default BottomNav;
