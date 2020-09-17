import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import Popover from "@material-ui/core/Popover";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles } from "@material-ui/core/styles";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";

import { Link, useLocation } from "react-router-dom";

import LogoWhite from "./../../assets/i9job_providorio_white.png";

import AuthContext from "./../../contexts/auth";

const lightColor = "rgba(255, 255, 255, 0.7)";

const styles = (theme) => ({
  secondaryBar: {
    zIndex: 0,
  },
  menuButton: {
    marginLeft: -theme.spacing(1),
  },
  iconButtonAvatar: {
    padding: 4,
  },
  link: {
    textDecoration: "none",
    color: lightColor,
    "&:hover": {
      color: theme.palette.common.white,
    },
  },
  button: {
    borderColor: lightColor,
  },
});

function Header(props) {
  let location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const { classes, onDrawerToggle } = props;
  const { user, signOut } = useContext(AuthContext);
  const tabsPath = ["", "managers"];

  function handleUserPopoverClick(event) {
    setAnchorEl(event.currentTarget);
  }

  const handleUserPopoverClose = () => {
    setAnchorEl(null);
  };

  const openUserPopover = Boolean(anchorEl);
  return (
    <React.Fragment>
      <AppBar color="primary" position="sticky" elevation={0}>
        <Toolbar>
          <Grid container spacing={1} alignItems="center">
            <Hidden smUp>
              <Grid item>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={onDrawerToggle}
                  className={classes.menuButton}
                >
                  <MenuIcon />
                </IconButton>
              </Grid>
            </Hidden>
            <Grid item>
              <Avatar variant="square" src={LogoWhite}></Avatar>
            </Grid>
            <Grid item xs />
            {/* <Grid item>
              <Link className={classes.link} href="#" variant="body2">
                Go to docs
              </Link>
            </Grid> */}

            <Grid item>
              <Tooltip title="Notificações • Sem Notificações">
                <IconButton color="inherit">
                  <NotificationsIcon />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item>
              <IconButton
                color="inherit"
                onClick={handleUserPopoverClick}
                className={classes.iconButtonAvatar}
              >
                <Avatar>{user.acquisitor.full_name[0]}</Avatar>
                <Popover
                  id={`user-popover`}
                  open={openUserPopover}
                  anchorEl={anchorEl}
                  onClose={handleUserPopoverClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleUserPopoverClose}>
                      <MenuList id="menu-list-grow">
                        {/* <MenuItem onClick={() => console.log("Profile")}>
                          Meu Perfil
                        </MenuItem> */}
                        <MenuItem onClick={() => signOut()}>Sair</MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Popover>
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
     
      <AppBar
        component="div"
        className={classes.secondaryBar}
        color="primary"
        position="static"
        elevation={0}
      >
        <Tabs
          value={
            location.pathname === "/"
              ? 0
              : tabsPath.indexOf(location.pathname.split("/")[1])
          }
          textColor="inherit"
        >
          <Link to="/" component={Tab} textColor="inherit" label="Vagas" />
        </Tabs>
      </AppBar>
    </React.Fragment>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
