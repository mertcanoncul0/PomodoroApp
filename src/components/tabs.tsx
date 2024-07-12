import { useStickyState } from "../hooks/useStickyState"

export function PomodoroTabs() {
  const [activeTab, setActiveTab] = useStickyState(1, "activeTab")

  function changeActiveTab(tab: number) {
    setActiveTab(tab)
  }

  return (
    <div className="pomodoro-tabs">
      <button
        className={activeTab === 1 ? "active" : ""}
        onClick={() => changeActiveTab(1)}
      >
        pomodoro
      </button>
      <button
        className={activeTab === 2 ? "active" : ""}
        onClick={() => changeActiveTab(2)}
      >
        short break
      </button>
      <button
        className={activeTab === 3 ? "active" : ""}
        onClick={() => changeActiveTab(3)}
      >
        long break
      </button>
    </div>
  )
}
