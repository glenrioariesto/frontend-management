import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, Box, Paper, Snackbar, Alert, MenuItem, Checkbox, FormControlLabel, InputAdornment } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateProject = () => {
  const [name, setName] = useState('');
  const [jobOwner, setJobOwner] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [projectWarrantyDuration, setProjectWarrantyDuration] = useState('');
  const [hasProjectWarranty, setHasProjectWarranty] = useState(false);
  const [contractValue, setContractValue] = useState('');
  const [sourceOfFunds, setSourceOfFunds] = useState('');
  const [lineOfBusiness, setLineOfBusiness] = useState('');
  const [projectLeader, setProjectLeader] = useState('');
  const [projectLeaders, setProjectLeaders] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [open, setOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjectLeaders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/executions');
        setProjectLeaders(response.data);
      } catch (error) {
        console.error('Failed to fetch project leaders:', error);
      }
    };

    fetchProjectLeaders();
  }, []);

  const handleCreateProject = async (e) => {
    e.preventDefault();
    if (!name || !jobOwner || !startDate || !endDate || !contractValue || !sourceOfFunds || !lineOfBusiness || !projectLeader || (hasProjectWarranty && !projectWarrantyDuration)) {
      setError('All fields are required');
      setErrorOpen(true);
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/projects', { 
        name, 
        jobOwner, 
        startDate, 
        endDate, 
        projectWarrantyDuration, 
        contractValue, 
        sourceOfFunds, 
        lineOfBusiness, 
        projectLeader, 
        hasProjectWarranty 
      });
      setSuccess('Project created successfully');
      setOpen(true);
      setTimeout(() => {
        navigate('/projects');
      }, 2000);
    } catch (error) {
      setError('Failed to create project');
      setErrorOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setErrorOpen(false);
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography component="h1" variant="h5" align="center">
          Create Project
        </Typography>
        <form onSubmit={handleCreateProject} style={{ marginTop: '10px' }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Project Name"
            name="name"
            autoComplete="name"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="jobOwner"
            label="Job Owner"
            name="jobOwner"
            autoComplete="jobOwner"
            value={jobOwner}
            onChange={(e) => setJobOwner(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="date"
            id="startDate"
            label="Start Date"
            name="startDate"
            InputLabelProps={{ shrink: true }}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="date"
            id="endDate"
            label="End Date"
            name="endDate"
            InputLabelProps={{ shrink: true }}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={hasProjectWarranty}
                onChange={(e) => setHasProjectWarranty(e.target.checked)}
                name="hasProjectWarranty"
              />
            }
            label="Project Warranty"
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="projectWarrantyDuration"
            label="Project Warranty Duration"
            name="projectWarrantyDuration"
            autoComplete="projectWarrantyDuration"
            value={projectWarrantyDuration}
            onChange={(e) => setProjectWarrantyDuration(e.target.value)}
            disabled={!hasProjectWarranty}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="contractValue"
            label="Contract Value"
            name="contractValue"
            autoComplete="contractValue"
            value={contractValue}
            onChange={(e) => setContractValue(e.target.value)}
            InputProps={{
              startAdornment: <InputAdornment position="start">Rp</InputAdornment>,
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="sourceOfFunds"
            label="Source of Funds"
            name="sourceOfFunds"
            autoComplete="sourceOfFunds"
            value={sourceOfFunds}
            onChange={(e) => setSourceOfFunds(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="lineOfBusiness"
            label="Line of Business"
            name="lineOfBusiness"
            autoComplete="lineOfBusiness"
            value={lineOfBusiness}
            onChange={(e) => setLineOfBusiness(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            select
            id="projectLeader"
            label="Project Leader"
            name="projectLeader"
            value={projectLeader}
            onChange={(e) => setProjectLeader(e.target.value)}
          >
            {projectLeaders.map((leader) => (
              <MenuItem key={leader.id} value={leader.id}>
                {leader.name}
              </MenuItem>
            ))}
          </TextField>
          <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3 }}>
            Create
          </Button>
        </form>
      </Paper>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          {success}
        </Alert>
      </Snackbar>
      <Snackbar open={errorOpen} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CreateProject;
