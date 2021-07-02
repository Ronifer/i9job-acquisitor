import React, { useState, useEffect } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  Typography,
  Grid,
  Paper,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Button,
  withStyles,
  Box,
  InputAdornment,
} from "@material-ui/core";

import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import PageTitle from "../../components/PageTitle";
import { TalentDetailsContainer } from "./styles";

import api from "./../../config/api";

function TalentDetails(props) {
  const { id } = useParams();
  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [fullName, setFullName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [mainAcademic, setMainAcademic] = useState("");
  const [professionalExperiences, setProfessionalExperiences] = useState("");
  const [secundaryAcademic, setSecundaryAcademic] = useState("");
  const [mainSkills, setMainSkills] = useState([]);

  useEffect(() => {
    api.get(`/acquisitor/talents/${id}`).then((resp) => {
      console.log(resp.data);
      setFullName(resp.data.full_name);
      setEmail(resp.data.email);
      setPhone(resp.data.phone);
      setBirthDate(resp.data.birth_date);
      setLocation(resp.data.location);
      setMainAcademic(resp.data.main_academic);
      setProfessionalExperiences(resp.data.professional_experiences);
      setSecundaryAcademic(resp.data.secundary_academic);
    });
  }, []);

  function handleSubmit() {
    let request = {
      main_academic: mainAcademic,
      secundary_academic: mainAcademic,
      professional_experiences: professionalExperiences,
    };

    console.log(request);
    api
      .put(`/acquisitor/talents/${id}`, request)
      .then((resp) => {
        console.log(resp.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <TalentDetailsContainer>
      <Paper>
        <PageTitle title={id ? "Editar Vaga" : "Adicionar nova vaga"} />
        {id ? null : (
          <div className="form-header-infos-container">
            <div style={{ width: "30%" }}>
              <Typography variant="body2" component="span">
                Cadastre sua vaga, assim que nossa equipe aprova-la ela esterá
                disponivel para todos os nossos recrutadores. Voce tambem pode
                preencher os campos a partir de uma vaga existente.
              </Typography>
            </div>
          </div>
        )}

        <Grid container spacing={1}>
          <div className="container-form-with-divider">
            <Grid container item xs={12} spacing={3}>
              <Grid item xs={12} sm={12}>
                <Typography
                  className="form-session-title"
                  component="h2"
                  variant="h1"
                >
                  Informações da talento
                </Typography>
              </Grid>
            </Grid>
            <Grid container item xs={12} spacing={3}>
              <Grid item xs={4} sm={4}>
                <TextField
                  onChange={(e) => setFullName(e.target.value)}
                  value={fullName}
                  variant="outlined"
                  label="Nome completo"
                  disabled
                  fullWidth
                />
              </Grid>
              <Grid item xs={4} sm={4}>
                <TextField
                  value={birthDate}
                  variant="outlined"
                  label="Data de nascimento"
                  disabled
                  fullWidth
                />
              </Grid>
              <Grid item xs={4} sm={4}>
                <TextField
                  value={phone}
                  variant="outlined"
                  label="Telefone"
                  disabled
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid container item xs={12} spacing={3}>
              <Grid item xs={4} sm={4}>
                <TextField
                  value={email}
                  variant="outlined"
                  label="Email"
                  disabled
                  fullWidth
                />
              </Grid>
              <Grid item xs={4} sm={4}>
                <TextField
                  value={location}
                  variant="outlined"
                  label="CEP"
                  disabled
                  fullWidth
                />
              </Grid>
            </Grid>
          </div>
          <div className="container-form-with-divider">
            <Grid container item xs={12} spacing={3}>
              <Grid item xs={12} sm={12}>
                <Typography
                  className="form-session-title"
                  component="h2"
                  variant="h1"
                >
                  Detalhes do telento
                </Typography>
                <Typography variant="body2" component="span">
                  Use o curriculo anexado do talento para preencher essas
                  informacões.
                </Typography>
              </Grid>
            </Grid>
            <Grid container item xs={12} spacing={3}>
              <Grid item xs={6} sm={6}>
                <TextField
                  multiline
                  value={mainAcademic}
                  onChange={(e) => setMainAcademic(e.target.value)}
                  variant="outlined"
                  label="Formação acadêmica"
                  rows={6}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <TextField
                  multiline
                  value={secundaryAcademic}
                  onChange={(e) => setSecundaryAcademic(e.target.value)}
                  variant="outlined"
                  label="Cursos, Certificações"
                  rows={6}
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid container item xs={12} spacing={3}>
              <Grid item xs={6} sm={6}>
                <TextField
                  multiline
                  value={professionalExperiences}
                  onChange={(e) => setProfessionalExperiences(e.target.value)}
                  variant="outlined"
                  label="Experiência profissional"
                  rows={6}
                  fullWidth
                />
              </Grid>
            </Grid>
          </div>
          <div className="container-form-with-divider">
            <Grid container item xs={12} spacing={3}>
              <Grid item xs={12} sm={12}>
                <Typography
                  className="form-session-title"
                  component="h2"
                  variant="h1"
                >
                  Palavras Chave
                </Typography>
              </Grid>
            </Grid>
            <Grid container item xs={12} spacing={3}>
              <Grid item xs={6}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Autocomplete
                      multiple
                      options={skills}
                      value={selectedSkills}
                      getOptionLabel={(option) => option.name}
                      filterSelectedOptions
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          label="Tecnologias"
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>
          <div className="action-buttons-container">
            <Link to="/" component={Button} variant="contained">
              Voltar
            </Link>

            <Button variant="contained" onClick={handleSubmit} color="primary">
              Editar
            </Button>
          </div>
        </Grid>
      </Paper>
    </TalentDetailsContainer>
  );
}

export default TalentDetails;
