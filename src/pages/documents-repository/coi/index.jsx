import { Search } from "@mui/icons-material";
import { Grid2 as Grid, InputAdornment, OutlinedInput, TextField, Typography } from "@mui/material";
import CardGrid from "components/AppComponents/AppDataCard";
import AppRowBox from "components/AppComponents/AppRowBox";
import { StyledTextField } from "components/StyledComponents";
import { COIData } from "utils/constants";

const COI = () => {
  return (
    <Grid container spacing={5}>
      <AppRowBox >
        <Grid size={{ xs: 12, sm: 8, md: 6, lg: 4 }}>
          <StyledTextField fullWidth placeholder="Search COI" slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Search color="success" />
                </InputAdornment>
              )
            }
          }} />
        </Grid>
      </AppRowBox>
      <AppRowBox>
        <Grid size={{ xs: 12, sm: 8, md: 6, lg: 4 }}>
          <AppRowBox >

            <Typography variant="h5">Communities</Typography>
            <Typography variant="body1">3 Communities &nbsp; |&nbsp; 96 COI  </Typography>


          </AppRowBox>
        </Grid>
      </AppRowBox>
      <Grid item size={{ xs: 12 }}>
        <CardGrid data={COIData} />
      </Grid>
    </Grid>

  );
};

export default COI;
