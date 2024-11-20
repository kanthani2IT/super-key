import React from 'react';
import { Box, Typography } from '@mui/material';

// Icons for different file types (you can use actual icons)
const fileTypeIcons = {
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '📄',  // Word doc
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': '📊',  // Excel file
  'application/pdf': '📕',  // PDF file
  'text/csv': '📑',  // CSV file
  'image/png': '🖼️',  // PNG image
  'image/jpeg': '🖼️',  // JPEG image
  'image/gif': '🖼️',  // GIF image
};

// Function to format the file size
const formatFileSize = (size) => {
  if (size < 1024) return `${size} bytes`;
  if (size < 1048576) return `${(size / 1024).toFixed(2)} KB`;
  return `${(size / 1048576).toFixed(2)} MB`;
};

const FileDetails = ({ file }) => {
  const getFileTypeIcon = (type) => {
    return fileTypeIcons[type] || '📄';  // Default icon if type is unknown
  };

  return (
    <Box 
      display="flex" 
      flexDirection="row" 
      alignItems="center" 
      justifyContent="space-between" 
      sx={{ mt: 1, p: 1, border: '1px solid #ddd', borderRadius: '8px', width: '100%' }}
    >
      {/* File Type Icon */}
      <Box display="flex" alignItems="center" justifyContent="center" sx={{ fontSize: '2rem', mr: 2 }}>
        {getFileTypeIcon(file.type)}
      </Box>

      {/* File Information */}
      <Box display="flex" flexDirection="column" alignItems="flex-start" flexGrow={1}>
        <Typography variant="body1" fontWeight="bold">
          {file.name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {formatFileSize(file.size)} 
        </Typography>
      </Box>
    </Box>
  );
};

export default FileDetails;
