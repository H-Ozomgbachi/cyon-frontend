import { Typography } from "@mui/material";

interface Props {
  title: string;
}

export default function NoResult({ title }: Props) {
  return (
    <Typography
      sx={{
        textAlign: "center",
        marginTop: 10,
      }}
    >
      {title}
    </Typography>
  );
}
