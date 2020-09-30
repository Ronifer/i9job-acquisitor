import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import api from "../../../../config/api";

import moment from "moment";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    // maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

export default function QuestionsList(props) {
  const classes = useStyles();
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    api
      .get(`acquisitor/jobs/${props.jobId}/questions`)
      .then((resp) => setQuestions(resp.data));
  }, []);

  function getPastTime(created_at) {
    let daysAgo = moment().diff(moment(created_at), "days");

    return daysAgo > 0
      ? ` - há ${daysAgo} dias atrás`
      : ` - há ${moment().diff(moment(created_at), "minutes")} minutos atrás`;
  }

  return (
    <List className={classes.root}>
      {questions.length > 0 ? (
        questions.map((q) => {
          return (
            <ListItem alignItems="flex-start">
              <ListItemText
                primary={q.content}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      {q.job_question_answer
                        ? `R: ${q.job_question_answer.content}`
                        : null}
                    </Typography>

                    {q.job_question_answer
                      ? getPastTime(q.job_question_answer.created_at)
                      : "Aguardando resposta do responsável..."}
                  </React.Fragment>
                }
              />
            </ListItem>
          );
        })
      ) : (
        <Typography color="textSecondary" align="center">
          Nenhuma dúvida para a vaga ainda.
        </Typography>
      )}
    </List>
  );
}
