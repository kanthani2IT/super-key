import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Modal, Tab, Tabs } from "@mui/material";
import FileViewer from "react-file-viewer";
import styled from "@emotion/styled";

// Styled Components
const StyledModal = styled(Modal)`
  backdrop-filter: blur(8px);
  background-color: rgba(0, 0, 0, 0.5);
`;

const CloseButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 1rem;
  background-color: #fff;
  color: #7b828f;
  border-radius: 0.5rem;
  padding: 0.6rem 2.3rem;
  font-size: 0.75rem;
  font-weight: 700;
  &:hover {
    background-color: #fff;
    color: #7b828f;
  }
`;

const TabsContainer = styled(Box)`
  width: 50vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledTabs = styled(Tabs)`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  .MuiTab-root {
    text-transform: none;
    font-weight: 500;
    padding: 0.4rem 1.5rem;
    background: white;
    color: #000;
    font-size: 0.75rem;
    border-radius: 1rem;
    min-height: 2rem;
    margin: 0 1rem;
    display: flex;
    align-items: center;
    justify-content: center;

    &.Mui-selected {
      color: #000;
      background-color: #d8e0ff;
      font-weight: bold;
    }
  }
  .MuiTabs-indicator {
    display: none;
  }
`;

const TabContent = styled(Box)`
  background-color: white;
  height: 75vh;
  overflow: auto;
  padding: 1rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const HeaderContainer = styled(Grid)`
  display: flex;
  justify-content: flex-end;
  margin-right: 2rem;
`;

const CenteredGrid = styled(Grid)`
  display: flex;
  justify-content: center;
  width: 100%;
`;

// FilePreviews Component
const FilePreviews = ({ open, onClose, selectedFiles, selected }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedFile, setSelectedFile] = useState({ type: "", path: "" });

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
    const file = selectedFiles[newValue]?.file;
    setSelectedFile({
      type: file?.name.split(".").pop(),
      path: URL.createObjectURL(file),
    });
  };

  useEffect(() => {
    setSelectedTab(selected);
    const file = selectedFiles[selected]?.file;
    setSelectedFile({
      type: file.name.split(".").pop(),
      path: URL.createObjectURL(file),
    });
  }, [selected, selectedFiles]);

  const selectedFileNames = Array.from(selectedFiles).map((item) => item?.file?.name);

  return (
    <StyledModal open={open} onClose={onClose} disableScrollLock>
      <Grid container spacing={4}>
        <HeaderContainer item xs={12}>
          <CloseButton onClick={onClose}>Close</CloseButton>
        </HeaderContainer>
        <CenteredGrid item>
          <TabsContainer>
            <StyledTabs
              value={selectedTab}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
            >
              {selectedFileNames.map((name, index) => (
                <Tab key={index} label={name} />
              ))}
            </StyledTabs>
            <TabContent>
              <FileViewer
                key={`${selectedFile.type}-${selectedFile.path}`}
                fileType={selectedFile.type}
                filePath={selectedFile.path}
                onError={(e) => console.error("Error viewing file:", e)}
              />
            </TabContent>
          </TabsContainer>
        </CenteredGrid>
      </Grid>
    </StyledModal>
  );
};

// Usage Example Component
const FilePreview = ({
  setIsModalOpen,
  isModalOpen = false,
  selectedFiles,
  selected,
  setSelected,
}) => {
  const onClose = () => {
    setSelected(0);
    setIsModalOpen(false);
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
