import { Drawer } from "@mui/material";

import AppGrid from "components/AppComponents/AppGrid";
import {
  useCommunityListQuery,
  useDeleteCommunityById,
} from "hooks/useCommunity";
import CommunityTable from "pages/dashboard/CommunityTable";
import { RadiusStyledButton } from "pages/dashboard/StyledComponent";
import { useState } from "react";
import EditCommunity from "./edit-community";
import OnboardingIndex from "./onboarding";

const CommunityOnboarding = () => {
  const [communityData, setCommunitydata] = useState("");

  const [edit, setEdit] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const {
    data: communityList,
    isFetching: communitListFetching,
    refetch,
  } = useCommunityListQuery();
  const { mutate: deleteUserById } = useDeleteCommunityById();
  //handlers
  const openDrawer = (id) => {
    setCommunitydata(id);
    setEdit(true);
  };
  const closeDrawer = () => {
    setEdit(false);
  };

  const handleOffBoard = () => {
    const payload = {
      mappings: [
        {
          communityId: communityData?.communityId,
          cmcId: communityData?.communityId,
        },
      ],
    };
    deleteUserById({ id: communityData?.communityId, body: payload });
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
          {selectedRows.length > 0 ? (
            <RadiusStyledButton
              color="#FFFFFF"
              textColor="#E12929"
              width="227px"
              height="50px"
              borderRadius="10px"
              onClick={handleOffBoard}
              sx={{
                border: "0.5px solid #E12929",
              }}
            >
              Off Board Community
            </RadiusStyledButton>
          ) : (
            <OnboardingIndex refetch={refetch} />
          )}
        </AppGrid>
      </AppGrid>

      <AppGrid item size={{ xs: 12 }}>
        <CommunityTable
          height={"80vh"}
          isLoading={communitListFetching & !communityList?.content?.length}
          communityList={communityList}
          onSelectionChange={handleSelectionChange}
          openPopup={openDrawer}
          handleOffBoard={handleOffBoard}
          communityInfo={communityData}
          setCommunityInfo={setCommunitydata}
        />
      </AppGrid>
      <Drawer open={edit} onClose={closeDrawer} anchor="right">
        <EditCommunity onClose={closeDrawer} communityData={communityData} />
      </Drawer>
    </AppGrid>
  );
};

export default CommunityOnboarding;
