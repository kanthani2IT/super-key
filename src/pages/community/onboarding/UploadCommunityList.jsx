import { Button, Typography } from "@mui/material";
import { Grid } from "@mui/system";
import icons from "assets/images/icons/mui-icons/Icons";
import InsuranceDocument from "components/AppComponents/UploadDocument";
const UploadCommunityList = () => {
  return (
    <>
      <Grid container spacing={5}>
        <Grid size={{ xl: 6 }}>
          <Typography variant="body1" color="#5B738B" gutterBottom>
            Steps to bulk upload the communities{" "}
          </Typography>
          <Typography variant="body2" color="#5B738B" gutterBottom>
            1.Please download the template{" "}
          </Typography>
          <Typography variant="body2" color="#5B738B" gutterBottom>
            2.Upload the Details in the given template format{" "}
          </Typography>
          <Typography variant="body2" color="#5B738B" gutterBottom>
            3.Upload the file{" "}
          </Typography>
        </Grid>
        <Grid size={{ xl: 6 }} display={"flex"} alignItems={"center"}>
          <Button variant="outlined" startIcon={icons.IconArrowDownward()}>
            Download the Template
          </Button>
        </Grid>
        <Grid size={{ xl: 12 }}>
          <InsuranceDocument />
        </Grid>
      </Grid>
    </>
  );
};

export default UploadCommunityList;
