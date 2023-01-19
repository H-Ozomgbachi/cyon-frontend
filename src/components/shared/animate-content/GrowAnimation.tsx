import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { Box, Grow } from "@mui/material";
import { useRef } from "react";
import useIsInViewport from "../../../custom-hooks/viewport";

interface Props {
  children: ReactJSXElement;
}

export default function GrowAnimation({ children }: Props) {
  const boxEl = useRef(null);
  const isVisible = useIsInViewport(boxEl);

  return (
    <Box ref={boxEl}>
      <Grow in={isVisible} timeout={500}>
        {children}
      </Grow>
    </Box>
  );
}
