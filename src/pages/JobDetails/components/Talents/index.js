import React, { useEffect, useState } from "react";
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

import VisibilityIcon from "@material-ui/icons/Visibility";
import AssignmentTurnedInOutlinedIcon from "@material-ui/icons/AssignmentTurnedInOutlined";

import {
  TelentListComponentContainer,
  TalentListItemContainer,
} from "./styles";

import api from "./../../../../config/api";
import { toast } from "react-toastify";

const JobListItem = (props) => {
  return (
    <TalentListItemContainer>
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
    </TalentListItemContainer>
  );
};

export default function AlignItemsList(props) {
  const [talents, setTalents] = useState([]);
  useEffect(() => {
    api.get(`/acquisitor/jobs/${props.jobId}/talents`).then((resp) => {
      console.log(resp.data);
      setTalents(resp.data);
    });
  }, []);

  return (
    <TelentListComponentContainer>
      <TableContainer>
        <Table aria-label="simple table">
          <TableBody>
            {talents.length > 0 ? (
              talents.map((talent) => {
                return (
                  <TableRow key={talent.id}>
                    <TableCell>
                      <JobListItem
                        title={`Nome`}
                        value={talent.talent.full_name}
                      />
                    </TableCell>
                    <TableCell>
                      <JobListItem
                        title={`E-mail`}
                        value={talent.talent.email}
                      />
                    </TableCell>
                    <TableCell>
                      <JobListItem
                        title={`Telefone`}
                        value={talent.talent.phone}
                      />
                    </TableCell>
                    <TableCell>
                      <JobListItem title={`Pretenção Salárial`} value={`R$ ${talent.desired_salary}`} />
                    </TableCell>
                    <TableCell>
                      <JobListItem
                        title={`Seu feedback`}
                        value={talent.acquisitor_feedback}
                      />
                    </TableCell>

                    <TableCell>
                      <Tooltip title={"Reprovar Vaga"}>
                        <IconButton
                          // onClick={() => setSelectedJobId(job.id)}
                          edge="end"
                          aria-label="Reprovar Vaga"
                        >
                          <VisibilityIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <Typography color="textSecondary" align="center">
                Nenhum talento indicado para a vaga.
              </Typography>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </TelentListComponentContainer>
  );
}
