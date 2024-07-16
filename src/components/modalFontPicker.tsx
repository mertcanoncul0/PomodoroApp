import { useEffect } from "preact/hooks"
import { useStickyState } from "../hooks/useStickyState"
import { fonts } from "../constants"

export function ModalFontPicker() {
  const [activeFont, setActiveFont] = useStickyState(0, "activeFont")

  function handleIsActiveFont(index: number) {
    setActiveFont(index)
  }

  useEffect(() => {
    document.body.dataset.fontFamily = fonts[activeFont]
  }, [activeFont])

  return (
    <ul className="modal-content-font-list">
      <li
        className={`modal-content-font-item kumbh-sans ${
          activeFont === 0 ? "active" : ""
        }`}
        onClick={() => handleIsActiveFont(0)}
      >
        Aa
      </li>
      <li
        className={`modal-content-font-item roboto-slab ${
          activeFont === 1 ? "active" : ""
        }`}
        onClick={() => handleIsActiveFont(1)}
      >
        Aa
      </li>
      <li
        className={`modal-content-font-item space-mono ${
          activeFont === 2 ? "active" : ""
        }`}
        onClick={() => handleIsActiveFont(2)}
      >
        Aa
      </li>
    </ul>
  )
}
