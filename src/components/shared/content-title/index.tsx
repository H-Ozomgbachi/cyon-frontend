import { Typography } from "@mui/material";

type Props = {
  title: string;
};

export default function ContentTitle({ title }: Props) {
  return (
    <Typography
      sx={{
        fontWeight: "bold",
        mb: 1,
      }}
    >
      {title}
    </Typography>
  );
}
