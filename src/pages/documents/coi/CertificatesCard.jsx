import { Button, Stack, Typography } from "@mui/material";
import CardGrid from "components/AppComponents/AppDataCard";
import AppGrid from "components/AppComponents/AppGrid";
import AppModalContainer from "components/AppComponents/AppModalContainer";
import AppRowBox from "components/AppComponents/AppRowBox";

const header = (title, onClick, certificates) => {
  return (
    <AppRowBox>
      <Stack alignItems={"baseLine"} direction={"row"} rowGap={2}>
        <Typography variant="h5">{title}</Typography>
        <Typography variant="body1">&nbsp; {certificates} COI </Typography>
      </Stack>
      <Button
        onClick={() => onClick()}
        disableTouchRipple
        variant="text"
        size="small"
        color="secondary"
      >
        Close{" "}
      </Button>
    </AppRowBox>
  );
};

const CertificatesCard = ({
  title,
  certificateData,
  handleCertificates,
  handleEmail,
}) => {
  return (
    <AppModalContainer
      fullWidth
      enableCard
      height="auto"
      width="100%"
      header={header(title, handleCertificates, certificateData?.length)}
      padding="1%"
    >
      <AppGrid container rowSpacing={2}>
        <AppGrid item size={{ xs: 12 }}>
          <Typography variant="h5">Certificates</Typography>
        </AppGrid>
        <AppGrid item size={{ xs: 12, md: 12 }}>
          <CardGrid
            handleClick={handleEmail}
            fullWidth
            data={certificateData}
            actionTitle
          />
        </AppGrid>
      </AppGrid>
    </AppModalContainer>
  );
};

export default CertificatesCard;
