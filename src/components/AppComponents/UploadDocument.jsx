import { Box, Typography } from "@mui/material";
import UploadIcon from "assets/images/icons/NavIcons/UploadIcon";
import FileUploadButton from "components/AppComponents/FileUploadButton"; // Importing the common button component
import { importPolicyData } from "../../pages/community/onboarding/utils"; // Importing the data

const InsuranceDocument = ({
  enable = true,
  selectedFiles,
  setSelectedFiles,
  documentTypesData = [],
  readData,
  handleFile,
  isMultiple,
}) => {
  const handleFileUpload = (event) => {
    const fileList = event.target.files;
    if (handleFile) {
      handleFile(fileList);
    } else {
      const filesArray = Array.from(fileList).map((file) => ({
        file, // The original file object
        docType: documentTypesData?.[0] || [], // Default value for docType
        active: false, // Default value for active
      }));
      const totalFiles = selectedFiles.length + filesArray.length;

      if (totalFiles > 20) {
        alert("You can only upload a maximum of 20 files.");
      } else {
        setSelectedFiles((prevFiles) => [...prevFiles, ...filesArray]); // Append new files to the existing ones
      }
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
      <Typography
        variant="h6"
        fontWeight="bold"
        gutterBottom
        sx={{ mt: "1rem" }}
      >
        {readData ? "Upload the Template File" : importPolicyData.title}
      </Typography>

      {/* Instructions */}
      {enable && (
        <Typography variant="body2" color="textSecondary" gutterBottom>
          {importPolicyData.instructions}
        </Typography>
      )}

      {/* Import Button */}
      {enable && (
        <FileUploadButton
          onFileChange={handleFileUpload}
          fileTypes={importPolicyData.fileTypes}
          isMultiple={isMultiple}
        />
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
