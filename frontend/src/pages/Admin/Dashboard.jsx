import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, CircularProgress } from '@mui/material';

const Dashboard = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5001/api/users/customers", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setCustomers(data);
      } catch (err) {
        console.error("Failed to fetch customers", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Customer List
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        customers.map((user) => (
          <Paper
            key={user._id}
            sx={{
              padding: 2,
              marginBottom: 2,
              backgroundColor: "#f5f5f5",
              borderRadius: 2,
            }}
          >
            <Typography variant="h6">{user.name}</Typography>
            <Typography>Email: {user.email}</Typography>
            <Typography>Phone: {user.mainPhone}</Typography>
            <Typography>Address: {user.address}</Typography>
          </Paper>
        ))
      )}
    </Box>
  );
};

export default Dashboard;