// LoginWrapper.js
import { Box, Typography } from '@mui/material';
import LoginLogo from 'assets/images/login/login.png';
import CompanyLogo from 'assets/images/login/logo.png';
import {
  CompanyLogoContainer,
  ContentContainer,
  DisclaimerText,
  EmailContainer,
  ImageContainer,
  LoginImage,
  SignInButton,
  StyledBackIcon,
  StyledGrid
} from './LoginStyles';
import { PASSWORD_CHANGE_TEXTS } from 'utils/loginUtils';

const EmailDisplay = ({ userCredentials, onClickBack }) => (
  <EmailContainer>
    <StyledBackIcon onClick={onClickBack} />
    <Typography variant="body1" gutterBottom sx={{ fontWeight: '500', fontSize: '1rem' }}>
      {userCredentials.mailId}
    </Typography>
  </EmailContainer>
);

const LoginWrapper = (props) => {
  const { children, handleSubmit, buttonText, credentialHeading, userCredentials, onClickBack, next } = props;
  return (
    <Box sx={{ flexGrow: 1 }} component="form" onSubmit={handleSubmit}>
      <StyledGrid container>
        <StyledGrid size={{ xs: 12, sm: 12, md: 7, lg: 7, xl: 7 }}>
          <ImageContainer>
            <LoginImage src={LoginLogo} alt="Login Logo" />
          </ImageContainer>
        </StyledGrid>

        <StyledGrid size={{ xs: 12, sm: 12, md: 5, lg: 5, xl: 5 }}>
          <ContentContainer>
            <CompanyLogoContainer variant="h2">
              <img src={CompanyLogo} alt="Company Logo" />
            </CompanyLogoContainer>
            {next && <EmailDisplay userCredentials={userCredentials} onClickBack={onClickBack} />}
            <Typography variant="h3" gutterBottom sx={{ margin: 0 }}>
              {credentialHeading}
            </Typography>

            {children}

            <SignInButton variant="contained" type="submit">
              {buttonText}
            </SignInButton>

            <DisclaimerText>{PASSWORD_CHANGE_TEXTS.disclaimerText}</DisclaimerText>
          </ContentContainer>
        </StyledGrid>
      </StyledGrid>
    </Box>
  );
};

export default LoginWrapper;
