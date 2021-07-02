import React, { useState, useEffect } from "react";
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
import { Autocomplete } from "@material-ui/lab";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import api from "../../../../config/api";
import { toast } from "react-toastify";

export default function TalentsModal({ open, close, jobId }) {
  let [availableTalents, setAvailableTalents] = useState([]);
  let [acquisitorFeedback, setAcquisitorFeedback] = useState("");
  let [desiredSalary, setDesiredSalary] = useState("");
  let [talent, setTalent] = useState(null);

  useEffect(() => {
    api
      .get(`/acquisitor/talents/available`)
      .then((resp) => {
        setAvailableTalents(resp.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  async function handleSubmit() {
    try {
      let response = await api.post(`/acquisitor/jobs/${jobId}/talents`, {
        talent_id: talent,
        acquisitor_feedback: acquisitorFeedback,
        desired_salary: desiredSalary
      });
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
          Adicionar talento a vaga
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Aqui você pode cadastrar o seu talento para a vaga, assim que
            cadastrado esse talento estará disponivel para a empresa aprova-lo
            :)
          </DialogContentText>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={8}>
              <Autocomplete
                id="combo-box-demo"
                options={availableTalents}
                onChange={(e, value) => setTalent(value.id)}
                getOptionLabel={(option) => option.email}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Talentos disponiveis"
                    variant="outlined"
                    fullWidth
                  />
                )}
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
