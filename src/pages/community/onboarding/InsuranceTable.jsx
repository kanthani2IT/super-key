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
  TableRow,
  Typography,
} from '@mui/material';
import FileIcon from 'assets/images/icons/FileIcon';
import { useState } from 'react';
import InsuranceDocument from '../../../components/AppComponents/UploadDocument';
import { truncateFileName } from './utils';
import FilePreview from './FilePreview';
import PreviewButton from 'components/AppComponents/PreviewButton';

// Document types
const documentTypes = [
  'Endorsement',
  'Amendment',
  'Insurance policy',
  'Certificate of insurance',
  'Legal',
  'Premium finance Agreement',
];

// Styled components
const StyledSelect = styled(Select)({
  border: "none",
  '& .MuiSelect-select': {
    border: 'none !important',
    borderRadius: '0.7rem',
    fontSize: '0.85rem',
    fontWeight: "400",
    background: '#F2F2F2',
    padding: '0.4rem',
    maxWidth: '8rem',
    width: "8rem",
    backgroundColor: "#F2F2F2 !important"
  },
  '& fieldset': { border: 'none', fontSize:"400", },
  '& .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent' },
  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent', },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent' },
});

const StyledBox = styled(Box)({
  maxHeight: '400px',
  overflowY: 'auto',
  overflowX: 'auto',
  width: '100%',
});

const StyledTable = styled(Table)({
  tableLayout: 'auto',
  width: '100%',
  borderCollapse: 'collapse',
  position: "relative",
  overflow: "visible",
});

const EllipsisCell = styled(TableCell)({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  width: '25%',
});

const ActionBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
});

const FileNameBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
});

// Reusable components
const DocumentTypeDropdown = ({ value, onChange }) => (
  <StyledSelect value={value} onChange={onChange} style={{ border: "none" }} label="Select Document Type">
    <MenuItem value="" disabled>Select Document Type</MenuItem>
    {documentTypes.map((type) => (
      <MenuItem key={type} value={type}>{type}</MenuItem>
    ))}
  </StyledSelect>
);

const FileRow = ({ file, index, onRemove, onTypeChange, onActiveChange, isActive, hoveredRow, setHoveredRow, onClickPreview }) => (
  <TableRow key={index}>
    <EllipsisCell key={index}  onMouseEnter={() => setHoveredRow(index)} onMouseLeave={() => setHoveredRow(null)}>
      {hoveredRow === index && (
        <div style={{ position: "absolute", left: "6%", zIndex: 1000000, display: "flex", alignItems: "center", gap: "10px" }}>
          <PreviewButton fileName={file.name} index={index} onPreview={onClickPreview} />
        </div>
      )}
      <FileNameBox>
        <FileIcon sx={{ mr: 1 }} />
        <Link variant="h7" sx={{ cursor: 'pointer', ml: 1, fontSize: '0.85rem', textDecoration: "underline" }}>
          {truncateFileName(file.name)}
        </Link>
      </FileNameBox>
    </EllipsisCell>
    <EllipsisCell>
      <DocumentTypeDropdown value={file.documentType} onChange={(event) => onTypeChange(index, event)} />
    </EllipsisCell>
    <EllipsisCell>
      <ActionBox>
        <Link variant="h7" sx={{ cursor: 'pointer', fontSize: '0.85rem', textDecoration: "underline" }} onClick={() => onRemove(index)}>
          Remove File
        </Link>
        
      </ActionBox>
    </EllipsisCell>
    <EllipsisCell>
    <Box display="flex" alignItems="center">
          <Checkbox checked={isActive} onChange={() => onActiveChange(index)} />
          <Typography variant="h7" sx={{ fontSize: '0.85rem' }}>Active Document</Typography>
        </Box>
    </EllipsisCell>
  </TableRow>
);

// Main Component
const InsuranceUpload = ({ show, setShow, selectedFiles, setSelectedFiles }) => {
  const [files, setFiles] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [activePolicies, setActivePolicies] = useState([]);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState(0);

  const handleTypeChange = (index, event) => {
    const updatedFiles = [...files];
    updatedFiles[index].documentType = event.target.value;
    setFiles(updatedFiles);
  };

  const handleRemoveFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
  };

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setActivePolicies(Array(files.length).fill(newSelectAll));
  };

  const handleActiveChange = (index) => {
    const updatedActivePolicies = [...activePolicies];
    updatedActivePolicies[index] = !updatedActivePolicies[index];
    setActivePolicies(updatedActivePolicies);
  };

  const onClickPreview = (event, index) => {
    event.preventDefault();
    setIsModalOpen(true);
    setSelected(index);
  };

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Stack spacing={2} textAlign={!selectedFiles.length ? 'start' : 'center'}>
          <Typography variant="h5">Do you have any documentation available?</Typography>
          {!selectedFiles.length && (
            <RadioGroup row sx={{ gap: 5 }} name="manager" value={show} onChange={(event) => setShow(event.target.value)}>
              <FormControlLabel value="true" control={<Radio color="success" />} label="Yes" />
              <FormControlLabel value="false" control={<Radio color="success" />} label="No" />
            </RadioGroup>
          )}
        </Stack>
      </Grid>
      {show === 'true' && (
        <>
          <Grid item xs={12}>
            {!selectedFiles.length && (
              <InsuranceDocument enable setSelectedFiles={setSelectedFiles} selectedFiles={selectedFiles} />
            )}
          </Grid>
          <Grid item xs={12}>
            {selectedFiles.length > 0 && (
              <StyledBox>
                <StyledTable>
                  <TableBody>
                    <TableRow>
                      <EllipsisCell>
                       
                      </EllipsisCell>
                      <EllipsisCell colSpan={2}> <DocumentTypeDropdown /></EllipsisCell>
                      <EllipsisCell>
                      <Checkbox onChange={handleSelectAll} checked={selectAll} /> Select All
                      </EllipsisCell>
                    </TableRow>
                    {selectedFiles.map((file, index) => (
                      <FileRow
                        key={index}
                        file={file}
                        index={index}
                        onRemove={handleRemoveFile}
                        onTypeChange={handleTypeChange}
                        onActiveChange={handleActiveChange}
                        isActive={activePolicies[index]}
                        hoveredRow={hoveredRow}
                        setHoveredRow={setHoveredRow}
                        onClickPreview={onClickPreview}
                      />
                    ))}
                  </TableBody>
                </StyledTable>
              </StyledBox>
            )}
          </Grid>
        </>
      )}
      {show === 'true' && files.length > 0 && (
        <Box display="flex" justifyContent="flex-end" mt={3}>
          <Button variant="contained" color="primary" size="large">
            Upload
          </Button>
        </Box>
      )}
      {selectedFiles.length > 0 && (
        <FilePreview setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} selectedFiles={selectedFiles} selected={selected} setSelected={setSelected} />
      )}
    </Grid>
  );
};

export default InsuranceUpload;
