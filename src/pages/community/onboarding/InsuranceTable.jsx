import styled from "@emotion/styled";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Link,
  Radio,
  RadioGroup,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import FileIcon from "assets/images/icons/FileIcon";
import AppAutoComplete from "components/AppComponents/AppAutoComplete";
import FilePreview from "components/AppComponents/AppFilePreview";
import PreviewButton from "components/AppComponents/PreviewButton";
import { useDocumentsQuery } from "hooks/useDropDown";
import { useEffect, useState } from "react";
import InsuranceDocument from "../../../components/AppComponents/UploadDocument";
import { truncateFileName } from "./utils";

// Document types
export const documentTypes = [{ name: "Endorsement", value: "Endosement" }];

const StyledBox = styled(Box)({
  maxHeight: "400px",
  overflowY: "auto",
  overflowX: "auto",
  width: "100%",
});

const StyledTable = styled(Table)({
  tableLayout: "auto",
  width: "100%",
  borderCollapse: "collapse",
  position: "relative",
  overflow: "visible",
});

const EllipsisCell = styled(TableCell)({
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  width: "25%",
});

const ActionBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "1rem",
  justifyContent: "right",
});

const FileNameBox = styled(Box)({
  display: "flex",
  alignItems: "center",
});

const StyledTableRow = styled(TableRow)`
  background-color: ${(props) => (props.isHovered ? "#E6F0FD" : "transparent")};
  color: ${(props) => (props.isHovered ? "white" : "inherit")};
  cursor: "pointer";
  &:hover {
    background-color: "#E6F0FD";
    color: white;
  }

  ${(props) =>
    props.isFixed &&
    `
    position: sticky;
    top: 0;
    background-color: white;
    z-index: 10;
  `}
`;

const StickyRow = styled(TableRow)`
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 10;
`;

// Reusable components
const DocumentTypeDropdown = ({ value, onChange, documentTypesData }) => (
  <>
    <AppAutoComplete
      freeSolo={false}
      sx={{
        ".MuiOutlinedInput-root fieldset": {
          borderColor: "#F7F9FB",
        },
        width: 250,
        borderColor: "#F7F9FB",
      }}
      onChange={onChange}
      nameParam="documentTypeName"
      valueParam="documentId"
      filter
      disableClearable
      searchKey="communityManager"
      value={value}
      options={documentTypesData}
      placeholder="Select Document Type"
      size="small"
      // onSearch={onSearch}
    />
  </>
);

