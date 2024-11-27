import * as Yup from "yup";

const communityAddress = Yup.object().required("Community Address is required");
const communityName = Yup.object().required("Community Name is required");
const commuityDetails = {
  communityManager: Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    phone: Yup.string()
      .min(10, "Mobile number must be at least 10 digits.")
      .max(15, "Mobile number cannot exceed 15 digits.")
      .required("Mobile number is required"),
  }),
  propertyManager: Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    phone: Yup.string()
      .min(10, "Mobile number must be at least 10 digits.")
      .max(15, "Mobile number cannot exceed 15 digits.")
      .required("Mobile number is required"),
  }),
};

export const onBoardingValidation = {
  commuityDetails,
  communityAddress,
  communityName,
};
