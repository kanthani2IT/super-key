import { createLoginSlice } from "globalState/loginSlice";
import { createOnboardingSlice } from "globalState/onboardtingSlice";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export const storeResetsFns = new Set();

export const resetAllSlice = () => {
  storeResetsFns.forEach((reset) => reset());
};

export const useGlobalStore = create()(
  devtools(
    persist(
      (...args) => {
        return {
          ...createLoginSlice(...args),
          ...createOnboardingSlice(...args),
        };
      },
      {
        name: "superKey-store",
        partialize: (state) => ({ onboarding: state.onboarding }),
        // merge: (persistedState, currentState) => ({
        //   ...currentState,
        //   ...persistedState,
        // }),
      },
      { name: "Super Key" }
    )
  )
);
