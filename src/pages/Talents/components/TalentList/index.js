import React, { useState } from "react";
import {
  ListItemText,
  IconButton,
  Typography,
  Tooltip,
  TableRow,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Chip,
  withStyles,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import moment from "moment";

import CreateIcon from "@material-ui/icons/CreateOutlined";
import ContactsOutlinedIcon from "@material-ui/icons/ContactsOutlined";
import {
  TalentListComponentContainer,
  TalentListItemContainer,
} from "./styles";
import api from "./../../../../config/api";
import { toast } from "react-toastify";

const TalentListItem = (props) => {
  return (
    <TalentListItemContainer>
      <ListItemText
        style={{ textAlign: props.align ? props.align : "" }}
        primary={
          <>
            <Typography
              component="span"
              variant="h1"
              className={`job-table-field-title`}
              color="textPrimary"
            >
              {props.title}
            </Typography>
          </>
        }
        secondary={
          <>
            <Typography
              component="span"
              variant="body2"
              className={`job-table-field-value`}
              color="textPrimary"
            >
              {props.value}
            </Typography>
          </>
        }
      />
    </TalentListItemContainer>
  );
};

function TalentList(props) {
  let history = useHistory();

  return (
    <TalentListComponentContainer>
      <TableContainer>
        <Table aria-label="simple table">
          <TableBody>
            {props.talents.map((talent) => {
              return (
                <TableRow key={talent.id}>
                  <TableCell>
                    <TalentListItem title={`#ID`} value={talent.id} />
                  </TableCell>
                  <TableCell>
                    <TalentListItem title={`Nome`} value={talent.full_name} />
                  </TableCell>
                  <TableCell>
                    <TalentListItem title={`E-mail`} value={talent.email} />
                  </TableCell>
                  <TableCell>
                    <TalentListItem
                      title={`Dados cadastrais`}
                      value={<Chip color="error.main" label="Incompletos" />}
                    />
                  </TableCell>
                  <TableCell>
                    <TalentListItem
                      title={`Data de cadastro`}
                      value={`há ${moment().diff(
                        moment(talent.created_at),
                        "days"
                      )} dias atrás`}
                    />
                  </TableCell>
                  <TableCell>
                    <Tooltip title={"Painel da vaga"}>
                      <IconButton
                        // onClick={() => history.push(`/jobs/${job.id}/details`)}
                        edge="end"
                        aria-label="Completar perfil do talento."
                      >
                        <CreateIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={"Visualizar curriculo"}>
                      <IconButton
                        // onClick={() => history.push(`/jobs/${job.id}/details`)}
                        edge="end"
                        aria-label="Painel da vaga."
                      >
                        <ContactsOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </TalentListComponentContainer>
  );
}

export default withStyles()(TalentList);
