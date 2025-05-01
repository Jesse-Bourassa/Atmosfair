import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Box,
  Paper,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
        setCustomers(data.map((c) => ({ ...c, visible: true })));
      } catch (err) {
        console.error("Failed to fetch customers", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Customer List
      </Typography>

      <TextField
        label="Search customers"
        variant="outlined"
        fullWidth
        sx={{
          mb: 3,
          backgroundColor: "#f5f5f5",
          borderRadius: 2,
          input: { color: "#333" }
        }}
        onChange={(e) =>
          setCustomers((prev) =>
            prev.map((c) => ({
              ...c,
              visible:
                c.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
                c.email.toLowerCase().includes(e.target.value.toLowerCase()),
            }))
          )
        }
      />

      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper} sx={{
          maxHeight: 600,
          backgroundColor: "#3a3a3a",
          border: "3px solid #9c9c9c",
          borderRadius: 2,
          overflow: "hidden",
        }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "#fff", fontWeight: 500, py: 1.5 }}>Name</TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: 500, py: 1.5 }}>Email</TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: 500, py: 1.5 }}>Phone</TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: 500, py: 1.5 }}>Address</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers
                .filter((c) => c.visible !== false)
                .map((user, index) => (
                  <TableRow key={user._id}
                    style={{ backgroundColor: index % 2 === 0 ? "#2a2a2a" : "#242424" }}
                    onClick={() => navigate(`/admin/customer/${user._id}`)}
                    sx={{
                      backgroundColor: "#2a2a2a",
                      "&:hover": {
                        backgroundColor: "#3c3c3c",
                        transform: "scale(1.01)",
                        cursor: "pointer",
                        transition: "all 0.2s ease-in-out"
                      }
                    }}
                  >
                    <TableCell sx={{ color: "#fff", fontWeight: 500, py: 1.5 }}>{user.name}</TableCell>
                    <TableCell sx={{ color: "#fff", fontWeight: 500, py: 1.5 }}>{user.email}</TableCell>
                    <TableCell sx={{ color: "#fff", fontWeight: 500, py: 1.5 }}>{user.mainPhone}</TableCell>
                    <TableCell sx={{ color: "#fff", fontWeight: 500, py: 1.5 }}>{user.address}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default Customers;
