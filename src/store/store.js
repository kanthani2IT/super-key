import { createLoginSlice } from "globalState/loginSlice";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export const storeResetsFns = new Set();

export const resetAllSlice = () => {
  storeResetsFns.forEach((reset) => reset());
};

export const useGlobalStore = create()(
  devtools(
    (...args) => {
      return {
        ...createLoginSlice(...args),
      };
    },
    { name: "Super Key" }
  )
);
