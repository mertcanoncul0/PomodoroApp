import { useStickyState } from "../hooks/useStickyState"
import { useActiveTabStore } from "../store/pomodoro"

export function PomodoroTabs() {
  const [activeTab, setActiveTab] = useStickyState(0, "activeTab")
  const { setActiveTabStore } = useActiveTabStore((state) => state) as any

  function changeActiveTab(tab: number) {
    setActiveTab(tab)
    setActiveTabStore(tab)
  }

  return (
    <div className="pomodoro-tabs-wrapper">
      <div className="pomodoro-tabs">
        <button
          className={activeTab === 0 ? "active" : ""}
          onClick={() => changeActiveTab(0)}
        >
          pomodoro
        </button>
        <button
          className={activeTab === 1 ? "active" : ""}
          onClick={() => changeActiveTab(1)}
        >
          short break
        </button>
        <button
          className={activeTab === 2 ? "active" : ""}
          onClick={() => changeActiveTab(2)}
        >
          long break
        </button>
      </div>
    </div>
  )
}
