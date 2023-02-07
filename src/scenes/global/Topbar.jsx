import * as React from 'react';
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
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { UserContext, LoginContext, RankContext, RankColor, ManagerContext } from "../../App";

const Topbar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

    let { setIsLoggedIn } = useContext(LoginContext);
    let { setLoggedInUsername } = useContext(UserContext);
    let { setRankName } = useContext(RankContext);
    let { setRankColor } = useContext(RankColor);
    let { setIsManager } = useContext(ManagerContext);

    const navigate = useNavigate();

    function handleOnLogout() {
        setIsLoggedIn(false);
        setLoggedInUsername('');
        setRankName('');
        setRankColor('');
        setIsManager(false);

        localStorage.clear();
        localStorage.setItem('isManager', false);

        navigate('/login');
        return;
    }

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleEditProfile = () => {

        setAnchorEl(null);
    };

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
                    <PersonOutlinedIcon 
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    />
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                        'aria-labelledby': 'basic-button',
                        }}
                    >
                    <MenuItem onClick={handleEditProfile}>Edit Profile</MenuItem>
                </Menu>
                </IconButton>
                <IconButton>
                     <LogoutIcon onClick={handleOnLogout}></LogoutIcon>
                </IconButton>
            </Box>
        </Box>
    );
}

export default Topbar;