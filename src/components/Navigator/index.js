import React, { useContext } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Avatar, withStyles, Box, Typography } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import AssignmentIcon from "@material-ui/icons/Assignment";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import GroupIcon from "@material-ui/icons/GroupOutlined";

import LogoWhite from "./../../assets/i9job_providorio_white.png";
import { Link } from "react-router-dom";
import AuthContext from "../../contexts/auth";

const categories = [
  {
    id: "Recrutamento",
    children: [
      { id: "Vagas Disponíveis", icon: <AssignmentIcon />, to: "/" },
      { id: "Mihhas vagas", icon: <AssignmentTurnedInIcon />, to: "/my-jobs" },
      // { id: "Storage", icon: <PermMediaOutlinedIcon /> },
      // { id: "Hosting", icon: <PublicIcon /> },
      // { id: "Functions", icon: <SettingsEthernetIcon /> },
      // { id: "ML Kit", icon: <SettingsInputComponentIcon /> },
    ],
  },
  {
    id: "Talentos",
    children: [
      { id: "Meus talentos", icon: <GroupIcon />, to: "/talents" },
    ],
  },
  {
    id: "Usuário",
    children: [
      // { id: "Perfil", icon: <PeopleIcon /> },
      { id: "Sair", icon: <ExitToAppOutlinedIcon />, to: "" },
    ],
  },
];

const styles = (theme) => ({
  categoryHeader: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  categoryHeaderPrimary: {
    color: theme.palette.common.white,
  },
  item: {
    paddingTop: 1,
    paddingBottom: 1,
    color: "rgba(255, 255, 255, 0.7)",
    "&:hover,&:focus": {
      backgroundColor: "rgba(255, 255, 255, 0.08)",
    },
  },
  itemCategory: {
    backgroundColor: "#232f3e",
    boxShadow: "0 -1px 0 #404854 inset",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  firebase: {
    fontSize: 24,
    color: theme.palette.common.white,
  },
  itemActiveItem: {
    color: "#4fc3f7",
  },
  itemPrimary: {
    fontSize: "inherit",
  },
  itemIcon: {
    minWidth: "auto",
    marginRight: theme.spacing(2),
  },
  divider: {
    marginTop: theme.spacing(2),
  },
  avatar: {
    cursor: "pointer",
    width: 64,
    height: 64,
  },
});

function Navigator(props) {
  const { classes, ...other } = props;

  const { user } = useContext(AuthContext);

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem
          className={clsx(classes.firebase, classes.item, classes.itemCategory)}
        >
          <Avatar variant="square" src={LogoWhite}></Avatar>{" "}
          <span>Recrutador</span>
        </ListItem>
        {/* <Box alignItems="center" display="flex" flexDirection="column" p={2}>
          <Avatar className={classes.avatar}>RS</Avatar>
          <Typography className={classes.name} color="textPrimary" variant="h5">
            Ronifer Silva
          </Typography>
          <Typography color="textSecondary" variant="body2">
            Full Stack developer
          </Typography>
        </Box> */}
        <ListItem className={clsx(classes.item, classes.itemCategory)}>
          <ListItemIcon className={classes.itemIcon}>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText
            classes={{
              primary: classes.itemPrimary,
            }}
          >
            Dashboard
          </ListItemText>
        </ListItem>
        {/* <Divider className={classes.divider} /> */}
        {categories.map(({ id, children }) => (
          <React.Fragment key={id}>
            <ListItem className={classes.categoryHeader}>
              <ListItemText
                classes={{
                  primary: classes.categoryHeaderPrimary,
                }}
              >
                {id}
              </ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon, active, to }) => (
              <Link to={to}>
                <ListItem
                  key={childId}
                  button
                  className={clsx(
                    classes.item,
                    active && classes.itemActiveItem
                  )}
                >
                  <ListItemIcon className={classes.itemIcon}>
                    {icon}
                  </ListItemIcon>
                  <ListItemText
                    classes={{
                      primary: classes.itemPrimary,
                    }}
                  >
                    {childId}
                  </ListItemText>
                </ListItem>
              </Link>
            ))}

            <Divider className={classes.divider} />
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
}

Navigator.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navigator);
