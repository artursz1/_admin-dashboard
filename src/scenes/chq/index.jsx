import { Box } from "@mui/material";
import React from "react";

import Header from "../../components/Header";
import ImageSlider from "../../components/ImageSlider";
import { SliderData } from "../../components/SliderData";

import "../../components/ImageSlider.css";

const Chq = () => {
  return (
    <Box m="20px 200px 0 20px">
      <Header
        title="CHQ"
        subtitle="Location: /findhouse 13"
      ></Header>
      <Box>
        <ImageSlider slides={SliderData} />
      </Box>
    </Box>
  );
};

export default Chq;
