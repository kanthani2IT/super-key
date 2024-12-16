import { Search } from "@mui/icons-material";
import { InputAdornment, Typography } from "@mui/material";
import CardGrid from "components/AppComponents/AppDataCard";
import AppGrid from "components/AppComponents/AppGrid";
import AppRowBox from "components/AppComponents/AppRowBox";
import { StyledTextField } from "components/StyledComponents";
import { useState } from "react";
import { COIData, certificateData } from "utils/constants";
import CertificatesCard from "./CertificatesCard";
import CoiEmailProcess from "./CoiEmailProcess";



let intialValues = {
  community: {},
  certificate: {},
};

const COI = () => {
  const [showCertificates, setShowCertificates] = useState(false);
  const [open, setOpen] = useState(false);
  const [coi, setCoi] = useState(intialValues);
  const updateCoi = (key, value) => {
    setCoi({ ...coi, [key]: value });
  };
  const handleCertificates = (community) => {
    updateCoi("community", community);
    setShowCertificates(!showCertificates);
  };

  const handleEmailModal = (certificate) => {
    updateCoi("certificate", certificate);
    setOpen(true);
  };



  return (
    <AppGrid container spacing={5}>
      <AppRowBox>
        <AppGrid size={{ xs: 12, sm: 8, md: 6, lg: 4 }}>
          <StyledTextField
            fullWidth
            placeholder="Search COI"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Search color="success" />
                  </InputAdornment>
                ),
              },
            }}
          />
        </AppGrid>
      </AppRowBox>
      <AppRowBox>
        <AppGrid size={{ xs: 12, sm: 8, md: 6, lg: 4 }}>
          <AppRowBox>
            <Typography variant="h5">Communities</Typography>
            <Typography variant="body1">
              {COIData?.length} Communities &nbsp; |&nbsp;{" "}
              {COIData?.length * 10} COI{" "}
            </Typography>
          </AppRowBox>
        </AppGrid>
      </AppRowBox>
      {!showCertificates ? (
        <AppGrid item size={{ xs: 12 }}>
          <CardGrid handleClick={handleCertificates} data={COIData} />
        </AppGrid>
      ) : (
        <AppGrid item size={{ xs: 12 }}>
          <CertificatesCard
            title={coi?.community?.title}
            handleEmail={handleEmailModal}
            handleCertificates={handleCertificates}
            certificateData={certificateData}
          />
        </AppGrid>
      )}
      {open && <CoiEmailProcess open={open} setOpen={setOpen} />}
    </AppGrid>
  );
};

export default COI;
