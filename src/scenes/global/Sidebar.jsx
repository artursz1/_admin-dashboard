import { useState, useContext } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import { UserContext, RankContext } from "../../App";
import { FaDiscord } from "react-icons/fa";
import "react-pro-sidebar/dist/css/styles.css";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import DirectionsCarFilledOutlinedIcon from "@mui/icons-material/DirectionsCarFilledOutlined";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ApartmentIcon from "@mui/icons-material/Apartment";

import "./Sidebar.css";

const Item = ({ title, to, icon, selected, setSelected }) => {
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: "#fff",
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed] = useState(false);
  const [selected, setSelected] = useState("Informations");
  const { loggedInUsername } = useContext(UserContext);
  const { rankName } = useContext(RankContext);

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background:
            "linear-gradient(45deg, rgba(141,142,142,0.8) 35%, rgba(131,58,180,0.1) 71%) !important",
          opacity: "100%",
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#8d8e8e !important",
        },
        "& .pro-menu-item.active": {
          color: "#8d8e8e !important",
        },
      }}
    >
      <div className="sidebar">
        <ProSidebar
          collapsed={isCollapsed}
          style={{ right: "50px", minWidth: "0", width: "250px" }}
        >
          <Menu iconShape="square">
            {!isCollapsed && (
              <Box mb="25px">
                <Box display="flex" justifyContent="center" alignItems="left">
                  <img
                    alt="profile-user"
                    width="150px"
                    height="150px"
                    src={`../../assets/logo.png`}
                    style={{
                      cursor: "pointer",
                      borderRadius: "50%",
                      margin: "10px 0 0 30px",
                    }}
                  />
                </Box>
                <Box textAlign="center">
                  <Typography
                    variant="h3"
                    color={colors.grey[100]}
                    fontWeight="bold"
                    sx={{ m: "5px 0 0 30px" }}
                  >
                    {loggedInUsername}
                  </Typography>
                  <Typography
                    variant="h5"
                    color={localStorage.getItem("rankColor")}
                    sx={{ m: "0 0 0 30px" }}
                  >
                    {rankName}
                    {localStorage.getItem("isManager") === "1" ? (
                      <span style={{ color: "#000" }}> | Manager</span>
                    ) : null}
                  </Typography>
                </Box>
              </Box>
            )}

            <Box paddingLeft={isCollapsed ? undefined : "10%"}>
              <Typography
                variant="h5"
                color={"#8d8e8e"}
                sx={{ m: "5px 0 5px 30px", opacity: "75%" }}
              >
                <strong>Home</strong>
              </Typography>
              <Item
                title="Informations"
                to="/informations"
                icon={<HomeOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />

              <Typography
                variant="h5"
                color={"#8d8e8e"}
                sx={{ m: "5px 0 5px 30px", opacity: "75%" }}
              >
                <strong>Pages</strong>
              </Typography>
              <Item
                title="Calendar"
                to="/calendar"
                icon={<CalendarMonthIcon />}
                selected={selected}
                setSelected={setSelected}
              />

              <Typography
                variant="h5"
                color={"#8d8e8e"}
                sx={{ m: "15px 0 5px 30px", opacity: "75%" }}
              >
                <strong>Data</strong>
              </Typography>
              <Item
                title="Members"
                to="/members"
                icon={<PeopleOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Vehicles"
                to="/vehicles"
                icon={<DirectionsCarFilledOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
                className="test"
              />
              <Item
                title="CHQ"
                to="/chq"
                icon={<ApartmentIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Discord"
                to="https://discord.gg/xGTM3VQsT2"
                icon={<FaDiscord />}
                selected={selected}
                setSelected={setSelected}
              />
            </Box>
          </Menu>
        </ProSidebar>
      </div>
    </Box>
  );
};

export default Sidebar;
