import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import api from "../../config/api";
import { toast } from "react-toastify";

import { DropzoneArea } from "material-ui-dropzone";
import { DesktopAccessDisabledSharp } from "@material-ui/icons";
import { useParams } from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://i9job.com.br/">
        i9Job{" "}
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage:
      "url(https://optilink.com.cy/wp-content/uploads/2020/05/banner-graphic.svg)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInSide() {
  const classes = useStyles();
  const { code } = useParams();

  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [file, setFile] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit() {
    let data = new FormData();
    data.append("file", file[0]);
    data.append("email", email);
    data.append("full_name", fullName);
    try {
      let response = await api.post(`talents/${code}`, data);
      setSuccess(true);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={0} square>
        <div className={classes.paper}>
          <Typography component="h1" variant="h2">
            Lorem ipsum dolor sit amet
          </Typography>
          <Typography component="h2" variant="subtitle1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </Typography>
          <div className={classes.form}>
            <TextField
              variant="outlined"
              margin="normal"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              fullWidth
              name="fullname"
              label="Nome completo"
              type="text"
              id="fullname"
            />
            <TextField
              variant="outlined"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
              id="email"
              label="E-mail"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <DropzoneArea
              acceptedFiles={["application/pdf"]}
              dropzoneText={
                "Selecione ou arraste seu curriculo em PDF para ca ;)"
              }
              // onChange={file => console.log(file)}
              onChange={(file) => setFile(file)}
            />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(e) => console.log(e)}
                  value="remember"
                  color="primary"
                />
              }
              label="Aceito os termos de uso e politicas de privacidade."
            />
            <Button
              onClick={handleSubmit}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Enviar
            </Button>
            <Box mt={5}>
              <Copyright />
            </Box>
          </div>
        </div>
      </Grid>
    </Grid>
  );
}
