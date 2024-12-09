import { Button } from "@mui/material";

const FileUploadButton = ({
  disabled,
  onFileChange,
  fileTypes,
  isMultiple,
}) => {
  return (
    <Button
      disabled={disabled}
      variant="contained"
      color="info"
      sx={{ mt: 2, mb: 2, borderRadius: "0.7rem", p: "0.7rem 4rem" }}
      component="label"
    >
      Select File
      <input
        type="file"
        hidden
        multiple={isMultiple ?? false}
        onChange={onFileChange}
        accept={fileTypes.join(", ")} // Accept multiple file types from data
      />
    </Button>
  );
};

export default FileUploadButton;
