import React from "react";
import {
  createMuiTheme,
  createStyles,
  ThemeProvider,
  withStyles,
} from "@material-ui/core/styles";
import { ToastContainer } from "react-toastify";
import CssBaseline from "@material-ui/core/CssBaseline";
import "react-toastify/dist/ReactToastify.css";
import Routes from "./routes";

import { GlobalStyle } from "./globalStyle";

let theme = createMuiTheme({
  palette: {
    primary: {
      light: "#18202c",
      main: "#18202c",
      dark: "#18202c",
      contrastText: "#FFF",
    },
    error: { 
      light: "##e74c3c",
      main: "#e74c3c",
      dark: "#c0392b",
      contrastText: "#FFF", 
    }
  },
  typography: {
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5,
    },
  },
  shape: {
    borderRadius: 8,
  },
  props: {
    MuiTab: {
      disableRipple: true,
    },
  },
  mixins: {
    toolbar: {
      minHeight: 48,
    },
  },
});

theme = {
  ...theme,
  overrides: {
    MuiDrawer: {
      paper: {
        backgroundColor: "#18202c",
      },
    },
    MuiButton: {
      root: {
        borderRadius: "3px",
        height: "40px",
      },
      label: {
        textTransform: "uppercase",
      },
      contained: {
        boxShadow: "none",
        "&:active": {
          boxShadow: "none",
        },
      },
    },
    MuiOutlinedInput: {
      root: {
        borderRadius: "3px",
      },
    },
    MuiTabs: {
      root: {
        marginLeft: theme.spacing(1),
      },
      indicator: {
        height: 3,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        backgroundColor: theme.palette.common.white,
      },
    },
    MuiTab: {
      root: {
        textTransform: "none",
        margin: "0 16px",
        minWidth: 0,
        padding: 0,
        [theme.breakpoints.up("md")]: {
          padding: 0,
          minWidth: 0,
        },
      },
    },
    MuiIconButton: {
      root: {
        padding: theme.spacing(1),
      },
    },
    MuiTooltip: {
      tooltip: {
        borderRadius: 4,
      },
    },
    MuiDivider: {
      root: {
        backgroundColor: "#404854",
      },
    },
    MuiListItemText: {
      primary: {
        fontWeight: theme.typography.fontWeightMedium,
      },
    },
    MuiListItemIcon: {
      root: {
        color: "inherit",
        marginRight: 0,
        "& svg": {
          fontSize: 20,
        },
      },
    },
    MuiAvatar: {
      root: {
        width: 32,
        height: 32,
      },
    },
  },
};

const drawerWidth = 256;

const styles = createStyles({
  root: {
    display: "flex",
    minHeight: "100vh",
  },
});

function Paperbase(props) {
  const { classes } = props;
  // const [mobileOpen, setMobileOpen] = React.useState(false);

  // const handleDrawerToggle = () => {
  //   setMobileOpen(!mobileOpen);
  // };

  return (
    <ThemeProvider theme={theme}>
      {/* <GlobalStyle /> */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        closeOnClick
        draggable
      />
      <div className={classes.root}>
        <CssBaseline />

        <Routes />
      </div>
    </ThemeProvider>
  );
}

export default withStyles(styles)(Paperbase);
