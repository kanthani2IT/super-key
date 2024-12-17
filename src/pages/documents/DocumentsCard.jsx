import { Button, Stack, Typography } from "@mui/material";
import CardGrid from "components/AppComponents/AppDataCard";
import AppGrid from "components/AppComponents/AppGrid";
import AppModalContainer from "components/AppComponents/AppModalContainer";
import AppRowBox from "components/AppComponents/AppRowBox";
import AppToggleButton from "components/AppComponents/AppToggleButton";

const header = (title, onClick, data, secondaryText) => {
  return (
    <AppRowBox>
      <Stack alignItems={"baseLine"} direction={"row"} rowGap={2}>
        <Typography variant="h5">{title}</Typography>
        {secondaryText && <Typography variant="body1">&nbsp; &nbsp; {data} {secondaryText} </Typography>}
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

const DocumentsCard = ({
  title,
  secondaryText = '',
  data,
  handleClose,
  handleCardClick,
  subTitle = '',
  mail = false,
  buttons = [],
  handleToggle
}) => {
  return (
    <AppModalContainer
      fullWidth
      enableCard
      height="auto"
      width="100%"
      header={header(title, handleClose, data?.length, secondaryText)}
      padding="1%"
    >
      <AppGrid container rowSpacing={2}>
        <AppGrid item size={{ xs: 12 }}>
          <Typography variant="h5">{subTitle}</Typography>
        </AppGrid>
        {buttons?.length ? <AppGrid item size={{ xs: 12 }}>
          <AppToggleButton buttons={buttons} handleToggle={handleToggle} />
        </AppGrid> : null}
        <AppGrid item size={{ xs: 12, md: 12 }}>
          <CardGrid
            handleClick={handleCardClick}
            fullWidth
            data={data}
            actionTitle
            mail={mail}
          />
        </AppGrid>
      </AppGrid>
    </AppModalContainer>
  );
};

export default DocumentsCard;
