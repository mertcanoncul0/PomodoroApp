import { create } from "zustand"
import { persist } from "zustand/middleware"

export const useTimeStore = create(
  persist(
    (set) => ({
      pomodoroTime: 25,
      shortBreakTime: 5,
      longBreakTime: 5,

      setPomodoroTime: (time: number) => {
        set({ pomodoroTime: time })
      },

      setShortBreakTime: (time: number) => {
        set({ shortBreakTime: time })
      },

      setLongBreakTime: (time: number) => {
        set({ longBreakTime: time })
      },
    }),
    {
      name: "time-storage",
    }
  )
)

export const useActiveTabStore = create(
  persist(
    (set) => ({
      activeTab: 0,

      setActiveTab: (tab: number) => {
        set({ activeTab: tab })
      },
    }),
    {
      name: "active-tab-storage",
    }
  )
)

export const useSoundStore = create(
  persist(
    (set) => ({
      sound: true,
      setSound: (sound: boolean) => {
        set({ sound })
      },
    }),
    {
      name: "sound-storage",
    }
  )
)
