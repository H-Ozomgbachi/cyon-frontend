import { ExpandMore } from "@mui/icons-material";
import { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";

type Props = {
  isExpanded?: boolean;
  title: string;
  titleIcon: ReactJSXElement;
  content: ReactJSXElement;
};

export default function CustomAccordion(props: Props) {
  const [isExpanded, setIsExpanded] = useState(props.isExpanded);

  return (
    <Accordion
      expanded={isExpanded}
      onChange={() => setIsExpanded(!isExpanded)}
    >
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        sx={{
          fontWeight: "bold",
        }}
      >
        {props.titleIcon} <br />{" "}
        <Typography
          sx={{
            fontWeight: "bold",
            color: "#666",
          }}
        >
          {props.title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>{props.content}</AccordionDetails>
    </Accordion>
  );
}
