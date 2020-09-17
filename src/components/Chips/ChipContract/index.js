import React from "react";
import Chip from "@material-ui/core/Chip";

const contracts = ["CLT", "PJ", "COOP", "FREE"];
const contractsLabel = ["CLT", "PJ", "Cooperada", "Freelancer"];

export default function ChipContract(props) {
  return <Chip label={contractsLabel[contracts.indexOf(props.contract)]} />;
}
