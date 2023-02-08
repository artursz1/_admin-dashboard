import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';
import ApartmentIcon from '@mui/icons-material/Apartment';
import "../informations/styles.css";

const Informations = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

    const totalMembers = "52";
    const totalVehicles = "12";

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
        >
            {/* ROW 1 */}
            <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            >
            <StatBox
                title={totalMembers+"/90"}
                subtitle="Total Members"
                progress={Math.round((totalMembers/90) * 100) / 100}
                icon={
                    <PersonAddIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                    />
                }
            />
            </Box>
            <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            >
            <StatBox
                title="[PREMIUM]"
                subtitle="Statistics"
                progress="0.50"
                icon={
                <DescriptionOutlinedIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
                }
            />
            </Box>
            <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            >
            <StatBox
                title={totalVehicles+"/14"}
                subtitle="Vehicles"
                progress={Math.round((totalVehicles/14) * 100) / 100}
                icon={
                    <DirectionsCarFilledOutlinedIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                    />
                }
            />
            </Box>
            <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
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