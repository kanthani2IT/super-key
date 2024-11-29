import { Skeleton } from "@mui/material";

const AppSkeleton = ({ row, height, variant, width, gap = 0 }) => {
  // For the variant types: "text" | "rectangular" | "rounded" | "circular";
  return (
    <>
      {Array.from(new Array(row)).map((_, index) => (
        <Skeleton
          variant={variant}
          width={width}
          height={height}
          key={index}
          animation="wave"
          sx={{ marginBottom: gap }}
        />
      ))}
    </>
  );
};

export default AppSkeleton;
