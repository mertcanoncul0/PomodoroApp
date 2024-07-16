import { useActiveTabStore } from "../store/pomodoro"

export function PomodoroTabs() {
  const { activeTab, setActiveTab } = useActiveTabStore((state) => state) as any

  function changeActiveTab(tab: number) {
    setActiveTab(tab)
  }

  return (
    <div className="pomodoro-tabs-wrapper">
      <div className="pomodoro-tabs">
        <button
          aria-label={"pomodoro"}
          className={activeTab === 0 ? "active" : ""}
          onClick={() => changeActiveTab(0)}
        >
          pomodoro
        </button>
        <button
          aria-label={"short break"}
          className={activeTab === 1 ? "active" : ""}
          onClick={() => changeActiveTab(1)}
        >
          short break
        </button>
        <button
          aria-label={"long break"}
          className={activeTab === 2 ? "active" : ""}
          onClick={() => changeActiveTab(2)}
        >
          long break
        </button>
      </div>
    </div>
  )
}
