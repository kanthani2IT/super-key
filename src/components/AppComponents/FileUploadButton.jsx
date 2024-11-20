import React from 'react';
import { Button } from '@mui/material';

const FileUploadButton = ({ onFileChange, fileTypes }) => {
  return (
    <Button
      variant="contained"
      color="primary"
      sx={{ mt: 2, mb: 2, borderRadius: '0.7rem', p: '0.7rem 4rem' }}
      component="label"
    >
      Select Files
      <input
        type="file"
        hidden
        multiple
        onChange={onFileChange}
        accept={fileTypes.join(', ')}  // Accept multiple file types from data
      />
    </Button>
  );
};

export default FileUploadButton;
