import React, { useState } from "react";
import api from "../database/api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constant";
import Totoro from "../assets/image/Totoro.jpg";
import TotoroVideo from "../assets/Totoro.mp4";
import Icon from "../assets/image/icon.svg";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Form = ({ route, method }) => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const { username, password } = credentials;

  function handleRoutingRegister() {
    if (method === "register") {
      navigate("/login");
    } else if (method === "login") {
      navigate("/register");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const res = await api.post(route, { username, password });
      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className="w-screen h-screen flex justify-center items-center relative"
      onSubmit={handleSubmit}
    >
      <video
        src={TotoroVideo}
        autoPlay={true}
        loop={true}
        muted={true}
        className="w-screen h-screen object-cover object-center absolute brightness-50"
        alt=""
      />
      <div className="w-screen min-h-screen max-h-full px-24 py-8 overflow-hidden relative flex justify-center items-center font-comfortaa">
        <div className="flex flex-col p-6 relative w-[30rem] h-fit bg-white rounded-lg ">
          <div className="flex flex-col justify-center items-center mb-5 relative">
            <div className="relative">
              <img src={Icon} className="w-20 z-10 relative" alt="" />
              <div className="w-20 h-20 bg-bgPrimary absolute inset-0 z-0 blur-2xl rounded-full" />
            </div>
            <h1 className="text-2xl font-semibold">Shuushlofi.co</h1>
            <p className="text-sm">Tolong masukkan detail anda untuk masuk!</p>
          </div>

          <div className="flex flex-row justify-between items-center relative gap-5 mt-10">
            <div className="bg-black w-full h-[0.5px]" />
            <p>Halo</p>
            <div className="bg-black w-full h-[0.5px]" />
          </div>

          <div className="flex flex-col gap-6 mt-6 text-sm">
            <input
              type="username"
              className="border border-neutral-400 p-2 rounded-lg"
              placeholder="Enter your username..."
              value={credentials.username}
              onChange={(e) =>
                setCredentials({ ...credentials, username: e.target.value })
              }
            />
            <input
              type="password"
              className="border border-neutral-400 p-2 rounded-lg"
              placeholder="Enter your password..."
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
            />
          </div>
          <div className="flex flex-row justify-between items-center my-6 text-sm">
            <div className="flex flex-row gap-2">
              <input type="checkbox" />
              <p>Remember me</p>
            </div>
            <p className="underline">Forgot password?</p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <button
              className="bg-black w-full p-3 rounded-xl text-white my-3 font-bold flex justify-center items-center disabled:bg-slate-900"
              disabled={!credentials.username || !credentials.password}
            >
              {method === "register" ? "Register" : "Login"}
            </button>
            {method === "register" ? (
              <p>
                Have an account?,{" "}
                <span
                  className="font-bold cursor-pointer"
                  onClick={handleRoutingRegister}
                >
                  Sign in
                </span>
              </p>
            ) : (
              <p>
                Don't have an account?,{" "}
                <span
                  className="font-bold cursor-pointer"
                  onClick={handleRoutingRegister}
                >
                  Sign up
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};

export default Form;
