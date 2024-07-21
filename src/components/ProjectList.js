import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, List, ListItem, ListItemText, Button, ListItemSecondaryAction, IconButton, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { Delete, Edit } from '@mui/icons-material';
import axios from 'axios';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/projects');
        setProjects(response.data);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      }
    };

    fetchProjects();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/projects/${id}`);
      setProjects(projects.filter((project) => project.id !== id));
    } catch (error) {
      console.error('Failed to delete project:', error);
    }
  };

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 4, mb: 2 }}>
        <Typography variant="h4">Projects</Typography>
        <Button component={Link} to="/create-project" variant="contained" color="primary">
          Create Project
        </Button>
      </Box>
      <Paper sx={{ p: 2 }}>
        <List>
          {projects.map((project) => (
            <ListItem key={project.id} component={Link} to={`/projects/${project.id}`} button>
              <ListItemText primary={project.name} secondary={`Job Owner: ${project.job_owner}`} />
              <ListItemSecondaryAction>
                <IconButton component={Link} to={`/projects/edit/${project.id}`} edge="end">
                  <Edit />
                </IconButton>
                <IconButton edge="end" onClick={() => handleDelete(project.id)}>
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default ProjectList;
