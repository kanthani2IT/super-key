import { storeResetsFns } from "store/store";

const initialState = {
  user: {
    id: "",
    email: "",
    name: "",
    cmcId: "",
  },
};

export const createLoginSlice = (set, get) => {
  storeResetsFns.add(() => reset(set));
  return {
    ...initialState,
    login: (email, cmcId) => {
      set((state) => ({
        user: {
          ...state.user,
          email,
          cmcId,
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
