import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Box,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import ArticleIcon from "@mui/icons-material/Article";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CreateIcon from "@mui/icons-material/Create";
import ChatIcon from "@mui/icons-material/Chat";
import BarChartIcon from "@mui/icons-material/BarChart";
import TimelineIcon from "@mui/icons-material/Timeline";
import { useStyles } from "../Styles/MenuStyle";
import { useDispatch } from "react-redux";
import { removeRole } from "../../redux/features/RoleSlicer";
import { setLogging } from "../../redux/features/LoggingSlicer";
import Cookies from "js-cookie";
import "./Menu.css";
export default function MenuDoctor() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar className={classes.menu}>
          <div className="menu-options">
            <Button className="nav-bar-item">
              <NavLink className={classes.menuItemLink} to="homepage">
                <HomeIcon />
              </NavLink>
            </Button>
            <Button className="nav-bar-item">
              <NavLink className={classes.menuItemLink} to="patients">
                <PeopleIcon />
              </NavLink>
            </Button>

            <Button className="nav-bar-item">
              <NavLink className={classes.menuItemLink} to="allPrescriptions">
                <ArticleIcon />
              </NavLink>
            </Button>
            <Button className="nav-bar-item">
              <NavLink className={classes.menuItemLink} to="analyzes">
                <AttachFileIcon />
              </NavLink>
            </Button>
            <Button className="nav-bar-item">
              <NavLink className={classes.menuItemLink} to="create">
                <CreateIcon />
              </NavLink>
            </Button>
            <Button className="nav-bar-item">
              <NavLink className={classes.menuItemLink} to="graph">
                <TimelineIcon />
              </NavLink>
            </Button>
            <Button className="nav-bar-item">
              <NavLink className={classes.menuItemLink} to="charts">
                <BarChartIcon />
              </NavLink>
            </Button>
            <Button className="nav-bar-item">
              <NavLink className={classes.menuItemLink} to="chat">
                <ChatIcon />
              </NavLink>
            </Button>
          </div>
          <IconButton
            className={classes.icon}
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircleIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem>
              <NavLink
                className={classes.menuItemLink}
                to="personalInfo"
                onClick={handleClose}
              >
                Profilul meu
              </NavLink>
            </MenuItem>
            <MenuItem onClick={handleClose} className={classes.menuItemLink}>
              <NavLink
                className={classes.menuItemLink}
                to="/"
                onClick={() => {
                  handleClose();
                  dispatch(setLogging("false"));
                  dispatch(removeRole());
                  Cookies.remove("jwt");
                }}
              >
                Deconectează-te
              </NavLink>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
