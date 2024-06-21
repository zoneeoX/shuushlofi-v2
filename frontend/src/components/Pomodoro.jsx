import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState, useRef } from "react";
import { clearInterval, setInterval } from "worker-timers";
import { Howl, Howler } from "howler";
import alarm from "../assets/alarm.mp3";

const Pomodoro = ({
  pomodoro,
  isPaused,
  setIsPaused,
  isStartPomodoro,
  setIsStartPomodoro,
}) => {
  const [minutes, setMinutes] = useState(pomodoro?.duration - 1);
  const [seconds, setSeconds] = useState(59);
  const [displayMessage, setDisplayMessage] = useState(false);
  const intervalRef = useRef(null);

  var alarmed = new Howl({
    src: alarm,
  });

  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds === 0) {
          setMinutes((prevMinutes) => {
            if (prevMinutes === 0) {
              alarmed.play();
              setDisplayMessage((prevDisplay) => !prevDisplay);
              return displayMessage
                ? pomodoro.duration - 1
                : pomodoro.break - 1;
            }
            return prevMinutes - 1;
          });
          return 59;
        }
        return prevSeconds - 1;
      });
    }, 1000);
  };

  const pauseTimer = () => {
    clearInterval(intervalRef.current);
    setIsPaused(true);
  };

  const resumeTimer = () => {
    setIsPaused(false);
    startTimer();
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current);
    setMinutes(pomodoro?.duration - 1);
    setSeconds(59);
    setIsPaused(false);
    setIsStartPomodoro(false);
  };

  useEffect(() => {
    if (isStartPomodoro) {
      startTimer();
    }
    return () => clearInterval(intervalRef.current);
  }, [displayMessage, pomodoro.duration, pomodoro.break, isStartPomodoro]);

  const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex flex-col items-center justify-center w-screen h-screen gap-4"
    >
      <AnimatePresence>
        {displayMessage && (
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-[#faf8d7] font-mono text-2xl text-center"
          >
            Break time~!, sip a cup of coffee or listen to shuush.lofi 😊
          </motion.h1>
        )}
      </AnimatePresence>
      <div className="text-center">
        <AnimatePresence>
          {!isPaused ? (
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-[#FFFDD0] font-mono text-5xl"
            >
              {timerMinutes}:{timerSeconds}
            </motion.h1>
          ) : (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="font-mono text-4xl text-red-400"
            >
              Timer has been paused
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Pomodoro;
