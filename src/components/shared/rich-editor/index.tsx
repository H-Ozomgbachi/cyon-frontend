import { Box } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface Props {
  setValue: Function;
  defaultValue: string;
}

export default function RichEditor({ setValue, defaultValue }: Props) {
  const myColors = ["rgba(25, 80, 44, 0.895)", "white", "rgb(150, 114, 23)"];

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      [{ color: myColors }],
      [{ background: myColors }],
      [{ size: ["small", "large"] }],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "list",
    "bullet",
    "link",
    "color",
    "background",
    "size",
  ];

  return (
    <Box>
      <ReactQuill
        theme="snow"
        modules={modules}
        formats={formats}
        defaultValue={defaultValue}
        onChange={(e) => setValue(e)}
      />
    </Box>
  );
}
