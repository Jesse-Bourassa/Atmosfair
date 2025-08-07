import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Appointments from './Appointments';
import Customer from './Csutomer';
import CalendarScheduler from './CalendarScheduler';

const Dashboard = () => {
  const [customers, setCustomers] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading]   = useState(true);
  const navigate = useNavigate();

  /* -------------------------------------------------- */
  useEffect(() => {
    const token = localStorage.getItem('token');
    const apiBase = import.meta.env.VITE_API_URL ?? 'https://api.atmosfairs.com';

    const fetchCustomers = async () => {
      try {
        const res  = await fetch(`${apiBase}/api/users/customers`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        setCustomers(data.map(c => ({ ...c, visible: true })));
      } catch (err) {
        console.error('Failed to fetch customers', err);
      }
    };

    const fetchAppointments = async () => {
      try {
        const res  = await fetch(`${apiBase}/api/schedule`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();

        // pad single‑digit hours  (“9:30 AM” → “09:30 AM”)
        const formatted = data.map(item => ({
          ...item,
          time:
            item.time.length === 7 ? '0' + item.time : item.time,
          /* keep date plain; DO NOT add “T” or the time here */
          date: item.date
        }));

        setAppointments(formatted);
      } catch (err) {
        console.error('Failed to fetch appointments', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
    fetchAppointments();
  }, []);
  /* -------------------------------------------------- */

  // map of customers by id (for the tooltip in ScheduleUI)
  const customerById = Object.fromEntries(
    customers.map(c => [String(c._id), c])
  );

  return (
    <Box sx={{ p: 4, marginTop: 8 }}>
      <CalendarScheduler appointments={appointments} />
      <Appointments />
      <Customer />
    </Box>
  );
};

export default Dashboard;
