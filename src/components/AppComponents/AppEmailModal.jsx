import {
    Autocomplete,
    Box,
    Button,
    TextField,
    Typography
} from '@mui/material';
import { useState } from 'react';
import RichTextEditorM from '../../components/AppComponents/AppRichTextEditor';
import AppGrid from './AppGrid';
import AppModal from './AppModal';
import AppRowBox from './AppRowBox';

const EmailModal = ({ open = false, setOpen }) => {
  const [recipients, setRecipients] = useState([]);
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState(null);
  const [inputEmail, setInputEmail] = useState('');

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Predefined email options
  const emailOptions = [
    'richard@gmail.com',
    'allwin@gmail.com',
    'jasondeninsonpaul@gmail.com',
    'example1@gmail.com',
    'example2@gmail.com',
  ];

  // Open/Close Modal
  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setRecipients([]);
    setSubject('');
    setBody(null);
    setInputEmail('');
  };

  // Add a manually entered email
  const handleAddEmail = (event) => {
    if (event.key === 'Enter' && inputEmail.trim()) {
      event.preventDefault();
      if (emailRegex.test(inputEmail)) {
        setRecipients([...recipients, inputEmail]);
        setInputEmail('');
      } else {
        alert('Invalid email address');
      }
    }
  };

  // Send Email
  const handleSend = () => {
    const htmlBody = body?.toString('html') || '';
    console.log('Email Sent:', { recipients, subject, htmlBody });
    handleClose();
  };

  const footer = () => (
    <AppRowBox justifyContent="end">
      <AppGrid item size={{ xs: 2 }}>
        <Button
          fullWidth
          size="large"
          color="info"
          type="submit"
          onClick={handleSend}
          variant="contained"
        >
          Send
        </Button>
      </AppGrid>
    </AppRowBox>
  );

  return (
    <>
      <AppModal
        height="75vh"
        width="44%"
        enableCard
        open={open}
        footer={footer()}
        title="Send Email"
        flexTitle={true}
        onClose={handleClose}
      >
        <>
          <Box
            sx={{
              marginBottom: '2rem',
              borderRadius: '0.4rem',
              background: '#F8F8F8',
              padding: '0.3rem',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: '18px',
                lineHeight: '28px',
                color: '#323C4D',
              }}
            >
              To:
            </Typography>
            <Autocomplete
              multiple
              freeSolo
              limitTags={3}
              options={emailOptions}
              value={recipients}
              onChange={(event, newValue) => setRecipients(newValue)}
              sx={{
                width: '100%',
                marginLeft: '1rem',
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  placeholder="Add more Recipient"
                  onKeyDown={handleAddEmail}
                  value={inputEmail}
                  onChange={(e) => setInputEmail(e.target.value)}
                  sx={{
                    '& .MuiInput-root::before': { border: 'none' },
                    '& .MuiInput-root::after': { border: 'none' },
                    '& .MuiInput-root:hover:not(.Mui-disabled, .Mui-error):before': {
                      border: 'none',
                    },
                  }}
                />
              )}
            />
          </Box>
          <Box>
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: '16px',
                lineHeight: '19.36px',
                letterSpacing: '5%',
                color: '#5B738B',
              }}
            >
              Subject
            </Typography>
            <TextField
              fullWidth
              placeholder="Enter Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              variant="standard"
              margin="dense"
              sx={{
                marginBottom: '2rem',
                background: '#F8F8F8',
                padding: '0.3rem',
                '& .MuiInput-root::before': { border: 'none' },
                '& .MuiInput-root::after': { border: 'none' },
                '& .MuiInput-root:hover:not(.Mui-disabled, .Mui-error):before': {
                  border: 'none',
                },
              }}
            />
          </Box>
          <RichTextEditorM />
        </>
      </AppModal>
    </>
  );
};

export default EmailModal;
