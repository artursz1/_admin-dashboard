import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import React from 'react';

import Header from "../../components/Header";
import ImageSlider from "../../components/ImageSlider";
import { SliderData } from "../../components/SliderData";

import '../../components/ImageSlider.css';

const Chq = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box ml="20px" mt="20px">
            <Header title="CHQ" subtitle="Location: /findhouse 13"></Header>
            <Box ml="20px">
                <ImageSlider slides={SliderData} />
            </Box>
        </Box>
    )
}

export default Chq;