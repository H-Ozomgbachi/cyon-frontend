import { HorizontalRule } from "@mui/icons-material";
import React from "react";
import Carousel from "react-material-ui-carousel";
import "./CustomCarousel.css";

interface Props {
  children: React.ReactNode;
}

export default function CustomCarousel({ children }: Props) {
  return (
    <Carousel
      animation="fade"
      height={200}
      interval={6000}
      indicatorContainerProps={{
        className: "indicator-container",
      }}
      activeIndicatorIconButtonProps={{
        className: "indicator-btn_active",
      }}
      indicatorIconButtonProps={{
        className: "indicator-btn",
      }}
      IndicatorIcon={<HorizontalRule />}
    >
      {children}
    </Carousel>
  );
}
