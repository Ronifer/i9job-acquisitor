import React, { useState } from "react";
import * as Yup from "yup";
import "date-fns";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
} from "@material-ui/core/";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import api from "../../../../config/api";
import { toast } from "react-toastify";

export default function TalentsModal({ open, close, jobId }) {
  let [fullName, setFullName] = useState("");
  let [email, setEmail] = useState("");
  let [location, setLocation] = useState("");
  let [acquisitorFeedback, setAcquisitorFeedback] = useState("");
  let [birthDate, setBirthDate] = useState(new Date());
  let [desiredSalary, setDesiredSalary] = useState("");
  let [professionalExperiences, setProfessionalExperiences] = useState("");
  let [academy, setAcademy] = useState("");
  let [phone, setPhone] = useState("");

  async function handleSubmit() {
    let body = {
      talent: {
        full_name: fullName,
        email,
        location,
        birth_date: birthDate,
        phone,
        academy,
        professional_experiences: professionalExperiences,
      },
      acquisitor_feedback: acquisitorFeedback,
      desired_salary: desiredSalary,
    };

    const schema = Yup.object().shape({
      talent: Yup.object().shape({
        full_name: Yup.string().required(),
        birth_date: Yup.date().required(),
        email: Yup.string().email().required(),
        phone: Yup.string().required(),
        location: Yup.string().required(),
        academy: Yup.string().required(),
        professional_experiences: Yup.string().required(),
        location: Yup.string().required(),
      }),
      acquisitor_feedback: Yup.string().required(),
      desired_salary: Yup.number().required(),
    });

    try {
      await schema.validate(body);
    } catch (e) {
      console.log(e);
      toast.error(e);
      return false;
    }

    try {
      let response = await api.post(`/acquisitor/jobs/${jobId}/talents`, body);
      console.log(response.data);
      toast.success("Talento adicionado a vaga");
      close();
    } catch (e) {
      toast.error(e.response.error);
    }
  }

  return (
    <div>
      <Dialog
        disableBackdropClick
        maxWidth={"md"}
        fullWidth
        open={open}
        onClose={close}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Cadastrar talento para a vaga
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Aqui você pode cadastrar o seu talento para a vaga, assim que
            cadastrado esse talento estará disponivel para a empresa aprova-lo
            :)
          </DialogContentText>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Nome completo"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  fullWidth
                  inputVariant="outlined"
                  format="dd/MM/yyyy"
                  label="Data de nascimento"
                  value={birthDate}
                  onChange={(date) => setBirthDate(date)}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                label="Telefone"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Endereço"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                value={desiredSalary}
                onChange={(e) => setDesiredSalary(e.target.value)}
                fullWidth
                label="Pretenção salarial"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                value={academy}
                onChange={(e) => setAcademy(e.target.value)}
                fullWidth
                label="Formação academica"
                multiline
                rows={4}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                value={professionalExperiences}
                onChange={(e) => setProfessionalExperiences(e.target.value)}
                fullWidth
                label="Experiencias profissionais"
                multiline
                rows={4}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                value={acquisitorFeedback}
                onChange={(e) => setAcquisitorFeedback(e.target.value)}
                fullWidth
                label="Feedback do recrutador"
                multiline
                rows={4}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={close} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Adicionar Talento
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
