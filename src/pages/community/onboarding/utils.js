export const importPolicyData = {
  title: "Upload Documents",
  instructions: "Select or drag and drop here. Can bulk upload",
  footerText:
    "Support file under 100 MB. 20 files per upload. Import files in DOCX, XLSX, CSV",
  fileTypes: [".docx", ".xlsx", ".csv", ".pdf",],
};

export const truncateFileName = (
  fileName,
  size = 20,
  extensionNeeded = false
) => {
  // Find the last occurrence of a dot (.) to properly separate the name and extension
  const lastDotIndex = fileName?.lastIndexOf(".");

  // If no dot is found, return the filename as is (no extension)
  if (lastDotIndex === -1) {
    return fileName.length > size ? fileName.slice(0, size) + "..." : fileName;
  }

  // Split the name and extension
  const name = fileName?.slice(0, lastDotIndex);
  const extension = fileName?.slice(lastDotIndex + 1);

  // Truncate the name if it's longer than 5 characters
  const truncatedName =
    name?.length > size ? name.slice(0, size) + "..." : name;

  // Return the new file name with the extension
  return extensionNeeded ? `${truncatedName}.${extension}` : truncatedName;
};

// Function to transform the data
export const transformDocuments = (inputData) => {
  return inputData.map(item => ({
    name: item.file.name,  // Extract file name
    status: item.active?"APPROVED":"UNAPPROVED",    // Fixed status
    type: item.docType.documentId  // Extract documentId as type
  }));
};

export const getContactInfo = (addressDetails) => {
  const { city, state, zipcode } = addressDetails;

  const addressParts = [city, state, zipcode].filter(Boolean);

  return addressParts.join(", ");
};