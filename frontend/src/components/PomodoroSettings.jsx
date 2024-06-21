import React from "react";

const PomodoroSettings = ({
  pomodoro,
  setPomodoro,
  setIsStartPomodoro,
  isStartPomodoro,
  isPaused,
  setIsPaused,
  handlePause,
  handleStop,
}) => {
  function changePomodoroDuration(e) {
    setPomodoro((prevData) => ({
      ...prevData,
      [e.target.name]: Number(e.target.value),
    }));
  }

  function startPomodoroTimer() {
    setIsStartPomodoro((prevState) => !prevState);
  }

  return (
    <div className="w-96 h-[20em] bg-slate-800/50 backdrop-blur-md absolute bottom-[7em] mx-auto left-[10em] text-white p-4 rounded-lg border border-white/20">
      <div className="flex flex-col gap-4">
        <h1 className="text-xl font-poppins">Pomodoro Settings~</h1>
        {isStartPomodoro ? (
          <div className="relative flex flex-col items-center justify-center gap-4 text-2xl top-16 font-poppins">
            <button onClick={handlePause} className="">{isPaused ? "Resume" : "Pause"}</button>
            <button onClick={handleStop}>Stop</button>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-2">
              <label htmlFor="work/study duration" className="text-white/50">
                Work/Study Duration (minutes)
              </label>
              <div className="flex flex-row gap-2">
                <input
                  type="range"
                  min={25}
                  max={50}
                  step={5}
                  defaultValue={pomodoro?.duration}
                  onChange={changePomodoroDuration}
                  name="duration"
                  className="w-52"
                />
                <p>{pomodoro?.duration}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="break duration" className="text-white/50">
                Break Duration (minutes)
              </label>
              <div className="flex flex-row gap-2">
                <input
                  type="range"
                  min={5}
                  max={10}
                  step={1}
                  defaultValue={pomodoro?.break}
                  onChange={changePomodoroDuration}
                  name="break"
                  className="w-52"
                />
                <p>{pomodoro?.break}</p>
              </div>
            </div>
            <button
              className="relative py-2 border rounded-full top-10 border-white/20"
              onClick={startPomodoroTimer}
            >
              Start Pomodoro
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PomodoroSettings;
