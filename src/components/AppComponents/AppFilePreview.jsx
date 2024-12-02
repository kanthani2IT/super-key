import { Grid, Tab } from "@mui/material";
import { useState, useEffect, useMemo, useCallback } from "react";
import FileViewer from "react-file-viewer";
import StyledComponents from "./StyledComponents/AppFilePreview";

// Destructuring styled components for reuse
const {
  StyledModal,
  CloseButton,
  TabsContainer,
  StyledTabs,
  TabContent,
  HeaderContainer,
  CenteredGrid,
} = StyledComponents;

/**
 * Utility to extract the file type from a file name
 * @param {string} fileName - The name of the file
 * @returns {string} - The file extension
 */
const getFileType = (fileName) => fileName.split(".").pop();

/**
 * Utility to create a blob URL for a given file
 * @param {File} file - The file object
 * @returns {string} - The generated blob URL
 */
const createBlobURL = (file) => URL.createObjectURL(file);

/**
 * Component for rendering tabs with file names
 * @param {Array<string>} fileNames - List of file names for the tabs
 * @param {number} selectedTab - The currently selected tab index
 * @param {Function} onTabChange - Handler for tab changes
 */
const FileTabs = ({ fileNames, selectedTab, onTabChange }) => (
  <StyledTabs
    value={selectedTab}
    onChange={onTabChange}
    variant="scrollable"
    scrollButtons="auto"
  >
    {fileNames.map((name, index) => (
      <Tab key={index} label={name} />
    ))}
  </StyledTabs>
);

/**
 * Component for rendering the content of the selected file
 * @param {Object} file - The selected file object with type and path
 */
const FileContent = ({ file }) => (
  <FileViewer
    key={`${file.type}-${file.path}`} // Key ensures re-render on file change
    fileType={file.type} // File type (e.g., pdf, jpg)
    filePath={file.path} // File path (blob URL)
    onError={(e) => console.error("Error viewing file:", e)} // Error handler
  />
);

/**
 * Main component for managing file previews in a modal
 * @param {Object} props - Props for the FilePreviews component
 * @param {boolean} open - Indicates if the modal is open
 * @param {Function} onClose - Handler to close the modal
 * @param {Array<Object>} selectedFiles - List of files to display
 * @param {number} selected - The initially selected file index
 */
const FilePreviews = ({ open, onClose, selectedFiles, selected }) => {
  // State to manage selected tab and file details
  const [state, setState] = useState({
    selectedTab: 0,
    selectedFile: { type: "", path: "" },
  });

  /**
   * Handler for tab changes, updates the selected file state
   * Memoized with useCallback to prevent unnecessary re-creation
   */
  const handleTabChange = useCallback(
    (event, newValue) => {
      const file = selectedFiles[newValue]?.file;
      setState({
        selectedTab: newValue,
        selectedFile: {
          type: getFileType(file?.name),
          path: createBlobURL(file),
        },
      });
    },
    [selectedFiles]
  );

  /**
   * Effect to update the selected file based on the initial selection
   */
  useEffect(() => {
    const file = selectedFiles[selected]?.file;
    setState({
      selectedTab: selected,
      selectedFile: {
        type: getFileType(file.name),
        path: createBlobURL(file),
      },
    });
  }, [selected, selectedFiles]);

  /**
   * Memoized list of file names for tabs
   */
  const selectedFileNames = useMemo(
    () => Array.from(selectedFiles).map((item) => item?.file?.name),
    [selectedFiles]
  );

  return (
    <StyledModal open={open} onClose={onClose} disableScrollLock>
      <Grid container spacing={4}>
        {/* Header with close button */}
        <HeaderContainer item xs={12}>
          <CloseButton onClick={onClose}>Close</CloseButton>
        </HeaderContainer>

        {/* Main content with tabs and file viewer */}
        <CenteredGrid item>
          <TabsContainer>
            <FileTabs
              fileNames={selectedFileNames}
              selectedTab={state.selectedTab}
              onTabChange={handleTabChange}
            />
            <TabContent>
              <FileContent file={state.selectedFile} />
            </TabContent>
          </TabsContainer>
        </CenteredGrid>
      </Grid>
    </StyledModal>
  );
};

/**
 * Wrapper component to manage modal state and selected file index
 * @param {Object} props - Props for the FilePreview component
 */
const FilePreview = ({
  setIsModalOpen,
  isModalOpen = false,
  selectedFiles,
  selected,
  setSelected,
}) => {
  /**
   * Handler to close the modal and reset selection
   */
  const onClose = () => {
    setSelected(0); // Reset to the first tab
    setIsModalOpen(false); // Close the modal
  };

  return (
    <FilePreviews
      open={isModalOpen}
      onClose={onClose}
      selectedFiles={selectedFiles}
      selected={selected}
    />
  );
};

export default FilePreview;
