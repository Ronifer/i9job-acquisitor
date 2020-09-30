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

import ChipContract from "./../../../../components/Chips/ChipContract";
import ChipJobHistory from "./../../../../components/Chips/ChipHistoryJob";


import VisibilityIcon from "@material-ui/icons/Visibility";
import AssignmentTurnedInOutlinedIcon from '@material-ui/icons/AssignmentTurnedInOutlined';

import { JobListComponentContainer, JobListItemContainer } from "./styles";

import api from "./../../../../config/api";
import { toast } from "react-toastify";

const JobListItem = (props) => {
  return (
    <JobListItemContainer>
      <ListItemText
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

export default function AlignItemsList(props) {
  let history = useHistory();
  let [selectedJobId, setSelectedJobId] = useState(null);

  async function handleReproveJob(feedback) {
    if (!feedback) {
      toast.warning(
        "Preencha o feedback, ele é importante para a empresa melhorar a vaga."
      );
      return false;
    }
    try {
      await api.put(`acquisitor/jobs/${selectedJobId}/reject`, { feedback });
      toast.success(
        "A vaga foi reprovada e um feedback foi enviado pro gerente da vaga!"
      );
      setSelectedJobId(null);
      props.refreshJobs();
    } catch (e) {
      toast.error(e.response.data.error);
    }
  }
  async function handleAcceptJob(jobId) {
    try {
      await api.post(`acquisitor/jobs/${jobId}/attach`);
      toast.success("Pronto! Agora é só começar a tralhar essa vaga. Adicionando candidastos a ela!");
      props.refreshJobs()
    } catch (e) {
      toast.error(e.response.data.error);
    }
  }
  async function handleCancel() {
    setSelectedJobId(null);
  }

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
                    <JobListItem
                      title={`Status da Vaga`}
                      value={
                        <ChipJobHistory history={job.jobHistories[0] ?? null} />
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <JobListItem title={`#ID`} value={job.id} />
                  </TableCell>
                  <TableCell>
                    <JobListItem title={`Vaga`} value={getJobTitle(job.hierarchy_level, job.specialty, job.experience_level)} />
                  </TableCell>
                  <TableCell>
                    <JobListItem
                      title={`Salario mensal`}
                      value={job.salary}
                    />
                  </TableCell>
                  <TableCell>
                    <JobListItem
                      title={`Contrato`}
                      value={<ChipContract contract={job.contract} />}
                    />
                  </TableCell>
                  <TableCell>
                    <JobListItem
                      title={`Empresa`}
                      value={job.company.name}
                    />
                  </TableCell>
                  <TableCell>
                    <Tooltip title={"Editar Vaga"}>
                      <IconButton
                        onClick={() => history.push(`/job/${job.id}/edit`)}
                        edge="end"
                        aria-label="Editar"
                      >
                        {/* <CreateIcon /> */}
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={"Trabalhar essa vaga"}>
                      <IconButton
                        onClick={() => handleAcceptJob(job.id)}
                        edge="end"
                        aria-label="trabalhar essa vaga."
                      >
                        <AssignmentTurnedInOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={"Detalhes da Vaga"}>
                      <IconButton
                        onClick={() => null}
                        edge="end"
                        aria-label="Detalhes da Vaga"
                      >
                        <VisibilityIcon />
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
