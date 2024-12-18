import { Search } from "@mui/icons-material";
import { Button, InputAdornment, Typography } from "@mui/material";
import icons from "assets/images/icons/antd-icons";
import CardGrid from "components/AppComponents/AppDataCard";
import AppGrid from "components/AppComponents/AppGrid";
import AppRowBox from "components/AppComponents/AppRowBox";
import { StyledTextField } from "components/StyledComponents";
import { useState } from "react";
import { COIData, certificateData } from "utils/constants";
import DocumentsCard from "../DocumentsCard";
import CommunityDocUploads from "./CommunityDocUploads";



let intialValues = {
  community: {},
  documents: {},
};

const buttons = [{
  label: "Most Current Documents",
  value: "current",
},
{
  label: "Previous Documents",
  value: "previous",
}];

const Repository = () => {
  const [showDocs, setShowDocs] = useState(false);
  const [open, setOpen] = useState(false);
  const [doc, setDoc] = useState(intialValues);
  const updateDoc = (key, value) => {
    setDoc({ ...doc, [key]: value });
  };
  const handleDocumentCard = (community) => {
    updateDoc("community", community);
    setShowDocs(!showDocs);
  };

  const handleDocuments = (document) => {
    //preview particular documment
  };

  const handleToggle = (value) => {
    console.log("toggle", value)
  }
  const handleUploadDoc = () => {
    setOpen(true);
  }
  return (
    <AppGrid container spacing={4}>
      <AppRowBox>
        <AppGrid size={{ xs: 8, sm: 8, md: 6, lg: 4 }}>
          <StyledTextField
            fullWidth
            placeholder="Search Commmunities & Documents"
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
        <AppGrid>
          <Button startIcon={icons.UploadIcon()} variant="contained" color="info" size="large" onClick={handleUploadDoc}>
            Upload Documents
          </Button>
        </AppGrid>
      </AppRowBox>
      <AppGrid size={{ xs: 12, sm: 8, md: 6, lg: 4 }}>
        <AppRowBox>
          <Typography variant="h5">Communities</Typography>
          <Typography variant="body1">
            {COIData?.length} Communities &nbsp; |&nbsp;{" "}
            {COIData?.length * 5} Documents{" "}
          </Typography>
        </AppRowBox>
      </AppGrid>
      {!showDocs ? (
        <AppGrid item size={{ xs: 12 }}>
          <CardGrid handleClick={handleDocumentCard} data={COIData} secondaryText={'Documents'} />
        </AppGrid>
      ) : (
        <AppGrid item size={{ xs: 12 }}>
          <DocumentsCard
            title={doc?.community?.title}
            subTitle={'Documents'}
            secondaryText={'Documents'}
            handleCardClick={handleDocuments}
            handleClose={handleDocumentCard}
            data={certificateData}
            buttons={buttons}
            handleToggle={handleToggle}
          />
        </AppGrid>
      )}
      {open && <CommunityDocUploads open={open} />}
    </AppGrid>
  );
};

export default Repository;
