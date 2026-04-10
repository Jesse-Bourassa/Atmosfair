import { useEffect, useMemo, useState } from "react";
import { apiUrl } from "../../lib/api";
import {
  Box,
  CircularProgress,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";

const TYPE_COLORS = {
  repair:       { bg: "rgba(245,124,0,0.18)",  color: "#f57c00" },
  maintenance:  { bg: "rgba(67,160,71,0.18)",  color: "#43a047" },
  installation: { bg: "rgba(25,118,210,0.18)", color: "#1976d2" },
};

const TypeBadge = ({ type }) => {
  const style = TYPE_COLORS[type] ?? { bg: "rgba(255,255,255,0.1)", color: "#fff" };
  return (
    <Chip
      label={type}
      size="small"
      sx={{
        bgcolor: style.bg,
        color: style.color,
        fontWeight: 700,
        fontSize: "0.7rem",
        textTransform: "capitalize",
        border: `1px solid ${style.color}44`,
        height: 22,
      }}
    />
  );
};

/**
 * Props (recommended):
 * - appointments: array
 * - loading: boolean
 *
 * If not provided, component will fallback to fetching.
 */
const Appointments = ({ appointments: apptsProp, loading: loadingProp }) => {
  const [appointments, setAppointments] = useState(apptsProp ?? []);
  const [loading, setLoading] = useState(loadingProp ?? (apptsProp ? false : true));

  useEffect(() => {
    if (apptsProp !== undefined) {
      setAppointments(normalize(apptsProp));
      setLoading(!!loadingProp);
      return;
    }

    const fetchAppointments = async () => {
      try {
        const res = await fetch(apiUrl("/api/schedule"));
        const data = await res.json();
        setAppointments(normalize(data));
      } catch (err) {
        console.error("Failed to fetch appointments", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [apptsProp, loadingProp]);

  const rows = useMemo(() => appointments ?? [], [appointments]);

  return (
    <Box>
      {loading ? (
        <Stack alignItems="center" sx={{ py: 4 }}>
          <CircularProgress size={28} />
        </Stack>
      ) : (
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: 2.5,
            bgcolor: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
            overflow: "hidden",
          }}
        >
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <HeaderCell>Type</HeaderCell>
                <HeaderCell>Date</HeaderCell>
                <HeaderCell>Time</HeaderCell>
                <HeaderCell>Customer</HeaderCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.map((appt) => (
                <TableRow
                  key={appt._id}
                  sx={{
                    "& td": { borderColor: "rgba(255,255,255,0.05)" },
                    "&:hover": { bgcolor: "rgba(33,150,243,0.08)" },
                  }}
                >
                  <BodyCell>
                    <TypeBadge type={appt.type} />
                  </BodyCell>
                  <BodyCell>{appt.date}</BodyCell>
                  <BodyCell sx={{ color: "rgba(255,255,255,0.55)", fontSize: "0.78rem" }}>
                    {appt.time}
                  </BodyCell>
                  <BodyCell sx={{ fontWeight: 600 }}>{appt.name}</BodyCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

function normalize(data) {
  return (data ?? []).map((item) => ({
    ...item,
    time: item.time?.length === 4 ? "0" + item.time : item.time,
  }));
}

const HeaderCell = (props) => (
  <TableCell
    {...props}
    sx={{
      fontWeight: 700,
      fontSize: "0.72rem",
      textTransform: "uppercase",
      letterSpacing: 0.8,
      color: "rgba(255,255,255,0.5)",
      bgcolor: "rgba(10,10,20,0.85)",
      borderColor: "rgba(255,255,255,0.07)",
      py: 1.2,
    }}
  />
);

const BodyCell = (props) => (
  <TableCell
    {...props}
    sx={{
      color: "rgba(255,255,255,0.78)",
      py: 1.1,
      fontSize: "0.82rem",
      ...props.sx,
    }}
  />
);

export default Appointments;
