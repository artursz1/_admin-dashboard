import { Box } from "@mui/material";
import React from 'react';

import Header from "../../components/Header";
import ImageSlider from "../../components/ImageSlider";
import { SliderData } from "../../components/SliderData";

import '../../components/ImageSlider.css';

const Chq = () => {
    return (
        <Box mr="20px" mt="20px">
            <Header title="CHQ" subtitle="Location: /findhouse 13"></Header>
            <Box mr="20px">
                <ImageSlider slides={SliderData} />
            </Box>
        </Box>
    )
}

export default Chq;