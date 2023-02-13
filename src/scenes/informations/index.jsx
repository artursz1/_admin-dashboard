import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import StatisticsStatBox from "../../components/StatisticsStatBox";
import JobBoostStatBox from "../../components/JobBoostStatBox";
import DirectionsCarFilledOutlinedIcon from "@mui/icons-material/DirectionsCarFilledOutlined";
import ApartmentIcon from "@mui/icons-material/Apartment";

const Informations = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const totalMembers = "52";
  const totalVehicles = "13";

  return (
    <Box m="20px 200px 0 20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="INFORMATIONS" subtitle="SUICIDE | .SS" />
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
        sx={{ opacity: "95%" }}
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.greenAccent[900]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="20px"
        >
          <StatBox
            title={totalMembers + "/120"}
            subtitle="Total Members"
            progress={Math.round((totalMembers / 120) * 100) / 100}
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.greenAccent[900]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="20px"
        >
          <StatisticsStatBox
            title="[PREMIUM]"
            title2="[VIP]"
            progress="0.50"
          />
          <JobBoostStatBox
            title="JOB BOOST"
            title2="100%"
            progress="1"
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.greenAccent[900]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="20px"
        >
          <StatBox
            title={totalVehicles + "/16"}
            subtitle="Vehicles"
            progress={Math.round((totalVehicles / 16) * 100) / 100}
            icon={
              <DirectionsCarFilledOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.greenAccent[900]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="20px"
        >
          <StatBox
            title="House 13"
            subtitle="CHQ"
            progress="1"
            icon={
              <ApartmentIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Informations;
