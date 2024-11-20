import { Search } from "@mui/icons-material";
import { Button, Grid2 as Grid, InputAdornment, OutlinedInput, TextField, Typography } from "@mui/material";
import CardGrid from "components/AppComponents/AppDataCard";
import AppModal from "components/AppComponents/AppModal";
import AppModalContainer from "components/AppComponents/AppModalContainer";
import AppRowBox from "components/AppComponents/AppRowBox";
import MainCard from "components/MainCard";
import { StyledTextField } from "components/StyledComponents";
import { useState } from "react";
import { certificateData, COIData } from "utils/constants";
import CertificatesCard from "./CertificatesCard";


const COI = () => {
  const [showCertificates, setShowCertificates] = useState(false)

  const handleCertificates = (coi) => {
    console.log(coi)
    setShowCertificates(!showCertificates);
  };

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
            <Typography variant="body1">{COIData?.length} Communities &nbsp; |&nbsp; {COIData?.length * 10} COI  </Typography>
          </AppRowBox>
        </Grid>
      </AppRowBox>
      {!showCertificates ? <Grid item size={{ xs: 12 }}>
        <CardGrid handleClick={handleCertificates} data={COIData} />
      </Grid> :
        <Grid item size={{ xs: 12 }}>

          <CertificatesCard handleCertificates={handleCertificates} certificateData={certificateData} />
        </Grid>}
    </Grid>

  );
};

export default COI;
