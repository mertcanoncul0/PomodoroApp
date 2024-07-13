import { useEffect } from "preact/hooks"
import { Header } from "./components/header"
import { PomodoroTimer } from "./components/pomodoroTimer"
import { Settings } from "./components/settings"
import { PomodoroTabs } from "./components/tabs"
import { colors, fonts } from "./constants"

export function App() {
  useEffect(() => {
    document.documentElement.dataset.fontFamily =
      fonts[localStorage.activeFont] || "Kumbh+Sans"

    document.documentElement.dataset.color =
      colors[localStorage.activeColor] || "red"
  }, [])

  return (
    <>
      <Header />
      <PomodoroTabs />
      <PomodoroTimer />
      <Settings />
    </>
  )
}
