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
        fontSize: "1.2rem",
      }}
    >
      {title}
    </Typography>
  );
}
