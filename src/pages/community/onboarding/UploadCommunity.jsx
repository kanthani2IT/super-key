import { Typography } from "@mui/material";

import icons from "assets/images/icons/mui-icons/Icons";
import AppGrid from "components/AppComponents/AppGrid";
import InsuranceDocument from "components/AppComponents/UploadDocument";
import { RadiusStyledButton } from "components/StyledComponents";
import * as XLSX from "xlsx";

const validHeaders = [
  "CommunityName",
  "CommunityEmail",
  "ContactNo",
  "InsurancrStatus",
  "CommunityManager",
  "PropertyMangerNo",
  "Address",
];
const UploadCommunity = ({ setBulkUploadFieldValue }) => {
  const handleFileUpload = async (file) => {
    if (file[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);
        const header = Object.keys(json[0]);
        const isIncludedAllRequiredColumns = validHeaders.every((col) =>
          header.includes(col)
        );
        if (isIncludedAllRequiredColumns) {
          const sheetData = json?.map((item) => {
            return {
              ...item,
              isEdit: false,
            };
          });
          setBulkUploadFieldValue("fileData", sheetData);
        } else {
          console.log("invalid column");
        }
      };
      reader.readAsArrayBuffer(file[0]);
    }
  };

  return (
    <>
      <AppGrid container spacing={5}>
        <AppGrid
          size={{ xl: 6 }}
          display={"flex"}
          alignItems={"flex-start"}
          flexDirection={"column"}
          gap={"10px"}
        >
          <Typography variant="h5" color="#5B738B" noWrap>
            Steps to bulk upload the communities
          </Typography>
          <Typography variant="h5" color="#5B738B" noWrap>
            1.Please download the template{" "}
          </Typography>
          <Typography variant="h5" color="#5B738B" noWrap>
            2.Upload the Details in the given template format{" "}
          </Typography>
          <Typography variant="h5" color="#5B738B" noWrap>
            3.Upload the file{" "}
          </Typography>
        </AppGrid>
        <AppGrid
          size={{ xl: 6 }}
          display={"flex"}
          alignItems={"center"}
          flexDirection={"column"}
          gap={"10px"}
        >
          <RadiusStyledButton
            variant="outlined"
            startIcon={icons.IconArrowDownward()}
            color="info"
            textColor="#2954E1"
            borderRadius="10px"
            width="auto"
          >
            Download the Template
          </RadiusStyledButton>
          <Typography variant="caption" color="#8F8F8F">
            Format: XLSX
          </Typography>
        </AppGrid>
        <AppGrid size={{ xl: 12 }}>
          <InsuranceDocument readData={true} handleFile={handleFileUpload} />
        </AppGrid>
      </AppGrid>
    </>
  );
};

export default UploadCommunity;
