import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const StatBox = ({ title, title2, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width="100%" m="0 30px">
      <Box display="flex" justifyContent="space-between">
        <Box>
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: colors.grey[200] }}
          >
            {title}&nbsp;
            <CheckCircleOutlineIcon
              style={{ color: colors.greenAccent[500], opacity: "90%", fontSize: "17px" }}
            />
          </Typography>
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: colors.grey[200] }}
          >
            {title2}&nbsp;
            <CheckCircleOutlineIcon
              style={{ color: colors.greenAccent[500], opacity: "90%", fontSize: "17px" }}
            />
          </Typography>
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" mt="2px">
        <Typography variant="h5" sx={{ color: colors.greenAccent[500] }}>
          {subtitle}
        </Typography>
      </Box>
    </Box>
  );
};

export default StatBox;
