import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box, Tooltip, IconButton, Paper, Grid } from '@mui/material';
import { CalendarToday, Money, Person, Business, Schedule } from '@mui/icons-material';
import GanttChart from '../components/GanttChart';

const ProjectPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [projectLeaderName, setProjectLeaderName] = useState('');

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/projects/${id}`);
        setProject(response.data);

        // Fetch project leader's name
        const leaderResponse = await axios.get(`http://localhost:5000/api/users/${response.data.project_leader}`);
        setProjectLeaderName(leaderResponse.data.name);
      } catch (error) {
        console.error('Failed to fetch project:', error);
      }
    };

    const fetchTasks = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/projects/${id}/tasks`);
        setTasks(response.data);
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      }
    };

    fetchProject();
    fetchTasks();
  }, [id]);

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1">{project.name}</Typography>
      </Box>
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6}>
            <Tooltip title="Job Owner">
              <IconButton>
                <Person />
              </IconButton>
            </Tooltip>
            <Typography display="inline">Job Owner: {project.job_owner}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Tooltip title="Contract Duration">
              <IconButton>
                <Schedule />
              </IconButton>
            </Tooltip>
            <Typography display="inline">Contract Duration: {new Date(project.start_date).toLocaleDateString()} to {new Date(project.end_date).toLocaleDateString()}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Tooltip title="Contract Value">
              <IconButton>
                <Money />
              </IconButton>
            </Tooltip>
            <Typography display="inline">Contract Value: Rp {project.contract_value.toLocaleString()}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Tooltip title="Source of Funds">
              <IconButton>
                <Money />
              </IconButton>
            </Tooltip>
            <Typography display="inline">Source of Funds: {project.source_of_funds}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Tooltip title="Line of Business">
              <IconButton>
                <Business />
              </IconButton>
            </Tooltip>
            <Typography display="inline">Line of Business: {project.line_of_business}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Tooltip title="Project Leader">
              <IconButton>
                <Person />
              </IconButton>
            </Tooltip>
            <Typography display="inline">Project Leader: {projectLeaderName}</Typography>
          </Grid>
          {project.has_project_warranty && (
            <Grid item xs={12} sm={6}>
              <Tooltip title="Project Warranty Duration">
                <IconButton>
                  <CalendarToday />
                </IconButton>
              </Tooltip>
              <Typography display="inline">Project Warranty Duration: {project.project_warranty_duration}</Typography>
            </Grid>
          )}
        </Grid>
      </Paper>
      <GanttChart tasks={tasks} projectId={id} />
    </Container>
  );
};

export default ProjectPage;
