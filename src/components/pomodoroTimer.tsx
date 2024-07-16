import { useEffect, useState } from "preact/hooks"
import { useActiveTabStore, useTimeStore } from "../store/pomodoro"
import { getActiveTabMinute } from "../lib/helper"

export function PomodoroTimer() {
  const { activeTab } = useActiveTabStore((state) => state) as any
  const { pomodoroTime, shortBreakTime, longBreakTime } = useTimeStore(
    (state) => state
  ) as any
  const [timerSeconds, setTimerSeconds] = useState(pomodoroTime * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [progress, setProgress] = useState(100)

  useEffect(() => {
    setTimerSeconds(
      getActiveTabMinute(activeTab, pomodoroTime, shortBreakTime, longBreakTime)
    )

    setProgress(100)

    setIsRunning(false)
  }, [activeTab, pomodoroTime, shortBreakTime, longBreakTime])

  useEffect(() => {
    let timer: any

    if (isRunning) {
      timer = setInterval(() => {
        setTimerSeconds((prevSeconds) => {
          if (prevSeconds > 0) {
            return prevSeconds - 1
          } else {
            clearInterval(timer)
            setIsRunning(false)
            setProgress(100)
            return 0
          }
        })

        setProgress(() => {
          if (timerSeconds === 0) {
            return 0
          } else {
            return (
              (timerSeconds /
                getActiveTabMinute(
                  activeTab,
                  pomodoroTime,
                  shortBreakTime,
                  longBreakTime
                )) *
              100
            )
          }
        })
      }, 1000)
    } else if (!isRunning && timerSeconds !== 0) {
      clearInterval(timer)
    }

    return () => clearInterval(timer)
  }, [isRunning, timerSeconds, activeTab])

  function formatTimer(time: number) {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
  }

  const handleStartPause = (e: any) => {
    if (e.target.innerText === "RESTART") {
      setTimerSeconds(
        getActiveTabMinute(
          activeTab,
          pomodoroTime,
          shortBreakTime,
          longBreakTime
        )
      )

      setIsRunning(true)
      return
    }

    setIsRunning(!isRunning)
  }

  return (
    <div className="pmdo">
      <div className="pomodoro-timer-wrapper">
        <div className="pomodoro-timer">
          <div
            className="timer-range"
            style={{
              background: `conic-gradient(transparent ${
                100 - progress
              }%, --var(--changeable-color) ${100 - progress}%)`,
            }}
          >
            <div className="timer-range-middle">
              <p className="timer-range-time">{formatTimer(timerSeconds)}</p>

              <p className="timer-range-state" onClick={handleStartPause}>
                {timerSeconds === 0 ? "Restart" : isRunning ? "Pause" : "Start"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
