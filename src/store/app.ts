import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type ScreenProps = "md" | "lg" | "xl";
type FontProps = "sm" | "normal" | "lg";

interface AppProps {
  state: {
    screenWidth: ScreenProps;
    fontSize: FontProps;
  };
  dispatch: {
    changeScreen: (newValue: ScreenProps) => void;
    changeFont: (newValue: FontProps) => void;
  };
  hydrated: boolean;
  setHydrated: () => void;
}

export const useAppStore = create<AppProps>()(
  persist(
    (set, get) => ({
      state: {
        screenWidth: "md",
        fontSize: "normal",
      },
      dispatch: {
        changeScreen: (newValue) =>
          set({
            state: {
              ...get().state,
              screenWidth: newValue,
            },
          }),
        changeFont: (newValue) =>
          set((state) => ({
            state: {
              ...state.state,
              fontSize: newValue,
            },
          })),
      },
      hydrated: false,
      setHydrated: () => {
        set({ hydrated: true });
      },
    }),
    {
      name: "app",
      partialize: ({ state, hydrated }) => ({ state, hydrated }),
      //   storage: createJSONStorage(() => localStorage),
      onRehydrateStorage() {
        return (state, error) => {
          if (!error) state?.setHydrated();
        };
      },
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
