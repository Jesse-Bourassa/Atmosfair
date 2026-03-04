import React, { useEffect, useMemo, useState } from "react";
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
  Typography,
  Chip,
} from "@mui/material";

/**
 * Props (recommended):
 * - appointments: array
 * - loading: boolean
 * - customerById: { [userId]: customer }
 *
 * If not provided, component will fallback to fetching.
 */
const Appointments = ({ appointments: apptsProp, loading: loadingProp, customerById }) => {
  const [appointments, setAppointments] = useState(apptsProp ?? []);
  const [loading, setLoading] = useState(loadingProp ?? (apptsProp ? false : true));

  useEffect(() => {
    // If Dashboard passes props, use them
    if (apptsProp) {
      setAppointments(aptsPropSafe(apptsProp));
      setLoading(!!loadingProp);
      return;
    }

    // Fallback fetch (only if props not provided)
    const fetchAppointments = async () => {
      try {
        const res = await fetch(apiUrl("/api/schedule"));
        const data = await res.json();
        setAppointments(aptsPropSafe(data));
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
            maxHeight: 420,
            borderRadius: 3,
            bgcolor: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            overflow: "hidden",
          }}
        >
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <HeaderCell>Type</HeaderCell>
                <HeaderCell>Date</HeaderCell>
                <HeaderCell>Customer</HeaderCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.map((appt) => {
                const cust = customerById?.[String(appt.userId)];
                const customerLabel = cust?.name ?? appt.userId;

                return (
                  <TableRow
                    key={appt._id}
                    sx={{
                      "& td": { borderColor: "rgba(255,255,255,0.06)" },
                      "&:hover": { bgcolor: "rgba(33,150,243,0.10)" },
                    }}
                  >
                    <BodyCell sx={{ textTransform: "capitalize" }}>{appt.type}</BodyCell>
                    <BodyCell>{appt.date}</BodyCell>
                    <BodyCell sx={{ fontWeight: 600 }}>{customerLabel}</BodyCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

function aptsPropSafe(data) {
  // keep your padding behavior if needed
  return (data ?? []).map((item) => ({
    ...item,
    time: item.time?.length === 7 ? "0" + item.time : item.time,
    date: item.date,
  }));
}

const HeaderCell = (props) => (
  <TableCell
    {...props}
    sx={{
      fontWeight: 800,
      color: "rgba(255,255,255,0.85)",
      bgcolor: "rgba(15,15,15,0.85)",
      borderColor: "rgba(255,255,255,0.08)",
      py: 1.25,
    }}
  />
);

const BodyCell = (props) => (
  <TableCell
    {...props}
    sx={{
      color: "rgba(255,255,255,0.78)",
      py: 1.2,
    }}
  />
);

export default Appointments;