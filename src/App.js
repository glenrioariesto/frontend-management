import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreateProject from './components/CreateProject';
import ProjectPage from './pages/ProjectPage';
import ProjectList from './components/ProjectList';
import Login from './components/Login';
import Register from './components/Register';
import AdminPage from './pages/AdminPage';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import LoadingIndicator from './components/LoadingIndicator';

const App = () => {
  return (
    <>
      <LoadingIndicator />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Layout><HomePage /></Layout>} />
          <Route path="/projects" element={<Layout><ProjectList /></Layout>} />
          <Route path="/create-project" element={<Layout><CreateProject /></Layout>} />
          <Route path="/projects/:id" element={<Layout><ProjectPage /></Layout>} />
          <Route path="/admin" element={<Layout><AdminPage /></Layout>} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
