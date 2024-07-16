import { useEffect } from "preact/hooks"
import { useStickyState } from "../hooks/useStickyState"
import { colors } from "../constants"

export function ModalColorPicker() {
  const [activeColor, setActiveColor] = useStickyState(0, "activeColor")

  function handleIsActiveColor(index: number) {
    setActiveColor(index)
  }

  useEffect(() => {
    document.body.dataset.color = colors[activeColor]
  }, [activeColor])

  return (
    <ul className="modal-content-color-list">
      <li
        className={`modal-content-color-item red ${
          activeColor === 0 ? "active" : ""
        }`}
        onClick={() => handleIsActiveColor(0)}
      ></li>
      <li
        className={`modal-content-color-item cyan ${
          activeColor === 1 ? "active" : ""
        }`}
        onClick={() => handleIsActiveColor(1)}
      ></li>
      <li
        className={`modal-content-color-item purple ${
          activeColor === 2 ? "active" : ""
        }`}
        onClick={() => handleIsActiveColor(2)}
      ></li>
    </ul>
  )
}
