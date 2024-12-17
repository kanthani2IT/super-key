import { Typography } from "@mui/material";

import icons from "assets/images/icons/mui-icons/Icons";
import AppGrid from "components/AppComponents/AppGrid";
import { useSnackbar } from "components/AppComponents/SnackBarProvider";
import InsuranceDocument from "components/AppComponents/UploadDocument";
import { RadiusStyledButton } from "components/StyledComponents";
import { useDownloadOnboardingTemplate } from "hooks/useCommunity";
import {
  useCommunityManagersQuery,
  usePropertyManagersQuery,
} from "hooks/useDropDown";
import { SEVERITY } from "utils/message";
import * as XLSX from "xlsx";
import { generateUniqueId } from "./utils";

const validHeaders = [
  "CommunityName",
  "CommunityEmail",
  "CommunityManagerName",
  "PropertyManagerName",
  "Address(Street, City, StateCode, ZipCode, Country)",
];

const UploadCommunity = ({ setBulkUploadFieldValue }) => {
  const { updateSnackbar } = useSnackbar();
  const { data: communityManagerList } = useCommunityManagersQuery();
  const { data: propertyManagerList } = usePropertyManagersQuery();
  const { mutateAsync: downloadTemplate } = useDownloadOnboardingTemplate();

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
          const fileData = [];
          const draftData = [];
          json?.map((item) => {
            const isValid = checkManualEmptyValue(item);
            const communityManagerName = isValid
              ? communityManagerList?.data?.find(
                  (el) => el?.username === item?.CommunityManagerName
                ) || null
              : null;
            const propertyManagerName = isValid
              ? propertyManagerList?.data?.find(
                  (el) => el?.username === item?.PropertyManagerName
                ) || null
              : null;
            const obj = {
              documentId: generateUniqueId() || null,
              communityName: item?.CommunityName || null,
              communityEmail: item?.CommunityEmail || null,
              communityManagerName: communityManagerName,
              propertyManagerName: propertyManagerName,
              address:
                item?.["Address(Street, City, StateCode, ZipCode, Country)"] ||
                null,
              isEdit: false,
            };
            if (isValid && propertyManagerName && communityManagerName) {
              fileData.push(obj);
            } else {
              draftData.push(obj);
            }
          });
          setBulkUploadFieldValue("fileData", fileData);
          setBulkUploadFieldValue("draftData", draftData);
        } else {
          updateSnackbar({
            message: "Invalid Column Name",
            severity: SEVERITY.error,
          });
        }
      };
      reader.readAsArrayBuffer(file[0]);
    }
  };

  const checkManualEmptyValue = (item) => {
    const header = Object.keys(item);
    const isIncludedAllRequiredColumns = validHeaders.every((col) =>
      header.includes(col)
    );
    if (isIncludedAllRequiredColumns) {
      const valid = Object.values(item).some((el) => el?.trim()?.length === 0);
      return !valid;
    } else {
      return false;
    }
  };

  const handleDownload = async () => {
    try {
      const response = await downloadTemplate();
      let blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      let myUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = myUrl;
      link.setAttribute("download", "template.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      updateSnackbar({
        message: err.data.message,
        severity: SEVERITY.error,
      });
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
          <Typography variant="body1" color="#5B738B" noWrap>
            1. Please download the template{" "}
          </Typography>
          <Typography variant="body1" color="#5B738B" noWrap>
            2. Upload the Details in the given template format{" "}
          </Typography>
          <Typography variant="body1" color="#5B738B" noWrap>
            3. Upload the file{" "}
          </Typography>
        </AppGrid>
        <AppGrid size={{ xl: 6 }} display={"flow"}>
          <RadiusStyledButton
            variant="outlined"
            startIcon={icons.IconArrowDownward()}
            color="info"
            textColor="#2954E1"
            borderRadius="10px"
            width="auto"
            onClick={handleDownload}
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
