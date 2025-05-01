import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, CircularProgress } from "@mui/material";

const CustomerDetails = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [newEquipment, setNewEquipment] = useState({
    brand: "",
    model: "",
    serialNumber: "",
    comment: ""
  });

  const [editingIndex, setEditingIndex] = useState(null);
  const [editedEquipment, setEditedEquipment] = useState({
    brand: "",
    model: "",
    serialNumber: "",
    comment: ""
  });

  const inputStyle = {
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #555",
    backgroundColor: "#1e1e1e",
    color: "#fff",
    width: "150px"
  };

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:5001/api/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setCustomer(data);
      } catch (err) {
        console.error("Failed to fetch customer details", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomer();
  }, [id]);

  const handleSubmit = async () => {
    const { brand, model, serialNumber } = newEquipment;

    if (!brand || !model || !serialNumber) {
      alert("Please fill out all required fields.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5001/api/users/${id}/equipment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newEquipment),
      });

      if (res.ok) {
        const updated = await res.json();
        setCustomer((prev) => ({
          ...prev,
          equipment: updated.equipment,
        }));
        setNewEquipment({ brand: "", model: "", serialNumber: "", comment: "" });
        setShowForm(false);
      } else {
        alert("Failed to save equipment.");
      }
    } catch (err) {
      console.error("Error saving equipment:", err);
      alert("Something went wrong.");
    }
  };

  const handleDeleteEquipment = async (index) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5001/api/users/${id}/equipment/${index}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const updated = await res.json();
        setCustomer((prev) => ({
          ...prev,
          equipment: updated.equipment,
        }));
      } else {
        alert("Failed to delete equipment.");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Something went wrong.");
    }
  };

  const handleUpdateEquipment = async (index) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5001/api/users/${id}/equipment/${index}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editedEquipment),
      });

      if (res.ok) {
        const updated = await res.json();
        setCustomer((prev) => ({
          ...prev,
          equipment: updated.equipment,
        }));
        setEditingIndex(null);
      } else {
        alert("Failed to update equipment.");
      }
    } catch (err) {
      console.error("Update error:", err);
      alert("Something went wrong.");
    }
  };

  if (loading) return <CircularProgress />;
  if (!customer) return <Typography>No customer found.</Typography>;

  return (
    <Box sx={{ p: 4, mt: 8 }}>
      <Typography variant="h4" gutterBottom>{customer.name}</Typography>
      <Typography>Email: {customer.email}</Typography>
      <Typography>Phone: {customer.mainPhone}</Typography>
      <Typography>Telephone: {customer.telephone}</Typography>
      <Typography>Address: {customer.address}</Typography>

      <Box sx={{ mt: 5 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h5" gutterBottom>Equipment List</Typography>
          <button
            style={{
              padding: "6px 12px",
              backgroundColor: showForm ? "red" : "#1976d2",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
            onClick={() => setShowForm(prev => !prev)}
          >
            {showForm ? "Cancel" : "+ Add Equipment"}
          </button>
        </Box>

        {showForm && (
          <Box sx={{ mt: 2, display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
            <select
              value={newEquipment.brand}
              onChange={(e) => setNewEquipment({ ...newEquipment, brand: e.target.value })}
              style={{
                padding: "8px",
                borderRadius: "4px",
                backgroundColor: "#1e1e1e",
                color: "#fff",
                border: "1px solid #555",
                minWidth: "140px"
              }}
            >
              <option value="">Select Brand</option>
              <option value="Lennox">Lennox</option>
              <option value="Carrier">Carrier</option>
              <option value="Trane">Trane</option>
              <option value="Goodman">Goodman</option>
              <option value="York">York</option>
              <option value="Rheem">Rheem</option>
              <option value="Daikin">Daikin</option>
              <option value="Other">Other</option>
            </select>

            <input
              placeholder="Model"
              value={newEquipment.model}
              onChange={(e) => setNewEquipment({ ...newEquipment, model: e.target.value })}
              style={inputStyle}
            />
            <input
              placeholder="Serial Number"
              value={newEquipment.serialNumber}
              onChange={(e) => setNewEquipment({ ...newEquipment, serialNumber: e.target.value })}
              style={inputStyle}
            />
            <textarea
              placeholder="Comment"
              value={newEquipment.comment}
              onChange={(e) => setNewEquipment({ ...newEquipment, comment: e.target.value })}
              rows={4}
              style={{
                ...inputStyle,
                width: "100%",
                minWidth: "300px",
                maxWidth: "500px",
                height: "80px",
                resize: "vertical"
              }}
            />
            <button
              onClick={handleSubmit}
              style={{
                padding: "8px 16px",
                backgroundColor: "#4caf50",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              Save Equipment
            </button>
          </Box>
        )}

        {customer.equipment?.length > 0 ? (
          <Box sx={{ border: "1px solid #5c5c5c", borderRadius: 2, overflow: "hidden", mt: 2 }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead style={{ backgroundColor: "#3a3a3a", color: "#fff" }}>
                <tr>
                  <th style={{ padding: "10px" }}>Date Added</th>
                  <th style={{ padding: "10px" }}>Brand</th>
                  <th style={{ padding: "10px" }}>Model</th>
                  <th style={{ padding: "10px" }}>Serial #</th>
                  <th style={{ padding: "10px" }}>Comment</th>
                  <th style={{ padding: "10px", textAlign: "center" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {customer.equipment.map((item, index) => {
                  const isEditing = editingIndex === index;
                  return (
                    <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "#2a2a2a" : "#333" }}>
                      <td style={{ padding: "10px" }}>
                        {item.dateAdded ? new Date(item.dateAdded).toLocaleDateString() : "—"}
                      </td>

                      {isEditing ? (
                        <>
<td>
  <select
    value={editedEquipment.brand}
    onChange={(e) =>
      setEditedEquipment({ ...editedEquipment, brand: e.target.value })
    }
    style={{
      padding: "8px",
      borderRadius: "4px",
      backgroundColor: "#1e1e1e",
      color: "#fff",
      border: "1px solid #555",
      width: "100%"
    }}
  >
    <option value="">Select Brand</option>
    <option value="Lennox">Lennox</option>
    <option value="Carrier">Carrier</option>
    <option value="Trane">Trane</option>
    <option value="Goodman">Goodman</option>
    <option value="York">York</option>
    <option value="Rheem">Rheem</option>
    <option value="Daikin">Daikin</option>
    <option value="Other">Other</option>
  </select>
</td>                          <td><input value={editedEquipment.model} onChange={(e) => setEditedEquipment({ ...editedEquipment, model: e.target.value })} style={{ width: "100%" }} /></td>
                          <td><input value={editedEquipment.serialNumber} onChange={(e) => setEditedEquipment({ ...editedEquipment, serialNumber: e.target.value })} style={{ width: "100%" }} /></td>
                          <td><textarea value={editedEquipment.comment} onChange={(e) => setEditedEquipment({ ...editedEquipment, comment: e.target.value })} style={{ width: "100%", height: "60px" }} /></td>
                          <td style={{ display: "flex", gap: "8px", padding: "10px" }}>
  <button
    onClick={() => handleUpdateEquipment(index)}
    style={{
      padding: "6px 12px",
      backgroundColor: "#4caf50",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      fontWeight: "bold",
      cursor: "pointer"
    }}
  >
    Save
  </button>
  <button
    onClick={() => setEditingIndex(null)}
    style={{
      padding: "6px 12px",
      backgroundColor: "red",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      fontWeight: "bold",
      cursor: "pointer"
    }}
  >
    Cancel
  </button>
</td>
                        </>
                      ) : (
                        <>
                          <td style={{ padding: "10px" }}>{item.brand}</td>
                          <td style={{ padding: "10px" }}>{item.model}</td>
                          <td style={{ padding: "10px" }}>{item.serialNumber}</td>
                          <td style={{ padding: "10px", whiteSpace: "pre-wrap" }}>{item.comment}</td>
                          <td style={{ padding: "10px", textAlign: "center", display: "flex", gap: "8px", justifyContent: "center" }}>
                            <button
                              onClick={() => {
                                setEditingIndex(index);
                                setEditedEquipment(item);
                              }}
                              style={{ padding: "6px 12px", backgroundColor: "#0288d1", color: "#fff", border: "none", borderRadius: "4px", fontWeight: "bold", cursor: "pointer" }}
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteEquipment(index)}
                              style={{ padding: "6px 12px", backgroundColor: "#e53935", color: "#fff", border: "none", borderRadius: "4px", fontWeight: "bold", cursor: "pointer" }}
                            >
                              Delete
                            </button>
                          </td>
                        </>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Box>
        ) : (
          <Typography>No equipment listed for this customer.</Typography>
        )}
      </Box>
    </Box>
  );
};

export default CustomerDetails;