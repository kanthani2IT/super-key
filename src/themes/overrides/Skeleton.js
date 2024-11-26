export default function Skeleton(theme) {
  return {
    MuiSkeleton: {
      variants: [
        {
          props: { variant: "custom" },
          style: {
            borderRadius: "10px",
          },
        },
      ],
    },
  };
}
