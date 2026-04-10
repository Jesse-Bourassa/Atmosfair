import { useEffect, useMemo, useState } from "react";
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
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

import Appointments from "./Appointments";
import Customer from "./Csutomer";
import CalendarScheduler from "./CalendarScheduler";
import { apiUrl } from "../../lib/api";

const cardSx = {
  p: { xs: 2, md: 3 },
  borderRadius: 3,
  bgcolor: "rgba(17, 25, 40, 0.55)",
  backdropFilter: "blur(14px)",
  border: "1px solid rgba(255,255,255,0.10)",
  boxShadow: "0 18px 60px rgba(0,0,0,0.55)",
};

const StatCard = ({ label, value, sub, color, icon: Icon }) => (
  <Paper
    sx={{
      ...cardSx,
      flex: 1,
      p: { xs: 2, md: 2.5 },
      display: "flex",
      alignItems: "center",
      gap: 2,
    }}
  >
    <Box
      sx={{
        width: 48,
        height: 48,
        borderRadius: 2.5,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: `${color}22`,
        flexShrink: 0,
      }}
    >
      <Icon sx={{ color, fontSize: 24 }} />
    </Box>
    <Box>
      <Typography
        sx={{
          fontSize: "0.72rem",
          fontWeight: 700,
          color: "rgba(255,255,255,0.45)",
          textTransform: "uppercase",
          letterSpacing: 1,
        }}
      >
        {label}
      </Typography>
      <Typography
        sx={{ fontSize: "1.85rem", fontWeight: 800, color, lineHeight: 1.1, mt: 0.2 }}
      >
        {value}
      </Typography>
      {sub && (
        <Typography sx={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.35)", mt: 0.25 }}>
          {sub}
        </Typography>
      )}
    </Box>
  </Paper>
);

const Dashboard = () => {
  const [customers, setCustomers] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const today = dayjs().format("YYYY-MM-DD");

  useEffect(() => {
    document.body.classList.add("bg-admin");
    document.body.classList.remove("bg-public");
    return () => { document.body.classList.remove("bg-admin"); };
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { navigate("/login"); return; }

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
        time: item.time?.length === 4 ? "0" + item.time : item.time,
      }));
    };

    (async () => {
      try {
        const [cust, appts] = await Promise.all([fetchCustomers(), fetchAppointments()]);
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

  const todayCount = useMemo(
    () => appointments.filter((a) => a.date === today).length,
    [appointments, today]
  );

  const upcomingCount = useMemo(
    () => appointments.filter((a) => a.date >= today).length,
    [appointments, today]
  );

  return (
    <Box sx={{ minHeight: "100vh", pt: { xs: 10, md: 11 }, pb: { xs: 4, md: 6 } }}>
      <Container
        maxWidth={false}
        disableGutters
        sx={{ px: { xs: 2, md: 3 }, maxWidth: 2200, mx: "auto" }}
      >
        {/* Header */}
        <Stack direction="row" alignItems="flex-start" justifyContent="space-between" sx={{ mb: 3 }}>
          <Stack spacing={0.4}>
            <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: 0.2 }}>
              Dashboard
            </Typography>
            <Typography sx={{ color: "rgba(255,255,255,0.45)", fontSize: "0.88rem" }}>
              Manage scheduling and customers in one place.
            </Typography>
          </Stack>
          <Chip
            icon={<ReceiptLongIcon sx={{ fontSize: "1rem !important" }} />}
            label="Soumissions"
            clickable
            onClick={() => navigate("/admin/quotes")}
            sx={{
              bgcolor: "rgba(33,150,243,0.12)",
              border: "1px solid rgba(33,150,243,0.35)",
              color: "#2196f3",
              fontWeight: 700,
              fontSize: "0.78rem",
              mt: 0.5,
            }}
          />
        </Stack>

        {/* Stat cards */}
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mb: 3 }}>
          <StatCard
            label="Today"
            value={loading ? "–" : todayCount}
            sub="appointments today"
            color="#2196f3"
            icon={CalendarMonthIcon}
          />
          <StatCard
            label="Upcoming"
            value={loading ? "–" : upcomingCount}
            sub="from today onwards"
            color="#43a047"
            icon={EventAvailableIcon}
          />
          <StatCard
            label="Customers"
            value={loading ? "–" : customers.length}
            sub="registered accounts"
            color="#f57c00"
            icon={PeopleAltIcon}
          />
        </Stack>

        {/* Main grid */}
        <Grid container spacing={3} alignItems="flex-start">
          {/* LEFT: Schedule */}
          <Grid item xs={12} lg={8}>
            <Paper
              sx={{
                ...cardSx,
                height: { lg: "calc(100vh - 340px)" },
                minHeight: 580,
              }}
            >
              <Stack spacing={2} sx={{ height: "100%" }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Schedule
                  </Typography>
                  <Typography
                    sx={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.35)", fontWeight: 600 }}
                  >
                    {dayjs().format("MMMM YYYY")}
                  </Typography>
                </Stack>
                <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />

                {loading ? (
                  <Skeleton variant="rounded" sx={{ flex: 1 }} />
                ) : (
                  <Box sx={{ flex: 1, minHeight: 0 }}>
                    <CalendarScheduler appointments={appointments} customerById={customerById} />
                  </Box>
                )}
              </Stack>
            </Paper>
          </Grid>

          {/* RIGHT: Appointments + Customers */}
          <Grid item xs={12} lg={4}>
            <Stack
              spacing={3}
              sx={{
                height: { lg: "calc(100vh - 340px)" },
                minHeight: 580,
              }}
            >
              {/* Appointments */}
              <Paper sx={{ ...cardSx, flex: 1, minHeight: 0 }}>
                <Stack spacing={2} sx={{ height: "100%" }}>
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      Appointments
                    </Typography>
                    <Chip
                      size="small"
                      label={loading ? "…" : `${appointments.length} total`}
                      variant="outlined"
                      sx={{ borderColor: "rgba(255,255,255,0.18)", fontSize: "0.72rem" }}
                    />
                  </Stack>
                  <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />
                  <Box className="card-scroll" sx={{ flex: 1, minHeight: 0, overflowY: "auto", pr: 0.5 }}>
                    <Appointments appointments={appointments} loading={loading} />
                  </Box>
                </Stack>
              </Paper>

              {/* Customers */}
              <Paper sx={{ ...cardSx, flex: 1, minHeight: 0 }}>
                <Stack spacing={2} sx={{ height: "100%" }}>
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      Customers
                    </Typography>
                    <Chip
                      size="small"
                      label={loading ? "…" : `${customers.length} shown`}
                      variant="outlined"
                      sx={{ borderColor: "rgba(255,255,255,0.18)", fontSize: "0.72rem" }}
                    />
                  </Stack>
                  <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />
                  <Box className="card-scroll" sx={{ flex: 1, minHeight: 0, overflowY: "auto", pr: 0.5 }}>
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
