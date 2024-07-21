import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('/api/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleStatusChange = (id, status) => {
    axios.put(`/api/users/${id}/status`, { status })
      .then(response => {
        setUsers(users.map(user => user.id === id ? { ...user, status } : user));
      })
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.username} ({user.role}) - {user.status}
            <button onClick={() => handleStatusChange(user.id, user.status === 'active' ? 'inactive' : 'active')}>
              {user.status === 'active' ? 'Deactivate' : 'Activate'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
