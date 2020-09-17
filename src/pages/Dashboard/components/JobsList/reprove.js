import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
} from "@material-ui/core";
// import { Container } from './styles';

function Reprove(props) {
  let [reproveFeedback, setReproveFeedback] = useState("");

  async function cancel() {
    setReproveFeedback("")
    props.handleCancel()
  }

  return (
    <Dialog
      open={props.selectedJobId ? true : false}
      onClose={cancel}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">
        Reprovar vaga cod: {props.selectedJobId}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Digite os motivos para a reprovação, assim o gerente da vaga poderá
          corrigir de uma forma mais eficiente.
        </DialogContentText>
        <TextField
          id="outlined-multiline-static"
          label="Feedback"
          multiline
          fullWidth
          onChange={(e) => setReproveFeedback(e.target.value)}
          value={reproveFeedback}
          rows={4}
          variant="outlined"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={cancel} color="primary">
          Cancelar
        </Button>
        <Button onClick={() => props.handleSubmit(reproveFeedback)} color="primary">
          Concluir
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Reprove;
