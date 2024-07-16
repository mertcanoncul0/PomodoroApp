import { Header } from "./components/header"
import { PomodoroTimer } from "./components/pomodoroTimer"
import { Settings } from "./components/settings"
import { PomodoroTabs } from "./components/tabs"

export function App() {
  console.log("hello")

  return (
    <>
      <Header />
      <PomodoroTabs />
      <PomodoroTimer />
      <Settings />
    </>
  )
}
