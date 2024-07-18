import { useEffect, useState } from 'preact/hooks'
import {
  useActiveTabStore,
  useSoundStore,
  useTimeStore,
} from '../store/pomodoro'
import { getActiveTabMinute } from '../lib/helper'
import clickAudio from '/start.mp3'
import completedAudio from '/completed.mp3'

export function PomodoroTimer() {
  const { activeTab } = useActiveTabStore((state) => state) as any
  const { pomodoroTime, shortBreakTime, longBreakTime } = useTimeStore(
    (state) => state
  ) as any
  const { sound } = useSoundStore((state) => state) as any
  const [timerSeconds, setTimerSeconds] = useState(pomodoroTime * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [progress, setProgress] = useState(100)

  const clickSound = new Audio(clickAudio)
  const completedSound = new Audio(completedAudio)

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
            if (sound) {
              completedSound.play()

              setTimeout(() => {
                completedSound.pause()
                completedSound.currentTime = 0
              }, 3500)
            }
            clearInterval(timer)
            setIsRunning(false)
            setProgress(100)
            return 0
          }
        })
      }, 1000)
    } else if (!isRunning && timerSeconds !== 0) {
      clearInterval(timer)
    }

    return () => clearInterval(timer)
  }, [isRunning, timerSeconds, activeTab, sound, completedSound])

  useEffect(() => {
    setProgress(
      (timerSeconds /
        getActiveTabMinute(
          activeTab,
          pomodoroTime,
          shortBreakTime,
          longBreakTime
        )) *
        100
    )
  }, [timerSeconds, activeTab, pomodoroTime, shortBreakTime, longBreakTime])

  function formatTimer(time: number) {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
  }

  function handleStartPause(e: Event) {
    const target = e.target as HTMLParagraphElement

    if (sound) {
      clickSound.play()
    }

    if (target.innerText === 'RESTART') {
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
    <div className='pomodoro-wrapper'>
      <div className='pomodoro-timer-wrapper'>
        <div className='pomodoro-timer'>
          <div
            className='timer-range'
            role='slider'
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
            aria-labelledby='timer-label'
            style={{
              background: `conic-gradient(transparent ${
                100 - progress
              }%, var(--changeable-color) ${100 - progress}%)`,
            }}
          >
            <div className='timer-range-middle'>
              <p id='timer-label' className='timer-range-time'>
                {formatTimer(timerSeconds)}
              </p>

              <button className='timer-range-state' onClick={handleStartPause}>
                {timerSeconds === 0 ? 'Restart' : isRunning ? 'Pause' : 'Start'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
