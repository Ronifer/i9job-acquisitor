import React from "react";
import { Typography, withStyles } from "@material-ui/core";

const styles = (theme) => ({
  title: {
    fontSize: "21px",
    marginBottom: "20px",
    fontWeight: 700,
    textTransform: "uppercase",
  },
});

const TitleBar = (props) => {
  const { classes } = props;
  return (
    <Typography
      color="primary"
      className={classes.title}
      component="h1"
      variant="h2"
      align="left"
    >
      {props.title}
    </Typography>
  );
};

export default withStyles(styles)(TitleBar);
