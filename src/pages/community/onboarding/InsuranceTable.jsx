import React, { useState } from 'react';
import {
  Box,
  Typography,
  Checkbox,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  MenuItem,
  Select,
  IconButton,
  Paper,
  Grid,
  Link,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { truncateFileName } from './utils';

// Dynamic document types list
const documentTypes = [
  'Endorsement',
  'Amendment',
  'Insurance policy',
  'Certificate of insurance',
  'Legal',
  'Premium finance Agreement',
];

const FileUploadComponent = () => {
  const [files, setFiles] = useState([]); // Store uploaded files
  const [selectAll, setSelectAll] = useState(false); // Track select all state
  const [activePolicies, setActivePolicies] = useState([]); // Track active policies for each file

  // Handle file uploads
  const handleFileUpload = (event) => {
    const uploadedFiles = Array.from(event.target.files).map((file) => ({
      name: file.name,
      size: (file.size / 1024).toFixed(2), // size in KB
      type: file.type,
      documentType: '', // Initially empty, user will select from dropdown
      isActive: false, // Initially not active
    }));

    // Add new files to the list
    setFiles([...files, ...uploadedFiles]);
    setActivePolicies([...activePolicies, ...Array(uploadedFiles.length).fill(false)]);
  };

  // Handle document type change
  const handleTypeChange = (index, event) => {
    const updatedFiles = [...files];
    updatedFiles[index].documentType = event.target.value;
    setFiles(updatedFiles);
  };

  // Handle removing a file
  const handleRemoveFile = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    const updatedActivePolicies = activePolicies.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    setActivePolicies(updatedActivePolicies);
  };

  // Handle "Select All" checkbox
  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setActivePolicies(Array(files.length).fill(newSelectAll));
  };

  // Handle individual checkbox change
  const handleActiveChange = (index) => {
    const updatedActivePolicies = [...activePolicies];
    updatedActivePolicies[index] = !updatedActivePolicies[index];
    setActivePolicies(updatedActivePolicies);
  };
  const fileFormat=[
    {
        "name": "Software Framework Comparison.pptx",
        "size": "8772.27",
        "type": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        "documentType": "",
        "isActive": false
    },
    {
        "name": "software-framework-slide1.png",
        "size": "25.75",
        "type": "image/png",
        "documentType": "",
        "isActive": false
    },
    {
        "name": "Timeline_View_Test_Cases.docx",
        "size": "36.93",
        "type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "documentType": "",
        "isActive": false
    },
    {
        "name": "Unit test cases for Discussion Panel.docx",
        "size": "9.32",
        "type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "documentType": "",
        "isActive": false
    }
]
console.log(files,"$$$ files")
  return (
    <>
      {/* Document Table */}
      {fileFormat.length > 0 && (
          <Table>
            <TableHead>
                <TableRow>
                  <TableCell><Checkbox label='Select all'/>Select All</TableCell>
                  <TableCell>
                    <Select
                      // value={file.documentType}
                      onChange={(event) => handleTypeChange(index, event)}
                      displayEmpty
                      fullWidth
                      variant="outlined"
                    >
                      <MenuItem value="" disabled>
                        Select Document Type
                      </MenuItem>
                      {documentTypes.map((type) => (
                        <MenuItem key={type} value={type}>
                          {type}
                        </MenuItem>
                      ))}
                    </Select>
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
              {fileFormat.map((file, index) => (
                <TableRow key={index}>
                  
                  {/* File Name */}
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <InsertDriveFileIcon sx={{ mr: 1 }} />
                     <Link variant='h7' sx={{cursor:"pointer"}}> {truncateFileName(file.name)}</Link>
                    </Box>
                  </TableCell>
                  
                  {/* Document Type Dropdown */}
                  <TableCell>
                    <Select
                      value={file.documentType}
                      onChange={(event) => handleTypeChange(index, event)}
                      displayEmpty
                      fullWidth
                      variant="outlined"
                    >
                      <MenuItem value="" disabled>
                        Select Document Type
                      </MenuItem>
                      {documentTypes.map((type) => (
                        <MenuItem key={type} value={type}>
                          {type}
                        </MenuItem>
                      ))}
                    </Select>
                  </TableCell>
                  
                  {/* Remove File Action */}
                  <TableCell >
                    {/* <IconButton color="primary" onClick={() => handleRemoveFile(index)}> */}
                    <Link variant='h7' sx={{cursor:"pointer"}}> Remove File</Link>
                    {/* </IconButton> */}
                  </TableCell>
                  
                  <TableCell style={{borderBottom:"none"}}>
                  <Box display="flex" alignItems="center">
                    <Checkbox
                      checked={activePolicies[index]}
                      onChange={() => handleActiveChange(index)}
                    />
                     <Typography variant='h7' sx={{cursor:"pointer"}}>Active Document</Typography>
                    
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
      )}

      {/* Upload Button */}
      {files.length > 0 && (
        <Box display="flex" justifyContent="flex-end" mt={3}>
          <Button variant="contained" color="primary" size="large">
            Upload
          </Button>
        </Box>
      )}
    </>
  );
};

export default FileUploadComponent;
