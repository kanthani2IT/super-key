import { Drawer } from "@mui/material";

import AppGrid from "components/AppComponents/AppGrid";
import {
  useCommunityList,
  useCommunityListQuery,
  useDeleteCommunityById,
} from "hooks/useCommunity";
import CommunityTable from "pages/dashboard/CommunityTable";
import { RadiusStyledButton } from "pages/dashboard/StyledComponent";
import { useEffect, useState } from "react";
import EditCommunity from "./edit-community";
import OnboardingIndex from "./onboarding";

const initialValue = {
  page: 0,
  size: 10,
  sort: "",
  order: "",
  status: "",
};

const CommunityOnboarding = () => {
  const [communityData, setCommunitydata] = useState("");
  const [page, setPage] = useState(1);
  const [edit, setEdit] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [filters, setFilters] = useState(initialValue);

  const {
    refetch,
    data: communityList,
    isFetching: communityListFetching,
  } = useCommunityListQuery();

  const { mutate: deleteUserById } = useDeleteCommunityById();
  const {
    mutate: getCommunityList,
    data: communityListData,
    isLoading: communityListLoading,
  } = useCommunityList();

  const { content } = communityListData?.data ?? {};
  const handleChangePage = (event, newPage) => {
    fetchData({ page: newPage });
    setPage(newPage);
  };
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

  const handleChangeRadio = (e) => {
    const { value } = e.target;
    setFilters({ ...filters, sort: value });
    fetchData(value);
  };

  const fetchData = ({ sort, page }) => {
    const body = {
      page: page,
      size: 10,
      sortBy: sort === "inActive" && "active" ? "" : "name",
      orderBy: "",
      status: "",
    };
    getCommunityList(body);
  };

  useEffect(() => {
    fetchData(filters.sort);
  }, []);
  console.log(content, "::::");
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
          isLoading={communityListLoading}
          communityList={communityListData?.data}
          onSelectionChange={handleSelectionChange}
          openPopup={openDrawer}
          handleOffBoard={handleOffBoard}
          communityInfo={communityData}
          setCommunityInfo={setCommunitydata}
          filters={filters}
          handleChangeRadio={handleChangeRadio}
          handleChangePage={handleChangePage}
          page={page}
          setPage={setPage}
        />
      </AppGrid>
      <Drawer open={edit} onClose={closeDrawer} anchor="right">
        <EditCommunity onClose={closeDrawer} communityData={communityData} />
      </Drawer>
    </AppGrid>
  );
};

export default CommunityOnboarding;
