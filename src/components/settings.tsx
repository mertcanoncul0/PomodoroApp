import { useStickyState } from "../hooks/useStickyState"
import { ModalColorPicker } from "./modalColorPicker"
import { ModalFontPicker } from "./modalFontPicker"
import { useSoundStore, useTimeStore } from "../store/pomodoro"
import { useState } from "preact/hooks"

export function Settings() {
  const [isOpen, setIsOpen] = useStickyState(false, "modal-state")
  const {
    pomodoroTime,
    shortBreakTime,
    longBreakTime,
    setPomodoroTime,
    setShortBreakTime,
    setLongBreakTime,
  } = useTimeStore((state) => state) as any
  const { soundStore, setSoundStore } = useSoundStore((state) => state) as any
  const [timeError, setTimeError] = useState(false)
  console.log(soundStore)

  function handleSound() {
    setSoundStore(!soundStore as boolean)
  }

  function handleIsOpen() {
    setIsOpen(!isOpen)
  }

  function onSubmit(e: any) {
    setTimeError(false)
    e.preventDefault()

    const pomodoro = (
      document.querySelector("[data-pomodoroTime]") as HTMLInputElement
    ).value
    const shortBreak = (
      document.querySelector("[data-shortBreakTime]") as HTMLInputElement
    ).value
    const longBreak = (
      document.querySelector("[data-longBreakTime]") as HTMLInputElement
    ).value

    if (pomodoro.length > 3 || shortBreak.length > 3 || longBreak.length > 3) {
      setTimeError(true)
      return
    }

    setPomodoroTime(Number(pomodoro))
    setShortBreakTime(Number(shortBreak))
    setLongBreakTime(Number(longBreak))

    handleIsOpen()
  }

  return (
    <div className="settings-wrapper">
      <button onClick={handleIsOpen}>
        <img src="/settings.svg" alt="Open Settings" />
      </button>

      <div className={`modal-overlay ${isOpen && "open"}`}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <form onSubmit={onSubmit}>
            <div className="modal-content-header">
              <h2>Settings</h2>
              <div>
                <button
                  className="sound-button"
                  type="button"
                  onClick={handleSound}
                >
                  {soundStore ? (
                    <img src="/sound-on.svg" alt="sound" />
                  ) : (
                    <img src="/sound-off.svg" alt="sound" />
                  )}
                </button>

                <button
                  className="close-button"
                  type="button"
                  style={{ marginLeft: "2rem" }}
                  onClick={handleIsOpen}
                >
                  <img src="/modal-close.svg" alt="Close Modal" />
                </button>
              </div>
            </div>

            <div className="modal-content-middle">
              <div className="modal-content-time">
                <h3 className="modal-content-title">Time (Minutes)</h3>
                <ul className="modal-content-time-list">
                  <li className="modal-content-time-item">
                    <label htmlFor="pomodoro">pomodoro</label>
                    <input
                      type="number"
                      value={pomodoroTime}
                      aria-label="pomodoro"
                      id="pomodoro"
                      data-pomodoroTime
                      required
                    />
                  </li>

                  <li className="modal-content-time-item">
                    <label htmlFor="short-break">short break</label>
                    <input
                      type="number"
                      value={shortBreakTime}
                      id="short-break"
                      aria-label="short break"
                      data-shortBreakTime
                      required
                    />
                  </li>

                  <li className="modal-content-time-item">
                    <label htmlFor="long-break">long break</label>
                    <input
                      type="number"
                      value={longBreakTime}
                      aria-label="long break"
                      id="long-break"
                      data-longBreakTime
                      required
                    />
                  </li>
                </ul>
                {timeError && (
                  <p className="time-error">Periods cannot exceed 3 digits</p>
                )}
              </div>
              <div className="modal-content-font">
                <h3 className="modal-content-title">Font</h3>

                <ModalFontPicker />
              </div>
              <div className="modal-content-color">
                <h3 className="modal-content-title">Color</h3>

                <ModalColorPicker />
              </div>
              <button type="submit" className="modal-apply-button">
                Apply
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
