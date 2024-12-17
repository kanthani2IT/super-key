import { Box, Typography } from "@mui/material";
import UploadIcon from "assets/images/icons/NavIcons/UploadIcon";
import FileUploadButton from "components/AppComponents/FileUploadButton"; // Importing the common button component
import { useState } from "react";
import { hundredMbValidation } from "utils/constants";
import { SEVERITY } from "utils/message";
import { importPolicyData } from "../../pages/community/onboarding/utils"; // Importing the data
import { useSnackbar } from "./SnackBarProvider";

const InsuranceDocument = ({
  enable = true,
  selectedFiles,
  setSelectedFiles,
  documentTypesData = [],
  handleFile,
  isMultiple,
  readData,
}) => {
  const { updateSnackbar } = useSnackbar();
  const [isDragging, setIsDragging] = useState(false);
  const handleFileValidation = (fileList) => {
    if (handleFile) {
      handleFile(fileList);
    } else {
      const allowedExtensions = importPolicyData?.fileTypes || [];

      const validFiles = fileList.filter(
        (file) =>
          allowedExtensions.some((ext) =>
            file.name.toLowerCase().endsWith(ext.toLowerCase())
          ) && file.size <= hundredMbValidation
      );

      const invalidSizeFiles = fileList.filter(
        (file) => file.size > hundredMbValidation
      );
      const invalidFormatFiles = fileList.filter(
        (file) =>
          !allowedExtensions.some((ext) =>
            file.name.toLowerCase().endsWith(ext.toLowerCase())
          )
      );

      // Show error for files exceeding size limit
      if (invalidSizeFiles.length > 0) {
        updateSnackbar({
          message: "One or more files exceed the maximum size of 100 MB.",
          severity: SEVERITY.error,
        });
      }

      // Show error for files with unsupported format
      if (invalidFormatFiles.length > 0) {
        updateSnackbar({
          message:
            "Unsupported file format. Please select files with the following formats: DOCX, XLSX, CSV, Pdf",
          severity: SEVERITY.error,
        });
      }

      if (validFiles.length > 0) {
        const filesArray = validFiles.map((file) => ({
          file,
          docType: documentTypesData?.[0] || [],
          active: false,
        }));

        const totalFiles = selectedFiles.length + filesArray.length;

        if (totalFiles > 20) {
          updateSnackbar({
            message: "You can only upload a maximum of 20 files.",
            severity: SEVERITY.error,
          });
        } else {
          setSelectedFiles((prevFiles) => [...prevFiles, ...filesArray]);
        }
      }
    }
  };
  const handleFileUpload = (files) => {
    handleFileValidation(Array.from(files));
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    handleFileUpload(files);
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
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      sx={{ cursor: "pointer" }}
    >
      {/* Icon */}
      <UploadIcon />

      {/* Title */}
      <Typography
        variant="h6"
        fontWeight="bold"
        gutterBottom
        sx={{ mt: "1rem" }}
      >
        {importPolicyData.title}
      </Typography>

      {/* Instructions */}
      {enable && (
        <Typography variant="body2" color="textSecondary" gutterBottom>
          {importPolicyData.instructions}
        </Typography>
      )}

      {/* Import Button */}
      {enable && (
        <div>
          <FileUploadButton
            onFileChange={(event) => handleFileUpload(event.target.files)}
            fileTypes={importPolicyData.fileTypes}
            isMultiple={isMultiple}
          />
        </div>
      )}

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
        {readData
          ? "Support file under 100 MB. Import files in  XLSX "
          : importPolicyData.footerText}
      </Typography>
    </Box>
  );
};

export default InsuranceDocument;