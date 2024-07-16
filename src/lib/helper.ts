import { tabs } from "../constants"

export function getActiveTabMinute(
  activeTab: number,
  pomodoroTime: number,
  shortBreakTime: number,
  longBreakTime: number
): number {
  switch (tabs[activeTab]) {
    case "pomodoro":
      return pomodoroTime * 60
    case "short break":
      return shortBreakTime * 60
    case "long break":
      return longBreakTime * 60
    default:
      return 25
  }
}
