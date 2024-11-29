import { AddCircle } from "@mui/icons-material";
import { Button, Drawer } from "@mui/material";

import AppGrid from "components/AppComponents/AppGrid";
import AppModal from "components/AppComponents/AppModal";
import AppRowBox from "components/AppComponents/AppRowBox";
import CircularLoader from "components/CircularLoader";
import { useFormik } from "formik";
import { useCommunityListQuery, useOnboardCommunity } from "hooks/useCommunity";
import { RadiusStyledButton } from "pages/dashboard/StyledComponent";
import CommunityTable from "pages/dashboard/CommunityTable";
import React, { Suspense, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useGlobalStore } from "store/store";
import * as Yup from "yup";
import EditCommunity from "./edit-community";
import OnboardingIndex from "./onboarding";

const AddNewCommunity = React.lazy(
  () => import("./onboarding/AddNewCommunity")
);
const CommunityAddress = React.lazy(
  () => import("./onboarding/CommunityAddress")
);
const CommunityDetails = React.lazy(
  () => import("./onboarding/CommunityDetails")
);
const CommunityName = React.lazy(() => import("./onboarding/CommunityName"));
const InsuranceUpload = React.lazy(() => import("./onboarding/InsuranceTable"));
const SuccessScreen = React.lazy(() => import("./onboarding/SuccessScreen"));

const onBoardingStepper = [
  {
    title: "Add New Community",
    component: (props) => <AddNewCommunity {...props} />,
    height: "25vh",
  },
  {
    title: "Community Address",
    component: (props) => <CommunityAddress {...props} />,
    initialValidationSchema: {
      communityAddress: Yup.object().required("Community Address is required"),
    },
    height: "60vh",
  },
  {
    title: "Community Name",
    component: (props) => <CommunityName {...props} />,
    initialValidationSchema: {
      communityName: Yup.object().required("Community Name is required"),
    },
    height: "40vh",
  },
  {
    title: "Community Details",
    component: (props) => <CommunityDetails {...props} />,
    initialValidationSchema: {
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
        username: Yup.string().required("Name is required"),
        email: Yup.string()
          .email("Invalid email format")
          .required("Email is required"),
        phone: Yup.string()
          .min(10, "Mobile number must be at least 10 digits.")
          .max(15, "Mobile number cannot exceed 15 digits.")
          .required("Mobile number is required"),
      }),
    },
    height: "60vh",
  },
  {
    title: "Insurance Documentation",
    component: (props) => <InsuranceUpload {...props} />,
    height: "auto",
    width: "60%",
  },
  {
    title: "",
    component: ({ handleClose }) => (
      <SuccessScreen
        title="Your Community Onboarded Successfully!"
        handleClose={handleClose}
      />
    ),
    height: "100vh",
  },
];


const CommunityOnboarding = () => {
  const [edit, setEdit] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const {
    data: communityList,
    isFetching: communitListFetching,
    refetch,
  } = useCommunityListQuery();

  //handlers
  const openDrawer = () => {
    setEdit(true);
  };
  const closeDrawer = () => {
    setEdit(false);
  };

  const handleSelectionChange = (selected) => {
    setSelectedRows(selected);
  };

  return (
    <AppGrid container spacing={4}>
      <AppGrid
        item
        size={{ xs: 12 }}
        container
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
      >
        <AppGrid item sx={{ display: "flex", gap: 2 }}>
          <RadiusStyledButton variant="contained">
            Communities
          </RadiusStyledButton>
          <RadiusStyledButton
            color="#E9E9E9"
            height="50px"
            width="100px"
            textColor="#7B828F"
            variant="contained"
          >
            Assets
          </RadiusStyledButton>
        </AppGrid>

        <AppGrid item sx={{ display: "flex", gap: 2 }}>
          {selectedRows.length > 0 && (
            <RadiusStyledButton
              color="#FFFFFF"
              textColor="#E12929"
              width="227px"
              height="50px"
              borderRadius="10px"
              sx={{
                border: "0.5px solid #E12929",
              }}
            >
              Off Board Community
            </RadiusStyledButton>
          )}
          <OnboardingIndex refetch={refetch} />

        </AppGrid>
      </AppGrid>

      <AppGrid item size={{ xs: 12 }}>
        <CommunityTable
          height={"80vh"}
          isLoading={communitListFetching & !communityList?.content?.length}

          communityList={communityList}
          onSelectionChange={handleSelectionChange}
          openPopup={openDrawer}
        />
      </AppGrid>
      <Drawer
        open={edit}
        onClose={closeDrawer}
        anchor="right"
      >
        <EditCommunity onClose={closeDrawer} />
      </Drawer>
    </AppGrid>
  );
};

export default CommunityOnboarding;
