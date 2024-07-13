import { useStickyState } from "../hooks/useStickyState"
import { ModalColorPicker } from "./modalColorPicker"
import { ModalFontPicker } from "./modalFontPicker"

export function Settings() {
  const [isOpen, setIsOpen] = useStickyState(false, "modal-state")

  function handleIsOpen() {
    setIsOpen(!isOpen)
  }

  return (
    <div className="settings-wrapper">
      <button onClick={handleIsOpen}>
        <img src="/settings.svg" alt="Open Settings" />
      </button>

      <div className={`modal-overlay ${isOpen && "open"}`}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-content-header">
            <h2>Settings</h2>
            <button className="close-button" onClick={handleIsOpen}>
              <img src="/modal-close.svg" alt="Close Modal" />
            </button>
          </div>

          <div className="modal-content-middle">
            <div className="modal-content-time">
              <h3 className="modal-content-title">Time (Minutes)</h3>
              <ul>
                <li className="modal-content-time-item">
                  <label htmlFor="pomodoro">pomodoro</label>
                  <input type="text" value={25} id="pomodoro" />
                </li>

                <li className="modal-content-time-item">
                  <label htmlFor="short break">short break</label>
                  <input type="text" value={5} id="short break" />
                </li>

                <li className="modal-content-time-item">
                  <label htmlFor="long break">long break</label>
                  <input type="text" value={25} id="long break" />
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
            <button className="modal-apply-button" onClick={handleIsOpen}>
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
