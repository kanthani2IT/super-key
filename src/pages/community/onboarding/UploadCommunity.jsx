import CustomUploadTable from "components/AppComponents/CustomUploadTable";

const UploadCommunity = () => {
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
  ];

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

  return <CustomUploadTable cols={cols} tableData={tableData} />;
};
export default UploadCommunity;
