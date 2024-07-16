import { Header } from "./components/header"
import { PomodoroTimer } from "./components/pomodoroTimer"
import { Settings } from "./components/settings"
import { PomodoroTabs } from "./components/tabs"

export function App() {
  return (
    <>
      <Header />
      <PomodoroTabs />
      <PomodoroTimer />
      <Settings />
    </>
  )
}
