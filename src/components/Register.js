import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Paper, MenuItem, Box, Snackbar, Alert } from '@mui/material';
import authService from '../services/authService';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [photoProfile, setPhotoProfile] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [open, setOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name || !email || !username || !password || !role) {
      setError('All fields are required');
      setErrorOpen(true);
      return;
    }

    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('role', role);
    formData.append('photoProfile', photoProfile);

    try {
      await authService.register(formData);
      setSuccess('User registered successfully');
      setError('');
      setOpen(true);
    } catch (error) {
      setError('Error registering user');
      setSuccess('');
      setErrorOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setErrorOpen(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography component="h1" variant="h5" align="center">
          Register
        </Typography>
        <form onSubmit={handleRegister} style={{ marginTop: '10px' }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
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
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            select
            fullWidth
            label="Role"
            variant="outlined"
            margin="normal"
            required
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="user_management">User Management</MenuItem>
            <MenuItem value="user_execution">User Execution</MenuItem>
          </TextField>
          <Box mt={2}>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="photoProfile"
              type="file"
              onChange={(e) => setPhotoProfile(e.target.files[0])}
            />
            <label htmlFor="photoProfile">
              <Button variant="contained" color="primary" component="span">
                Upload Profile Photo
              </Button>
            </label>
          </Box>
          <Button type="submit" fullWidth variant="contained" color="primary" style={{ marginTop: '20px' }}>
            Register
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

export default Register;
