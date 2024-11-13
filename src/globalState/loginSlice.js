import { storeResetsFns } from "store/store";

let initialState = {
  user: {
    id: "",
    email: "",
    name: "",
  },
};

export const createLoginSlice = (set, get) => {
  storeResetsFns.add(() => reset(set));
  return {
    ...initialState,
    login: (email) => {
      set((state) => ({
        user: {
          ...state.user,
          email,
        },
      }));
    },
  };
};

function reset(set) {
  set(
    (state) => ({
      user: {
        ...state.user,
        ...initialState,
      },
    }),
    false,
    "Reset user"
  );
}
