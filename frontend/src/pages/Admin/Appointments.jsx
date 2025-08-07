import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loadingAppointments, setLoadingAppointments] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const apiBase = import.meta.env.VITE_API_URL ?? 'https://api.atmosfairs.com';
        const res = await fetch(`${apiBase}/api/schedule`);
        const data = await res.json();
        setAppointments(data);
      } catch (err) {
        console.error("Failed to fetch appointments", err);
      } finally {
        setLoadingAppointments(false);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Appointments
      </Typography>

      {loadingAppointments ? (
        <CircularProgress />
      ) : (
        <TableContainer
          component={Paper}
          sx={{
            mb: 4,
            maxHeight: 400,
            backgroundColor: "#3a3a3a",
            border: "3px solid #9c9c9c",
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>User ID</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments.map((appt) => (
                <TableRow key={appt._id}>
                  <TableCell>{appt.type}</TableCell>
                  <TableCell>{appt.date}</TableCell>
                  <TableCell>{appt.userId}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default Appointments;