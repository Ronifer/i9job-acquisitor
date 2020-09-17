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
import ChipHierarchy from "./../../../../components/Chips/ChipHierarchy";
import ChipExperience from "./../../../../components/Chips/ChipExperience";
import ChipJobHistory from "./../../../../components/Chips/ChipHistoryJob";

import ReproveDialog from "./reprove";

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

  return (
    <JobListComponentContainer>
      <ReproveDialog
        selectedJobId={selectedJobId}
        handleCancel={handleCancel}
        handleSubmit={handleReproveJob}
      />
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
                    <JobListItem title={`Titulo da vaga`} value={job.title} />
                  </TableCell>
                  <TableCell>
                    <JobListItem
                      title={`Salario ou Faixa Salarial`}
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
                      title={`Nivel`}
                      value={<ChipHierarchy hierarchy={job.hierarchy_level} />}
                    />
                  </TableCell>
                  <TableCell>
                    <JobListItem
                      title={`Experiencia`}
                      value={
                        <ChipExperience experience={job.experience_level} />
                      }
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
                    <Tooltip title={"Reprovar Vaga"}>
                      <IconButton
                        onClick={() => setSelectedJobId(job.id)}
                        edge="end"
                        aria-label="Reprovar Vaga"
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
