import React, { useEffect, useState } from "react";
import GridLayout from "./Layout/GridLayout";
import Card from "../components/Card/Card";
import { IoAddOutline } from "react-icons/io5";
import { postSong } from "../feature/postSongSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserSongs } from "../feature/getSongSlice";

const PlaylistSpace = ({ setPlaylistModal, setSongInformation }) => {
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const { playlist, isFinished } = useSelector((state) => state.get_song);

  const fakeData = [
    {
      name: "Coffee Shop Radio ☕ - 24/7 lofi & jazzy hip-hop beats",
      url: "https://www.youtube.com/watch?v=lP26UCnoH9s",
      image: "https://cdnb.artstation.com/p/assets/images/images/043/163/227/original/augustin-cart-gif-lofi-final.gif?1636484521",
    },
  ];

  const [currentInfo, setCurrentInfo] = useState({
    currentName: "",
    currentUrl: "",
    currentImage: "",
  });

  const { currentName, currentUrl, currentImage } = currentInfo;

  function handleSong({ title, url, image }) {
    setSongInformation({
      title: title,
      url: url,
      image: image,
    });
    closeThisModal();
  }

  function closeThisModal() {
    setPlaylistModal(false);
  }

  useEffect(() => {
    if (collapsed) return;

    function handleKeyUp(event) {
      if (event.key === "Escape") {
        setCollapsed(true);
        closeThisModal();
      }
    }

    window.addEventListener("keyup", handleKeyUp);
    return () => window.removeEventListener("keyup", handleKeyUp);
  }, [collapsed]);

  function handleSwitch() {
    setIsAdd((prevState) => !prevState);
  }

  async function handleUploadSong() {
    try {
      await dispatch(postSong({ currentInfo }));
      dispatch(fetchUserSongs());
      setIsAdd(false);
    } catch (error) {
      console.error("Failed to post song", error);
    }
  }

  useEffect(() => {
    dispatch(fetchUserSongs());
  }, [dispatch, isFinished]);

  return (
    <div className="absolute z-20 w-screen max-h-full min-h-screen bg-slate-800/50 backdrop-blur-sm">
      {isAdd ? (
        <div className="relative flex flex-col items-center justify-center w-screen max-h-full min-h-screen gap-10 text-white">
          <div className="flex flex-col items-center justify-center w-full gap-4 xl:flex-row">
            <div className="flex flex-col gap-10 bg-slate-800/50 border border-white/20 backdrop-blur-md p-10 rounded-lg h-full w-[25em] sm:w-[40em] lg:w-[50em]">
              <div className="flex flex-col gap-1">
                <label htmlFor="title" className="relative left-2">
                  Nama / Title
                </label>
                <input
                  className="w-full px-4 py-1 border rounded-full bg-slate-400/20 border-white/20"
                  type="text"
                  value={currentInfo.currentName}
                  required
                  onChange={(e) =>
                    setCurrentInfo({
                      ...currentInfo,
                      currentName: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="title" className="relative left-2">
                  Image (harus url)
                </label>
                <input
                  className="w-full px-4 py-1 border rounded-full bg-slate-400/20 border-white/20"
                  type="text"
                  value={currentInfo.currentImage}
                  required
                  onChange={(e) =>
                    setCurrentInfo({
                      ...currentInfo,
                      currentImage: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="title" className="relative left-2">
                  url lagu (youtube, soundcloud, dll)
                </label>
                <input
                  className="w-full px-4 py-1 border rounded-full bg-slate-400/20 border-white/20"
                  type="text"
                  required
                  value={currentInfo.currentUrl}
                  onChange={(e) =>
                    setCurrentInfo({
                      ...currentInfo,
                      currentUrl: e.target.value,
                    })
                  }
                />
              </div>

              <div className="w-full">
                <h1>Card Preview</h1>
                <Card
                  name={currentName || fakeData[0].name}
                  url={currentUrl}
                  image={currentImage || fakeData[0].image}
                  preview={"yes"}
                />
              </div>

              <button
                className="p-4 text-xl border rounded-full bg-slate-700/50 border-white/20 hover:bg-slate-700/75 disabled:bg-red-600"
                disabled={!currentName || !currentImage || !currentUrl}
                onClick={handleUploadSong}
              >
                Tambah lagu.
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="absolute z-20 w-screen max-h-full min-h-screen p-10 overflow-x-hidden overflow-y-scroll backdrop-blur-sm">
            <GridLayout>
              {fakeData.map(({ name, url, image }, i) => (
                <div key={i} onClick={() => handleSong({ name, url, image })}>
                  <Card name={name} url={url} image={image} preview={"yes"} />
                </div>
              ))}
              {playlist.map(({ id, title, image, url }, i) => (
                <div key={i}>
                  <Card id={id} name={title} url={url} image={image} preview={"no"} handleSong={handleSong} />
                </div>
              ))}
            </GridLayout>
          </div>

          <div className="fixed left-0 bottom-0 w-screen h-[10vh] bg-gradient-to-t from-slate-500/50 to-transparent flex justify-center items-center text-white z-30">
            <div className="flex flex-col items-center justify-center gap-2">
              <h1 className="text-xl cursor-default font-poppins">
                Tambahkan lagu favoritmu disini!
              </h1>
              <i
                className="p-2 text-4xl border rounded-full cursor-pointer bg-slate-900/40 backdrop-blur-md border-white/50 hover:bg-slate-900/75"
                onClick={handleSwitch}
              >
                <IoAddOutline />
              </i>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PlaylistSpace;
