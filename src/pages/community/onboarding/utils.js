export const importPolicyData = {
    title: "Import Policy",
    instructions: "Select or drag and drop here. Can bulk upload",
    footerText: "Support file under 100 MB. 20 files per upload. Import files in DOCX, XLSX, CSV",
    fileTypes: [
      '.docx',
      '.xlsx',
      '.csv',
      '.pdf',
      '.png',
      '.jpeg',
      '.gif'
    ]
  };
  
  export const truncateFileName=(fileName, extensionNeeded=false)=> {
    // Find the last occurrence of a dot (.) to properly separate the name and extension
    const lastDotIndex = fileName.lastIndexOf('.');
    
    // If no dot is found, return the filename as is (no extension)
    if (lastDotIndex === -1) {
        return fileName.length > 20 ? fileName.slice(0, 20) + '...' : fileName;
    }

    // Split the name and extension
    const name = fileName.slice(0, lastDotIndex);
    const extension = fileName.slice(lastDotIndex + 1);

    // Truncate the name if it's longer than 5 characters
    const truncatedName = name.length > 20? name.slice(0, 20) + '...' : name;

    // Return the new file name with the extension
    return extensionNeeded?`${truncatedName}.${extension}`:truncatedName;
}
