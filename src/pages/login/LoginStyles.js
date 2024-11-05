// Login.styles.js
import { styled } from '@mui/material/styles';
import { Grid2, Button, Box, Typography } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

// Styled components
export const StyledGrid = styled(Grid2)`
  display: flex;
`;

export const ImageContainer = styled(Box)`
  display: flex;
  justify-content: left; /* Center the image horizontally */
  align-items: left; /* Center the image vertically if the height exceeds */
  height: 100%; /* Ensure it takes up the full height of the Grid */
  overflow: hidden; /* Ensure nothing overflows */
`;

export const LoginImage = styled('img')`
  height: 100vh;
  width: 100vw;
`;

export const ContentContainer = styled(Box)`
  flex: 1;
  padding: 4rem 2rem 4rem 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: white;
  height: 100vh;
`;

export const CompanyLogoContainer = styled(Typography)`
  margin-left: -0.5rem;
`;

export const EmailContainer = styled(Box)`
  display: flex;
  gap: 0.5rem;
`;

export const StyledBackIcon = styled(KeyboardBackspaceIcon)`
  margin-top: 0.28rem;
  color: grey;
  font-size: 1.2rem;
  cursor: pointer;
`;

export const SignInButton = styled(Button)`
  margin: 1rem 0rem 2rem 0rem;
  border-radius: inherit;
  margin-left: auto;
  padding: 0.3rem 2rem;
`;

export const DisclaimerText = styled(Typography)`
  font-weight: 500;
  margin-top: 4rem;
  font-size: 1rem;
  text-align: justify;
`;
