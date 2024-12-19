import { useEffect, useRef, useState } from "react";
import { useAuthCookies } from "./cookie";

export function addQueryParams(baseUrl, params = {}) {
  const filteredParams = Object.entries(params).filter(
    ([key, value]) => value !== "" && value != null && value !== undefined
  );

  const query = new URLSearchParams(filteredParams)?.toString();
  return query ? `${baseUrl}?${query}` : baseUrl;
}

export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value || "");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value || "");
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export function useDebounceFn(fn, delay = 500) {
  const timer = useRef(null);

  return function (...args) {
    // Clear the previous timer if the function is invoked again
    if (timer.current) {
      clearTimeout(timer.current);
    }

    // Set the new timer to invoke the function after the specified delay
    timer.current = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}
export const removeExtraSpaces = (input = "") => {
  return input.replace(/^\s+/, "").replace(/\s+/g, " ");
};

// Dollar formatting function
export const formatAsDollar = (number) => {
  return `${new Intl.NumberFormat("en-US").format(number)}`;
};

export const compareeJson = (a, b) => {
  return JSON.stringify(a) !== JSON.stringify(b);
};

export const transformedRenewalData = (inputData) => {
  // Check if inputData is null, undefined, or not an object
  if (!inputData || typeof inputData !== "object") {
    return []; // Return an empty array when inputData is invalid
  }

  return Object.keys(inputData).map((key) => ({
    name: key?.toLowerCase(),
    value: inputData[key],
  }));
};

export const mergeCMCId = (url) => {
  const { getCookie } = useAuthCookies();
  const cmcId = getCookie("cmcId") || "001bn00001CitW2AAJ";
  if (cmcId) {
    const newUrl = url.includes("CMCID") ? url?.replace("CMCID", cmcId) : url;
    // const [currentUrl, queries] = url?.split("?");
    // const newUrl = queries
    //   ? `${currentUrl}/${cmcId}?${queries}`
    //   : `${currentUrl}/${cmcId}`;
    return `${newUrl}`;
  }
  return url;
};

export const logoutUser = (noRedirect = false, url) => {
  const { removeAuthCookie } = useAuthCookies();
  removeAuthCookie("token");
  removeAuthCookie("cmcId");
  !noRedirect && window.location.replace("/login");
  url && window.location.replace(url);
};

export const importPolicyData = {
  title: "Upload Documents",
  instructions: "Select or drag and drop here. Can bulk upload",
  footerText:
    "Support file under 100 MB. 20 files per upload. Import files in DOCX, XLSX, CSV, PDF",
  fileTypes: [".docx", ".xlsx", ".csv", ".pdf"],
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
  return inputData.map((item) => ({
    name: item.file.name, // Extract file name
    status: item.active ? "APPROVED" : "UNAPPROVED", // Fixed status
    type: item.docType.documentId, // Extract documentId as type
  }));
};

export const getContactInfo = (addressDetails) => {
  const { city, state, zipcode } = addressDetails;

  const addressParts = [city, state, zipcode].filter(Boolean);

  return addressParts.join(", ");
};

export const useAuth = () => {
  const { getCookie } = useAuthCookies();

  const token = getCookie("token");
  return !!token;
};

export const transformData = (data) => {
  return data.map((item) => {
    // Determine the property based on the column value
    const type =
      item.column == 0
        ? "assignedTo"
        : item.column == 1
          ? "priority"
          : "status";

    // Return the transformed object
    return {
      column: type,
      value: item.name == "0" ? "active" : item.name, // Rename 'name' to 'value'
      operator: item.operator, // Keep 'operator' as-is
    };
  });
};

export const updatePriorityType = (data, newValue) => {
  return data.map((item) => {
    if (item.operator === "contains") {
      // Update the value for type 'priority'
      return { ...item, name: newValue };
    }
    // Return unchanged item for other types
    return item;
  });
};
export const dateText = (dueDate) => {
  return dueDate.split("-").join("/");
};
export const truncateText = (text, limit = 20) => {
  if (!text) return "";
  return text.length > limit ? `${text.slice(0, limit)}...` : text;
};
