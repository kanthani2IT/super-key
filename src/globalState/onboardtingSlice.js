import { storeResetsFns } from "store/store";

const defaultCountryCode = { label: "+1", value: "+1" };

const initialOnboardingValues = {
  onBoardingType: "single",
  communityAddress: "",
  communityName: "",
  communityManager: {
    name: "",
    email: "",
    mobile: "",
    countryCode: defaultCountryCode,
    address: "",
  },
  propertyManager: {
    name: "",
    email: "",
    mobile: "",
    countryCode: defaultCountryCode,
    address: "",
  },
  documentUpload:[]
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
