import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import RefreshIcon from "@material-ui/icons/Refresh";
import { Link } from "react-router-dom";
import api from "../../config/api";
import { toast } from "react-toastify";

import TalentList from "./components/TalentList";

const styles = (theme) => ({
  paper: {
    width: "90%",
    margin: "50px auto",
    overflow: "hidden",
  },
  searchBar: {
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
  },
  searchInput: {
    fontSize: theme.typography.fontSize,
  },
  block: {
    display: "block",
  },
  addUser: {
    marginRight: theme.spacing(1),
  },
  contentWrapper: {
    margin: "40px 16px",
  },
});

function Content(props) {
  const { classes } = props;
  const [talents, setTalents] = useState([]);
  const [generatedLink, setGeneratedLink] = useState("");

  function getTalents() {
    api.get(`/acquisitor/talents`).then((resp) => {
      setTalents(resp.data);
    });
  }

  async function handleLinkGenerate() {
    try {
      let response = await api.post(`/acquisitor/talents/invite`);
      console.log(response);
      setGeneratedLink(response.data.code);
      toast.success("Link copiado :)");
    } catch (e) {
      console.log(e);
      toast.error("Erro interno");
    }
  }

  useEffect(() => {
    getTalents();
  }, []);

  return (
    <Paper className={classes.paper}>
      <AppBar
        className={classes.searchBar}
        position="static"
        color="default"
        elevation={0}
      >
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <SearchIcon className={classes.block} color="inherit" />
            </Grid>
            <Grid item xs>
              <TextField
                fullWidth
                placeholder="Busque pelo nome da vaga"
                InputProps={{
                  disableUnderline: true,
                  className: classes.searchInput,
                }}
              />
            </Grid>
            {generatedLink ? (
              <Grid item xs>
                <TextField
                  fullWidth
                  disabled
                  value={generatedLink}
                  InputProps={{
                    disableUnderline: true,
                    className: classes.searchInput,
                  }}
                />
              </Grid>
            ) : null}

            <Grid item>
              <Button onClick={handleLinkGenerate}>
                Gerar link de cadastro
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <div className={classes.contentWrapper}>
        {talents.length > 0 ? (
          <TalentList refreshTalents={getTalents} talents={talents} />
        ) : (
          <Typography color="textSecondary" align="center">
            Você não está trabalhando em nenhuma vaga.
          </Typography>
        )}
      </div>
    </Paper>
  );
}

Content.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Content);
