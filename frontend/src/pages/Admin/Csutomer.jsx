import React, { useEffect, useMemo, useState } from "react";
import { apiUrl } from "../../lib/api";
import {
  Box,
  CircularProgress,
  InputAdornment,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Chip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

/**
 * Props (recommended):
 * - customers: array
 * - loading: boolean
 *
 * If not provided, component will fallback to fetching.
 */
const Customers = ({ customers: customersProp, loading: loadingProp }) => {
  const [customers, setCustomers] = useState(customersProp ?? []);
  const [loading, setLoading] = useState(loadingProp ?? (customersProp ? false : true));
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // If Dashboard passes props, use them
    if (customersProp) {
      setCustomers(customersProp);
      setLoading(!!loadingProp);
      return;
    }

    // Fallback fetch (only if props not provided)
    const fetchCustomers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(apiUrl("/api/users/customers"), {
          headers: { Authorization: `Bearer ${token}` },
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
  }, [customersProp, loadingProp]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return customers;

    return (customers ?? []).filter((c) => {
      const name = (c.name ?? "").toLowerCase();
      const email = (c.email ?? "").toLowerCase();
      const phone = (c.mainPhone ?? "").toLowerCase();
      return name.includes(q) || email.includes(q) || phone.includes(q);
    });
  }, [customers, query]);

  return (
    <Box>
      <Stack
        direction={{ xs: "column", md: "row" }}
        alignItems={{ md: "center" }}
        justifyContent="space-between"
        gap={1.5}
        sx={{ mb: 2 }}
      >
        

        <TextField
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search name, email, phone..."
          size="small"
          sx={{
            width: { xs: "100%", md: "100%" },
            "& .MuiOutlinedInput-root": {
              bgcolor: "rgba(255,255,255,0.05)",
              borderRadius: 2,
              color: "rgba(255,255,255,0.85)",
              "& fieldset": { borderColor: "rgba(255,255,255,0.10)" },
              "&:hover fieldset": { borderColor: "rgba(33,150,243,0.35)" },
              "&.Mui-focused fieldset": { borderColor: "rgba(33,150,243,0.65)" },
            },
            "& input::placeholder": { color: "rgba(255,255,255,0.45)" },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" style={{ color: "rgba(255,255,255,0.55)" }} />
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      {loading ? (
        <Stack alignItems="center" sx={{ py: 4 }}>
          <CircularProgress size={28} />
        </Stack>
      ) : (
        <TableContainer
          component={Paper}
          sx={{
            maxHeight: 640,
            borderRadius: 3,
            bgcolor: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            overflow: "hidden",
          }}
        >
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <HeaderCell>Name</HeaderCell>
                <HeaderCell>Email</HeaderCell>
                <HeaderCell>Phone</HeaderCell>
                <HeaderCell>Address</HeaderCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filtered.map((user) => (
                <TableRow
                  key={user._id}
                  onClick={() => navigate(`/admin/customer/${user._id}`)}
                  sx={{
                    cursor: "pointer",
                    "& td": { borderColor: "rgba(255,255,255,0.06)" },
                    "&:hover": { bgcolor: "rgba(33,150,243,0.10)" },
                  }}
                >
                  <BodyCell sx={{ fontWeight: 700 }}>{user.name}</BodyCell>
                  <BodyCell>{user.email}</BodyCell>
                  <BodyCell>{user.mainPhone}</BodyCell>
                  <BodyCell sx={{ maxWidth: 360, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {user.address}
                  </BodyCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

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

export default Customers;