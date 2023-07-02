import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { Box, Slide } from "@mui/material";
import { useRef } from "react";
import useIsInViewport from "../../../custom-hooks/viewport";

interface Props {
  children: ReactJSXElement;
}

export default function SlideAnimation({ children }: Props) {
  const boxEl = useRef(null);
  const isVisible = useIsInViewport(boxEl);

  return (
    <Box ref={boxEl}>
      <Slide in={isVisible} direction="right" timeout={500}>
        {children}
      </Slide>
    </Box>
  );
}
