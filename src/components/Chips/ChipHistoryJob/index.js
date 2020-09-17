import React from "react";
import { Chip, Tooltip } from "@material-ui/core";

const status = ["WAITING", "CANCELED", "AVAILABLE"];
const statusLabel = ["Aguardando Aprovação", "Cancelada", "DISPONIVEL"];
const statusColor = ["primary", "Danger", "success"];
const statusDescription = [
  "Essa vaga acabou de ser aberta, assim que aprovada, estará disponivel para nossos recrutadores.",
  "Essa vaga foi cancelada.",
  "Essa vaga está disponivel para ser trabalhada.",
];

export default function ChipJobHistory(props) {
  return (
    <Tooltip title={statusDescription[status.indexOf(props.history.status)]}>
      <Chip color={statusColor[status.indexOf(props.history.status)]} label={statusLabel[status.indexOf(props.history.status)]} />
    </Tooltip>
  );
}
