import { Typography } from "@mui/material";

import icons from "assets/images/icons/mui-icons/Icons";
import AppGrid from "components/AppComponents/AppGrid";
import InsuranceDocument from "components/AppComponents/UploadDocument";
import { RadiusStyledButton } from "components/StyledComponents";
const UploadCommunity = () => {
  return (
    <>
      <AppGrid container spacing={5}>
        <AppGrid size={{ xl: 6 }}>
          <Typography variant="h5" color="#5B738B">
            Steps to bulk upload the communities
          </Typography>
          <Typography variant="h5" color="#5B738B">
            1.Please download the template{" "}
          </Typography>
          <Typography variant="h5" color="#5B738B">
            2.Upload the Details in the given template format{" "}
          </Typography>
          <Typography variant="h5" color="#5B738B">
            3.Upload the file{" "}
          </Typography>
        </AppGrid>
        <AppGrid
          size={{ xl: 6 }}
          display={"flex"}
          alignItems={"center"}
          flexDirection={"column"}
          gap={"10px"}
        >
          <RadiusStyledButton
            variant="outlined"
            startIcon={icons.IconArrowDownward()}
            color="info"
            textColor="#2954E1"
            borderRadius="10px"
            width="auto"
          >
            Download the Template
          </RadiusStyledButton>
          <Typography variant="caption" color="#8F8F8F">
            Format: XLSX
          </Typography>
        </AppGrid>
        <AppGrid size={{ xl: 12 }}>
          <InsuranceDocument readData={true} />
        </AppGrid>
      </AppGrid>
    </>
  );
};

export default UploadCommunity;
