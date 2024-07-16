import { useStickyState } from "../hooks/useStickyState"
import { ModalColorPicker } from "./modalColorPicker"
import { ModalFontPicker } from "./modalFontPicker"
import { useTimeStore } from "../store/pomodoro"

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

  function handleIsOpen() {
    setIsOpen(!isOpen)
  }

  function onSubmit(e: any) {
    e.preventDefault()

    const pomodoro = (document.getElementById("pomodoro") as HTMLInputElement)
      .value
    const shortBreak = (
      document.getElementById("short break") as HTMLInputElement
    ).value
    const longBreak = (
      document.getElementById("long break") as HTMLInputElement
    ).value

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
              <button
                className="close-button"
                type="button"
                onClick={handleIsOpen}
              >
                <img src="/modal-close.svg" alt="Close Modal" />
              </button>
            </div>

            <div className="modal-content-middle">
              <div className="modal-content-time">
                <h3 className="modal-content-title">Time (Minutes)</h3>
                <ul className="modal-content-time-list">
                  <li className="modal-content-time-item">
                    <label htmlFor="pomodoro">pomodoro</label>
                    <input type="number" value={pomodoroTime} id="pomodoro" />
                  </li>

                  <li className="modal-content-time-item">
                    <label htmlFor="short break">short break</label>
                    <input
                      type="number"
                      value={shortBreakTime}
                      id="short break"
                    />
                  </li>

                  <li className="modal-content-time-item">
                    <label htmlFor="long break">long break</label>
                    <input
                      type="number"
                      value={longBreakTime}
                      id="long break"
                    />
                  </li>
                </ul>
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
