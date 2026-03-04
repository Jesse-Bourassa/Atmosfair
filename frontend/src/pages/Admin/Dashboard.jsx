import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
  Chip,
  Divider,
  Skeleton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import Appointments from "./Appointments";
import Customer from "./Csutomer";
import CalendarScheduler from "./CalendarScheduler";
import { apiUrl } from "../../lib/api";



const cardSx = {
  p: { xs: 2, md: 3 },
  borderRadius: 3,
  bgcolor: "rgba(17, 25, 40, 0.55)",           // bluish glass
  backdropFilter: "blur(14px)",
  border: "1px solid rgba(255,255,255,0.10)",
  boxShadow: "0 18px 60px rgba(0,0,0,0.55)",
};
const Dashboard = () => {
  const [customers, setCustomers] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

useEffect(() => {
  document.body.classList.add("bg-admin");
  document.body.classList.remove("bg-public");

  return () => {
    document.body.classList.remove("bg-admin");
  };
}, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // If no token, bounce to login
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchCustomers = async () => {
      const res = await fetch(apiUrl("/api/users/customers"), {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch customers");
      const data = await res.json();
      return data.map((c) => ({ ...c, visible: true }));
    };

    const fetchAppointments = async () => {
      const res = await fetch(apiUrl("/api/schedule"), {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch appointments");
      const data = await res.json();

      return data.map((item) => ({
        ...item,
        time: item.time?.length === 7 ? "0" + item.time : item.time,
        date: item.date,
      }));
    };

    (async () => {
      try {
        const [cust, appts] = await Promise.all([
          fetchCustomers(),
          fetchAppointments(),
        ]);
        setCustomers(cust);
        setAppointments(appts);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [navigate]);

  const customerById = useMemo(
    () => Object.fromEntries(customers.map((c) => [String(c._id), c])),
    [customers]
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        pt: { xs: 10, md: 11 },
        pb: { xs: 4, md: 6 }
      }}
    >
      <Container
  maxWidth={false}
  disableGutters
  sx={{ px: { xs: 2, md: 2 }, maxWidth: 2200, mx: "auto" }}
>
        {/* Header */}
        <Stack spacing={1.5} sx={{ mb: 3 }}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignItems={{ sm: "center" }}
            justifyContent="space-between"
            gap={1.5}
          >
            <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: 0.2 }}>
              Dashboard
            </Typography>

            
          </Stack>

          <Typography sx={{ color: "rgba(255,255,255,0.65)" }}>
            Manage scheduling and customers in one place.
          </Typography>
        </Stack>

        <Grid container spacing={6} alignItems="flex-start">
  {/* LEFT: Schedule */}
  <Grid item xs={12} lg={8}>
    <Paper
  sx={{
    ...cardSx,
    height: { lg: "calc(100vh - 275px)" }, // tweak 230–300
    minHeight: 700,
  }}
>
      <Stack spacing={2} sx={{ height: "100%" }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Schedule
          </Typography>
        </Stack>
        <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />

        {loading ? (
          <Skeleton variant="rounded" sx={{ height: "100%" }} />
        ) : (
          <Box sx={{ flex: 1, minHeight: 0 }}>
    <CalendarScheduler appointments={appointments} customerById={customerById} />
  </Box>
        )}
      </Stack>
    </Paper>
  </Grid>


  {/* RIGHT: Upcoming + Customers stacked */}
<Grid item xs={12} lg={4}>
  <Stack
    spacing={5}
    sx={{
      height: { lg: "calc(100vh - 225px)" }, // match Schedule
      minHeight: 700,                        // match Schedule
    }}
  >
    {/* Upcoming appointments */}
    <Paper sx={{ ...cardSx, p: { xs: 2.5, md: 3.5 }, flex: 1, minHeight: 0 }}>
      <Stack spacing={2} sx={{ height: "100%" }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
  <Typography variant="h6" sx={{ fontWeight: 700 }}>
    Upcoming appointments
  </Typography>

  <Chip
    size="small"
    label={loading ? "…" : `${appointments.length} total`}
    variant="outlined"
    sx={{ borderColor: "rgba(255,255,255,0.18)" }}
  />
</Stack>
        <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />

        {/* scroll area fills remaining space */}
        <Box className="card-scroll" sx={{ flex: 1, minHeight: 0, overflowY: "auto", pr: 1 }}>
          <Appointments appointments={appointments} loading={loading} />
        </Box>
      </Stack>
    </Paper>

    {/* Customers */}
    <Paper sx={{ ...cardSx, p: { xs: 2.5, md: 3.5 }, flex: 1, minHeight: 0 }}>
      <Stack spacing={2} sx={{ height: "100%" }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
  <Typography variant="h6" sx={{ fontWeight: 700 }}>
    Customers
  </Typography>

  <Chip
    size="small"
    label={loading ? "…" : `${customers.length} shown`}
    variant="outlined"
    sx={{ borderColor: "rgba(255,255,255,0.18)" }}
  />
</Stack>
        <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />

        {/* scroll area fills remaining space */}
        <Box className="card-scroll" sx={{ flex: 1, minHeight: 0, overflowY: "auto", pr: 1 }}>
          <Customer customers={customers} loading={loading} />
        </Box>
      </Stack>
    </Paper>
  </Stack>
</Grid>
</Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;