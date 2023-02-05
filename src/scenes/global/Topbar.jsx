import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import { InputBase }  from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

import { UserContext, LoginContext } from "../../App";

const Topbar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

    let { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
    let { loggedInUsername, setLoggedInUsername } = useContext(UserContext);
    console.log('Logged in username(Topbar): ', loggedInUsername);
    console.log('IsLoggedIn(Topbar): ', isLoggedIn);

    const navigate = useNavigate();

    function handleOnLogout() {
        setIsLoggedIn(false);
        setLoggedInUsername('');

        localStorage.setItem('isLoggedIn', false);
        localStorage.setItem('loggedInUsername', '');

        navigate('/login');
    }

    return (
        <Box display="flex" justifyContent="space-between" p={2}>
            {/* SEARCH BAR */}
            <Box
            display="flex" 
            backgroundColor={colors.primary[400]} 
            borderRadius="3px"
            >
                <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search"/>
                <IconButton type="button" sx={{ p: 1 }}>
                    <SearchIcon />
                </IconButton>
            </Box>

            {/* ICONS */}
            <Box display="flex">
                <IconButton onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode === 'dark' ? (
                        <DarkModeOutlinedIcon />
                    ) : (
                        <LightModeOutlinedIcon />
                    )}
                </IconButton>
                <IconButton>
                    <PersonOutlinedIcon />
                </IconButton>
                <IconButton>
                     <LogoutIcon onClick={handleOnLogout}></LogoutIcon>
                </IconButton>
            </Box>
        </Box>
    );
}

export default Topbar;