const FileRow = ({
  files,
  index,
  onRemove,
  onTypeChange,
  onActiveChange,
  setHoveredSingleRow,
  hoveredSingleRow,
  hoveredRow,
  setHoveredRow,
  onClickPreview,
  documentTypesData,
}) => (
  <StyledTableRow
    key={index}
    isHovered={hoveredSingleRow === index}
    onMouseEnter={() => setHoveredSingleRow(index)}
    onMouseLeave={() => setHoveredSingleRow(null)}
  >
    <EllipsisCell
      key={index}
      onMouseEnter={() => setHoveredRow(index)}
      onMouseLeave={() => setHoveredRow(null)}
    >
      {hoveredRow === index && (
        <div
          style={{
            position: "absolute",
            left: "6%",
            zIndex: 1000000,
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <PreviewButton
            fileName={files.file.name}
            index={index}
            onPreview={onClickPreview}
          />
        </div>
      )}
      <FileNameBox>
        <FileIcon sx={{ mr: 1 }} />
        <Link
          variant="h7"
          sx={{
            cursor: "pointer",
            ml: 1,
            fontSize: "0.85rem",
            textDecoration: "underline",
          }}
        >
          {truncateFileName(files.file.name)}
        </Link>
      </FileNameBox>
    </EllipsisCell>
    <EllipsisCell>
      <DocumentTypeDropdown
        value={files.docType}
        onChange={({ target }, data) => onTypeChange(index, target.value)}
        documentTypesData={documentTypesData}
      />
    </EllipsisCell>
    <EllipsisCell>
      <ActionBox>
        <Link
          variant="h7"
          sx={{
            cursor: "pointer",
            fontSize: "0.85rem",
            textDecoration: "underline",
          }}
          onClick={() => onRemove(index)}
        >
          Remove File
        </Link>
      </ActionBox>
    </EllipsisCell>
    <EllipsisCell>
      <Box display="flex" alignItems="center">
        <Checkbox
          checked={files.active}
          onChange={() => onActiveChange(index)}
        />
        <Typography
          variant="h7"
          sx={{
            fontSize: "0.85rem",
            color: "#7f7f7f",
            cursor: "pointer",
            "&:hover": {
              color: "#000", // Change this to the desired hover color
            },
          }}
          onClick={() => onActiveChange(index)}
        >
          Active Document
        </Typography>
      </Box>
    </EllipsisCell>
  </StyledTableRow>
);

// Main Component
const InsuranceUpload = ({
  show,
  setShow,
  selectedFiles,
  setSelectedFiles,
}) => {
  const [files, setFiles] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [hoveredSingleRow, setHoveredSingleRow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState(0);
  const { data: documentTypesData } = useDocumentsQuery();
  const [docType, setDocType] = useState(null);
  useEffect(() => {
    if (documentTypesData?.data) {
      setDocType(documentTypesData?.data[0]);
    }
  }, [documentTypesData?.data]);

  const handleTypeChange = (index, data) => {
    if (index == "all") {
      setSelectedFiles((prevFiles) =>
        prevFiles.map((file) => ({ ...file, docType: data }))
      );
      setDocType(data);
    } else {
      const updatedFiles = [...selectedFiles]; // Create a copy of the array
      updatedFiles[index] = { ...updatedFiles[index], docType: data }; // Update the specific object
      setSelectedFiles(updatedFiles); // Set the updated array
    }
  };

  const handleRemoveFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
    let updatedFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);
    if (!updatedFiles?.length) {
      setDocType(documentTypesData?.data[0]);
    }
  };

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setSelectedFiles((prevFiles) =>
      prevFiles.map((file) => ({ ...file, active: newSelectAll }))
    );
  };

  const handleActiveChange = (index) => {
    const updatedFiles = [...selectedFiles]; // Create a copy of the array
    updatedFiles[index] = {
      ...updatedFiles[index],
      active: !updatedFiles[index].active,
    }; // Update the specific object
    setSelectedFiles(updatedFiles); // Set the updated array
  };

  const onClickPreview = (event, index) => {
    event.preventDefault();
    setIsModalOpen(true);
    setSelected(index);
  };

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Stack
          spacing={2}
          textAlign={!selectedFiles.length ? "start" : "center"}
        >
          {!selectedFiles.length ? (
            <>
              <Typography variant="h5">
                Do you have any documents available?
              </Typography>
              <RadioGroup
                row
                sx={{ gap: 5 }}
                name="manager"
                value={show}
                onChange={(event) => setShow(event.target.value)}
              >
                <FormControlLabel
                  value="true"
                  control={<Radio color="success" />}
                  label="Yes"
                />
                <FormControlLabel
                  value="false"
                  control={<Radio color="success" />}
                  label="No"
                />
              </RadioGroup>
            </>
          ) : (
            <Typography variant="h5" color="gray">
              Update the Document types for the uploaded files
            </Typography>
          )}
        </Stack>
      </Grid>
      {show === "true" && (
        <>
          {!selectedFiles.length && (
            <Grid item xs={12}>
              <InsuranceDocument
                enable
                setSelectedFiles={setSelectedFiles}
                selectedFiles={selectedFiles}
                documentTypesData={documentTypesData?.data}
                isMultiple
              />
            </Grid>
          )}

          <Grid item xs={12}>
            {selectedFiles.length > 0 && (
              <StyledBox>
                <StyledTable>
                  <TableBody>
                    <StickyRow>
                      <EllipsisCell></EllipsisCell>
                      <EllipsisCell colSpan={1}>
                        {" "}
                        {/* <DocumentTypeDropdown
                          value={docType}
                          documentTypesData={documentTypesData?.data}
                          onChange={({ target }, data) =>
                            handleTypeChange("all", target.value)
                          }
                        /> */}
                      </EllipsisCell>
                      <EllipsisCell></EllipsisCell>
                      <EllipsisCell>
                        <Checkbox
                          onChange={handleSelectAll}
                          checked={selectAll}
                        />{" "}
                        <Typography
                          variant="h7"
                          sx={{
                            fontSize: "0.85rem",
                            color: "#000",
                            cursor: "pointer",
                          }}
                          onClick={handleSelectAll}
                        >
                          Select All
                        </Typography>
                      </EllipsisCell>
                    </StickyRow>
                    {selectedFiles.map((files, index) => (
                      <FileRow
                        key={index}
                        files={files}
                        index={index}
                        onRemove={handleRemoveFile}
                        onTypeChange={handleTypeChange}
                        onActiveChange={handleActiveChange}
                        isActive={files[index]?.active}
                        hoveredRow={hoveredRow}
                        setHoveredRow={setHoveredRow}
                        onClickPreview={onClickPreview}
                        setHoveredSingleRow={setHoveredSingleRow}
                        hoveredSingleRow={hoveredSingleRow}
                        documentTypesData={documentTypesData?.data}
                      />
                    ))}
                  </TableBody>
                </StyledTable>
              </StyledBox>
            )}
          </Grid>
        </>
      )}
      {show === "true" && files.length > 0 && (
        <Box display="flex" justifyContent="flex-end" mt={3}>
          <Button variant="contained" color="primary" size="large">
            Upload
          </Button>
        </Box>
      )}
      {selectedFiles.length > 0 && (
        <FilePreview
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          selectedFiles={selectedFiles}
          selected={selected}
          setSelected={setSelected}
        />
      )}
      {selectedFiles.length > 0 && (
        <Box p={4}>
          <PreviewButton index={0} onPreview={onClickPreview} previewAll />
        </Box>
      )}
    </Grid>
  );
};

export default InsuranceUpload;
