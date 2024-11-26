import { Skeleton } from "@mui/material";

const AppSkeleton = ({ row, height, variant, width }) => {
  // For the variant types =  "text" | "rectangular" | "rounded" | "circular" | "custom";
  return (
    <>
      {Array.from(new Array(row)).map((index) => (
        <Skeleton variant={variant} width={width} height={height} key={index} />
      ))}
    </>
  );
};
export default AppSkeleton;
