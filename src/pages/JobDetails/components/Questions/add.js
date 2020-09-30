import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { toast } from "react-toastify";
import api from "../../../../config/api";

export default function AddQuestion({ open, close, jobId }) {
  const [content, setContent] = React.useState("");

  async function handleSubmit() {
    if (!content) {
      toast.error("Preecha o campo de dúvida !");
      return false;
    }
    try {
      let response = await api.post(`acquisitor/jobs/${jobId}/questions`, {
        content,
      });
      toast.success(
        "Dúvida enviada, estamos aguardando a resposta do responsável."
      );
    } catch (e) {
      toast.error(e.response.data.error);
    }
  }

  return (
    <div>
      <Dialog open={open} onClose={close} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Enviar uma dúvida</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Lembre-se essa dúvida será visivel para todos os outros
            recrutadores, e certifique-se de, ants de enviar, leia a descrição
            da vaga.
          </DialogContentText>
          <TextField
            autoFocus
            variant="outlined"
            margin="dense"
            onChange={(e) => setContent(e.target.value)}
            label="Dúvida"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={close} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Enviar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
