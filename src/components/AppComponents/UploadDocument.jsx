import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import FileUploadButton from 'components/AppComponents/FileUploadButton';  // Importing the common button component
import FileDetails from 'components/AppComponents/FileDetails';  // Component to display file details
import { importPolicyData } from '../../pages/community/onboarding/utils';  // Importing the data
import UploadIcon from 'assets/images/icons/NavIcons/UploadIcon';

const InsuranceDocument = ({ enable = true, selectedFiles, setSelectedFiles }) => {


  const handleFileUpload = (event) => {
    const fileList = event.target.files;
    const filesArray = Array.from(fileList);  // Convert FileList to an array
    const totalFiles = selectedFiles.length + filesArray.length;
  
    if (totalFiles > 20) {
      alert('You can only upload a maximum of 20 files.');
    } else {
      setSelectedFiles((prevFiles) => [...prevFiles, ...filesArray]);  // Append new files to the existing ones
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      width="100%"
      height="auto"
      bgcolor="#f5f7fa"
      borderRadius="12px"
      p={3}
      textAlign="center"
    >
      {/* Icon */}
      <UploadIcon />

      {/* Title */}
      <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ mt: '1rem' }}>
        {importPolicyData.title}
      </Typography>

      {/* Instructions */}
      {enable && <Typography variant="body2" color="textSecondary" gutterBottom>
        {importPolicyData.instructions}
      </Typography>}

      {/* Import Button */}
      {enable && <FileUploadButton onFileChange={handleFileUpload} fileTypes={importPolicyData.fileTypes} />}

      {/* File Details for Each Selected File */}
      {/* {selectedFiles.length > 0 && (
          <Box width="100%" mt={2}>
            {selectedFiles.map((file, index) => (
              <FileDetails key={index} file={file} />
            ))}
          </Box>
        )} */}

      {/* Footer Text */}
      <Typography variant="caption" color="textSecondary">
        {importPolicyData.footerText}
      </Typography>
    </Box>
  );
};

export default InsuranceDocument;
