import { create } from "zustand"

export const useTimeStore = create((set) => ({
  pomodoroTime: Number(localStorage.pomodoroTime) || 25,
  shortBreakTime: Number(localStorage.shortBreakTime) || 5,
  longBreakTime: Number(localStorage.longBreakTime) || 15,

  setPomodoroTime: (time: number) => {
    localStorage.pomodoroTime = time
    set({ pomodoroTime: time })
  },

  setShortBreakTime: (time: number) => {
    localStorage.shortBreakTime = time
    set({ shortBreakTime: time })
  },

  setLongBreakTime: (time: number) => {
    localStorage.longBreakTime = time
    set({ longBreakTime: time })
  },
}))

export const useActiveTabStore = create((set) => ({
  activeTab: Number(localStorage.activeTab) || 0,

  setActiveTabStore: (tab: number) => {
    localStorage.activeTab = tab
    set({ activeTab: tab })
  },
}))

export const useSoundStore = create((set) => ({
  sound: localStorage.sound || true,

  setSound: (sound: boolean) => {
    localStorage.settings = sound
    set({ sound })
  },
}))
