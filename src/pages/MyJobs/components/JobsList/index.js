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
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import moment from "moment";

import InsertChartIcon from "@material-ui/icons/InsertChartOutlined";
import { JobListComponentContainer, JobListItemContainer } from "./styles";
import api from "./../../../../config/api";
import { toast } from "react-toastify";

const JobListItem = (props) => {
  return (
    <JobListItemContainer>
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
    </JobListItemContainer>
  );
};

export default function MyJobsJobList(props) {
  let history = useHistory();

  function getJobTitle(exp, spc, hyr) {
    console.log(exp);
    console.log(hyr);
    const expLvl = {
      ANALYST: 'Analista (a)',
      ARCHITECT: 'Arquiteto (a)',
      ASSISTANT: 'Assistente (a)',
      HELP: 'Auxiliar',
      SCIENTIST: 'Ciêntitista (a)',
      COACH: 'Coach',
      CONSULTANT: 'Consultor (a)',
      COORDINATOR: 'Coordenador (a)',
      DEVELOPER: 'Desenvolvedor (a)',
      DIRECTOR: 'Diretor (a)',
      MANAGER: 'Gerente',
      LEADER: 'Lider',
      ENGINEER: 'Engenheiro (a)',
      SPECIALIST: 'Especialista',
    };

    const hyrLvl = {
      SENIOR: 'Sênior',
      JUNIOR: 'Junior',
      PLAIN: 'Pleno',
    };

    return `${expLvl[exp]} ${spc} ${hyrLvl[hyr]}`;
  }
  return (
    <JobListComponentContainer>
      <TableContainer>
        <Table aria-label="simple table">
          <TableBody>
            {props.jobs.map((job) => {
              return (
                <TableRow key={job.id}>
                  <TableCell>
                    <JobListItem title={`#ID`} value={job.id} />
                  </TableCell>
                  <TableCell>
                    <JobListItem title={`Titulo da vaga`} value={getJobTitle(job.hierarchy_level, job.specialty, job.experience_level)} />
                  </TableCell>
                  <TableCell>
                    <JobListItem
                      align="center"
                      title={`Recrutadores ativos na vaga`}
                      value={job.active_acquisitors}
                    />
                  </TableCell>
                  <TableCell>
                    <JobListItem
                      align="center"
                      title={`Seus Talentos para a vaga`}
                      value={job.acquisitor_talents}
                    />
                  </TableCell>
                  <TableCell>
                    <JobListItem
                      align="center"
                      title={`Todos os Talentos indicados para a vaga`}
                      value={job.total_talents}
                    />
                  </TableCell>
                  <TableCell>
                    <JobListItem
                      title={`Data da vaga`}
                      value={`há ${moment().diff(
                        moment(job.created_at),
                        "days"
                      )} dias atrás`}
                    />
                  </TableCell>
                  <TableCell>
                    <Tooltip title={"Painel da vaga"}>
                      <IconButton
                        onClick={() => history.push(`/jobs/${job.id}/details`)}
                        edge="end"
                        aria-label="Painel da vaga."
                      >
                        <InsertChartIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </JobListComponentContainer>
  );
}
