import React from "react";
import Chip from "@material-ui/core/Chip";

const hierarchy = ['AN', 'AS', 'COO', 'DEV', 'DIR', 'GR', 'LE'];
const hierarchyLabel = ["Analista", "Assistente", "Coordenador/Supervisor", "Desenvolvedor", "Diretor", "Gerente", "Lider"];

export default function ChipContract(props) {
  return <Chip label={hierarchyLabel[hierarchy.indexOf(props.hierarchy)]} />;
}
