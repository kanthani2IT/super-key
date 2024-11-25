import { storeResetsFns } from "store/store";

const initialOnboardingValues = {
  onBoardingType: "single",
  communityAddress: "",
  communityName: "",
  communityManager: {
    name: "",
    email: "",
    mobile: "",
    address: "",
  },
  propertyManager: {
    name: "",
    email: "",
    mobile: "",
    address: "",
  },
};
export const createOnboardingSlice = (set, get) => {
  storeResetsFns.add(() => reset(set));

  return {
    onboarding: { ...initialOnboardingValues },

    updateOnboarding: (newValues) => {
      set((state) => {
        const currentOnboarding = state.onboarding;
        if (JSON.stringify(currentOnboarding) !== JSON.stringify(newValues)) {
          return {
            onboarding: {
              ...currentOnboarding,
              ...newValues,
            },
          };
        }
        return state;
      });
    },

    resetOnboarding: () => reset(set),
  };
};

function reset(set) {
  set({ onboarding: { ...initialOnboardingValues } });
}
