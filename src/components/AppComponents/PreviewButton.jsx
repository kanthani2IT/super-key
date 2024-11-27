import { Box, Button, Card, CardActions, CardContent, Link } from '@mui/material';
import { styled } from '@mui/system';
import FileIcon from 'assets/images/icons/FileIcon';
import { truncateFileName } from 'pages/community/onboarding/utils';

// Styled components
const StyledCard = styled(Card)({
  display: 'flex',
  alignItems: 'center',
  borderRadius: '0.8rem',
  boxShadow: 'none',
  border: '1px solid #E0E0E0',
  paddingLeft: '1rem',
  marginTop: '-2.8rem',
});

const StyledCardContent = styled(CardContent)({
  padding: 0,
  flexGrow: 1,
});

const StyledBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
});

const StyledLink = styled(Link)({
  cursor: 'pointer',
  marginLeft: '8px',
  fontSize: '0.85rem',
  textDecoration: 'none',
  padding:"0.3rem",
  color:"black",
  fontWeight:"600",
  '&:hover':{textDecoration:"none"}
});

const StyledButton = styled(Button)({
  background: '#E1EEFF',
  borderRadius: '0em 0.8em 0.8em 0rem',
  padding: '0.5rem 1rem',
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '0.875rem',
  '&:hover': { textDecoration: 'underline', background: '#E1EEFF' },
});

const PreviewButton = ({ fileName, onPreview, index }) => {
  return (
    <StyledCard>
      {/* File Details */}
      <StyledCardContent>
        <StyledBox>
          <FileIcon sx={{ mr: 1 }} />
          <StyledLink variant="h7">
            {truncateFileName(fileName)}
          </StyledLink>
        </StyledBox>
      </StyledCardContent>

      {/* Preview Button */}
      <CardActions sx={{ padding: 0 }}>
        <StyledButton onClick={(event) => onPreview(event, index)} variant="text" color="primary">
          Preview
        </StyledButton>
      </CardActions>
    </StyledCard>
  );
};

export default PreviewButton;
