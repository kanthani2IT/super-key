import CustomUploadTable from "components/AppComponents/CustomUploadTable";

const cols = [
  { title: "Community Name", fieldName: "communityName" },
  { title: "Community's Email", fieldName: "communityEmail" },
  { title: "Contact No", fieldName: "contactNo" },
  { title: "Insurance Status", fieldName: "insuranceStatus" },
  { title: "Community Managers", fieldName: "communityManagers" },
  { title: "Property Manager No", fieldName: "propertyManagerNo" },
  { title: "Address", fieldName: "address" },
  { title: "", fieldName: "action" },
];

const tableData = [
  {
    communityName: "Desert Eagle",
    communityEmail: "eagle@gmail.com",
    contactNo: "+1 4323456",
    insuranceStatus: "Insured",
    communityManagers: "Alex",
    propertyManagerNo: "+1 4323456",
    address: "Phoenix North EstatesNY 54321,USA",
  },
  {
    communityName: "Desert Eagle",
    communityEmail: "eagle@gmail.com",
    contactNo: "+1 4323456",
    insuranceStatus: "Insured",
    communityManagers: "Alex",
    propertyManagerNo: "+1 4323456",
    address: "Phoenix North EstatesNY 54321,USA",
  },
  {
    communityName: "Desert Eagle",
    communityEmail: "eagle@gmail.com",
    contactNo: "+1 4323456",
    insuranceStatus: "Insured",
    communityManagers: "Alex",
    propertyManagerNo: "+1 4323456",
    address: "Phoenix North EstatesNY 54321,USA",
  },
  {
    communityName: "Desert Eagle",
    communityEmail: "eagle@gmail.com",
    contactNo: "+1 4323456",
    insuranceStatus: "Insured",
    communityManagers: "Alex",
    propertyManagerNo: "+1 4323456",
    address: "Phoenix North EstatesNY 54321,USA",
  },
  {
    communityName: "Desert Eagle",
    communityEmail: "eagle@gmail.com",
    contactNo: "+1 4323456",
    insuranceStatus: "Insured",
    communityManagers: "Alex",
    propertyManagerNo: "+1 4323456",
    address: "Phoenix North EstatesNY 54321,USA",
  },
  {
    communityName: "Desert Eagle",
    communityEmail: "eagle@gmail.com",
    contactNo: "+1 4323456",
    insuranceStatus: "Insured",
    communityManagers: "Alex",
    propertyManagerNo: "+1 4323456",
    address: "Phoenix North EstatesNY 54321,USA",
  },
];

const UploadCommunity = () => {
  return <CustomUploadTable cols={cols} tableData={tableData} />;
};
export default UploadCommunity;
