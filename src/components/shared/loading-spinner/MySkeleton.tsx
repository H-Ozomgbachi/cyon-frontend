import { Box, Skeleton } from "@mui/material";

interface Props {
  count: number;
}

export default function MySkeleton({ count = 1 }: Props) {
  let arr = [];
  for (let i = 0; i < count; i++) {
    arr.push(i);
  }

  return (
    <Box>
      {arr.map((el) => (
        <Box key={el}>
          <Skeleton animation="wave" />
          <Skeleton variant="rectangular" height={60} />
          <Skeleton animation="wave" />
        </Box>
      ))}
    </Box>
  );
}
