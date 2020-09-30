import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import _ from "lodash";

import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Grid,
  Button
} from "@material-ui/core";

import AddIcon from "@material-ui/icons/Add";

import { JobDetailsContainer } from "./styles";
import api from "../../config/api";
import Panel from "./../../components/Panel";

import TalentList from "./components/Talents";
import TalentModal from "./components/Talents/add";

import QuestionsList from "./components/Questions";
import AddQeustion from "./components/Questions/add";

function JobDetails() {
  const [jobDetails, setJobDetails] = useState(null);
  const [talentModalOpen, setTalentModalOpen] = useState(false);
  const [addQeustionModalOpen, setAddQeustionModalOpen] = useState(false);

  const [fullDescription, setFullDescription] = useState(false);

  let { id } = useParams();
  useEffect(() => {
    api.get(`/acquisitor/jobs/${id}/details`).then((resp) => {
      setJobDetails(resp.data);
    });
  }, []);

  function getJobTitle(exp, spc, hyr) {
    console.log(exp);
    console.log(hyr);
    const expLvl = {
      ANALYST: "Analista (a)",
      ARCHITECT: "Arquiteto (a)",
      ASSISTANT: "Assistente (a)",
      HELP: "Auxiliar",
      SCIENTIST: "Ciêntitista (a)",
      COACH: "Coach",
      CONSULTANT: "Consultor (a)",
      COORDINATOR: "Coordenador (a)",
      DEVELOPER: "Desenvolvedor (a)",
      DIRECTOR: "Diretor (a)",
      MANAGER: "Gerente",
      LEADER: "Lider",
      ENGINEER: "Engenheiro (a)",
      SPECIALIST: "Especialista",
    };

    const hyrLvl = {
      SENIOR: "Sênior",
      JUNIOR: "Junior",
      PLAIN: "Pleno",
    };

    return `${expLvl[exp]} ${spc} ${hyrLvl[hyr]}`;
  }

  return jobDetails ? (
    <JobDetailsContainer>
      <TalentModal
        jobId={id}
        open={talentModalOpen}
        close={() => setTalentModalOpen(false)}
      />
      <AddQeustion
        jobId={id}
        open={addQeustionModalOpen}
        close={() => setAddQeustionModalOpen(false)}
      />
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Card className="card-root">
            <CardContent>
              <Typography
                className="card-title"
                color="textSecondary"
                gutterBottom
              >
                {jobDetails.job.location} - {jobDetails.job.duration} -{" "}
                {jobDetails.job.period}
              </Typography>
              <Typography variant="h5" component="h2">
                {getJobTitle(
                  jobDetails.job.hierarchy_level,
                  jobDetails.job.specialty,
                  jobDetails.job.experience_level
                )}
              </Typography>
              <Typography className="card-pos" color="textSecondary">
                Orçamento: {jobDetails.job.salary}
              </Typography>
              <Typography
                variant="body2"
                style={{ whiteSpace: "break-spaces" }}
                component="p"
              >
                {fullDescription
                  ? jobDetails.job.description
                  : _.truncate(jobDetails.job.description, {
                      length: 500,
                      separator: " ",
                    })}
              
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => setFullDescription(!fullDescription)}>{fullDescription ? 'Menos...' : 'Leia mais...'}</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={8}>
          <Grid container spacing={3} xs={12}>
            <Grid item xs={12}>
              <Panel
                title="Meus Talentos"
                actions={[
                  {
                    title: "Novo talento",
                    onClick: () => setTalentModalOpen(true),
                    icon: <AddIcon />,
                  },
                ]}
              >
                <TalentList jobId={jobDetails.job.id} />
              </Panel>
            </Grid>
            <Grid item xs={12}>
              <Panel
                title="Duvidas"
                actions={[
                  {
                    title: "Nova dúvida",
                    onClick: () => setAddQeustionModalOpen(true),
                    icon: <AddIcon />,
                  },
                ]}
              >
                <QuestionsList jobId={jobDetails.job.id} />
              </Panel>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </JobDetailsContainer>
  ) : null;
}

export default JobDetails;
