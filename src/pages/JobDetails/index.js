import React, { useEffect, useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Container,
  Grid,
} from "@material-ui/core";

import { JobDetailsContainer } from "./styles";
import api from "../../config/api";
import { useParams } from "react-router-dom";

function JobDetails() {
  const [jobDetails, setJobDetails] = useState(null);
  let { id } = useParams();
  useEffect(() => {
    api.get(`/acquisitor/jobs/${id}/details`).then((resp) => {
      console.log(resp.data);
      setJobDetails(resp.data);
    });
  }, []);
  return jobDetails ? (
    <JobDetailsContainer>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Card className="card-root">
            <CardContent>
              <Typography
                className="card-title"
                color="textSecondary"
                gutterBottom
              >
                {jobDetails.job.location} - {jobDetails.job.duration} - {jobDetails.job.period}
              </Typography>
              <Typography variant="h5" component="h2">
                {jobDetails.job.title}
              </Typography>
              <Typography className="card-pos" color="textSecondary">
                Orçamento: {jobDetails.job.salary}
              </Typography>
              <Typography variant="body2" component="p">
              {jobDetails.job.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={8}>
          akjsdlaksj;d
        </Grid>
      </Grid>
    </JobDetailsContainer>
  ) : null;
}

export default JobDetails;
