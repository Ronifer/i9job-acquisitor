import React from "react";
import Chip from "@material-ui/core/Chip";

const experience = ['EP', 'CS', 'SR', 'JR', 'PL'];
const experienceLabel = ["Especialista", "Consultor", "Senior", "Junior", "Pleno"];

export default function ChipContract(props) {
  return <Chip label={experienceLabel[experience.indexOf(props.experience)]} />;
}
