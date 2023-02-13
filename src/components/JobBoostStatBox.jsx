import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";

const JobBoostStatBox = ({ title, title2, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width="100%" m="0 30px">
      <Box display="flex" justifyContent="space-between">
        <Box>
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{ color: colors.greenAccent[500] }}
          >
            {title}
          </Typography>
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{ color: colors.grey[200] }}
          >
            {title2}
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

export default JobBoostStatBox;
