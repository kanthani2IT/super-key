import styled from '@emotion/styled';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Link,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import FileIcon from 'assets/images/icons/FileIcon';
import { StyledTypography } from 'components/StyledComponents';
import { useState } from 'react';
import InsuranceDocument from '../../../components/AppComponents/UploadDocument';
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

const InsuranceUpload = ({show, setShow,selectedFiles, setSelectedFiles}) => {
  const [files, setFiles] = useState([]); // Store uploaded files
  const [selectAll, setSelectAll] = useState(false); // Track select all state
  const [activePolicies, setActivePolicies] = useState([]); // Track active policies for each file
  // const [selectedFiles, setSelectedFiles] = useState([]);  // State to store the selected files
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

const StyledSelect = styled(Select)({
  '& .MuiSelect-select': {
    border: 'none', // Removes border from the select div
    borderRadius: '0.6rem', // Rounded corners
    fontSize: '0.8rem', // Adjust font size
    background: '#F2F2F2', // Background color
    padding: "0.4rem", // Optional: Reduces padding inside the select div
    fontWeight:"400",
  },
  '& fieldset': {
    border: 'none', // Removes the border from the fieldset (for outlined variant)
  },
});
console.log(show,"####")
  return (
    <>
    <Grid item xs={12}>
      <Stack spacing={2} justifyContent="space-between">
        <StyledTypography variant="h5">Do you have any documentation available?</StyledTypography>
        <RadioGroup row sx={{ gap: 5 }} name="manager" value={show}
                        onChange={(event) => setShow(event.target.value)} defaultValue={show}>
          <FormControlLabel value="true" control={<Radio color="success" />} label="Yes" />
          <FormControlLabel value="false" control={<Radio color="success" />} label="No" />
        </RadioGroup>
      </Stack>
    </Grid>

   {show=="true"&&selectedFiles.length<=0&& <InsuranceDocument  setSelectedFiles={setSelectedFiles} selectedFiles={selectedFiles}/>}

    {/* Document Table */}
    {show=="true"&&selectedFiles.length > 0 && (
      <Table>
        <TableHead>
          
        </TableHead>
        <TableBody>
        <TableRow>
            <TableCell>
              <Checkbox label="Select all" /> Select All
            </TableCell>
            <TableCell>
              <StyledSelect
                onChange={(event) => handleTypeChange(event)}
                displayEmpty
                variant="outlined"
                sx={{ width: '200px' }} // Fixed width applied here
              >
                <MenuItem value="" disabled>
                  Select Document Type
                </MenuItem>
                {documentTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </StyledSelect>
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
          {selectedFiles.map((file, index) => (
            <TableRow key={index}>
              {/* File Name */}
              <TableCell>
                <Box display="flex" alignItems="center">
                  <FileIcon sx={{ mr: 1 }} />
                  <Link variant="h7" sx={{ cursor: 'pointer', ml: 1, fontSize: '0.75rem' }}>
                    {truncateFileName(file.name)}
                  </Link>
                </Box>
              </TableCell>

              {/* Document Type Dropdown */}
              <TableCell>
                <StyledSelect
                  onChange={(event) => handleTypeChange(index, event)}
                  displayEmpty
                  variant="outlined"
                  sx={{ width: '200px' }} // Fixed width applied here as well
                >
                  <MenuItem value="" disabled>
                    Select Document Type
                  </MenuItem>
                  {documentTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </StyledSelect>
              </TableCell>

              {/* Remove File Action and Active Document */}
              <TableCell sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                {/* Remove File */}
                <Link variant="h7" sx={{ cursor: 'pointer', fontSize: '0.75rem' }} onClick={() => handleRemoveFile(index)}>
                  Remove File
                </Link>

                {/* Active Document Checkbox */}
                <Box display="flex" alignItems="center" sx={{ fontSize: '0.75rem' }}>
                  <Checkbox
                    checked={activePolicies[index]}
                    // onChange={() => handleActiveChange(index)}
                  />
                  <Typography variant="h7" sx={{ cursor: 'pointer', fontSize: '0.75rem' }}>
                    Active Document
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )}

    {/* Upload Button */}
    {show=="true"&& files.length > 0 && (
      <Box display="flex" justifyContent="flex-end" mt={3}>
        <Button variant="contained" color="primary" size="large">
          Upload
        </Button>
      </Box>
    )}
  </>
  );
};

export default InsuranceUpload;
