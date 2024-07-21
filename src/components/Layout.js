import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Box, Avatar, IconButton, Typography, Divider, Tooltip } from '@mui/material';
import { Home, Folder, ExitToApp, AccountTree, AddBox } from '@mui/icons-material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import authService from '../services/authService';
import logo from '../assets/logo.png';
import CollapsibleSection from './CollapsibleSection';

const drawerWidth = 240;

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = authService.getCurrentUser();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
            <img src={logo} alt="Logo" style={{ maxWidth: '100%', height: 'auto' }} />
          </Box>
          <List>
            <Tooltip title="Home" placement="right">
              <ListItem button component={Link} to="/" selected={isActive('/')}>
                <ListItemIcon>
                  <Home />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
            </Tooltip>
            <CollapsibleSection icon={<AccountTree />} text="Projects">
              <Tooltip title="Project List" placement="right">
                <ListItem button component={Link} to="/projects" selected={isActive('/projects')} sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <Folder />
                  </ListItemIcon>
                  <ListItemText primary="Project List" />
                </ListItem>
              </Tooltip>
              <Tooltip title="Create Project" placement="right">
                <ListItem button component={Link} to="/create-project" selected={isActive('/create-project')} sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <AddBox />
                  </ListItemIcon>
                  <ListItemText primary="Create Project" />
                </ListItem>
              </Tooltip>
            </CollapsibleSection>
          </List>
          <Box sx={{ flexGrow: 1 }} />
          {user && (
            <Box sx={{ p: 2, textAlign: 'center' }}>
              <Divider />
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                <Avatar alt={user.name} src={`http://localhost:5000/uploads/${user.photoProfile}`} sx={{ width: 60, height: 60, mr: 2 }} />
                <Typography variant="h6">{user.name}</Typography>
              </Box>
              <IconButton onClick={handleLogout} sx={{ mt: 2 }}>
                <ExitToApp />
              </IconButton>
            </Box>
          )}
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
