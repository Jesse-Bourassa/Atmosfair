import { TextField, Button, Typography, Box, Paper, MenuItem ,Grid } from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useState, useEffect } from 'react';

const Installation = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedTime, setSelectedTime] = useState(null);
  const [installType, setInstallType] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);

  // Fetch available slots when date or type changes
  useEffect(() => {
    if (selectedDate && installType) {
      fetchAvailableSlots(selectedDate.format("YYYY-MM-DD"), installType);
    }
  }, [selectedDate, installType]);
  const apiBase = import.meta.env.VITE_API_URL ?? 'https://api.atmosfairs.com';

  const fetchAvailableSlots = async (date, type) => {
    try {
      const response = await fetch(`${apiBase}/api/schedule/available-slots?date=${date}&type=${type}`);
      const data = await response.json();
      if (response.ok) {
        setAvailableSlots(data);
      } else {
        alert(data.message || "Failed to fetch available slots.");
      }
    } catch (err) {
      console.error("Error fetching slots:", err);
      alert("Error fetching available slots.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!installType || !selectedDate || !selectedTime) {
      alert("Please fill in all fields.");
      return;
    }

    const userId = localStorage.getItem("userId");
    try {
      const response = await fetch(`${apiBase}/api/schedule`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          type: installType,
          date: selectedDate.format("YYYY-MM-DD"),
          time: selectedTime,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Appointment scheduled!");
        setSelectedTime(null); // Reset selected time
      } else {
        alert(data.message || "Failed to schedule.");
      }
    } catch (err) {
      console.error("Error scheduling:", err);
      alert("Error scheduling appointment.");
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 14 }}>
      <Paper elevation={6} sx={{ p: 4, width: '100%', maxWidth: 800, backgroundColor: '#1e1e1e', color: 'white' }}>
        <Grid container justifyContent="center">
          <Typography variant="h4" gutterBottom align="center" sx={{ color: '#90caf9', mb: 2 }}>
            HVAC Installation
          </Typography>
        </Grid>

        <Typography variant="body1" paragraph align="center">
          Choose the type of installation and your preferred date. Our team will handle the rest.
        </Typography>

        <form onSubmit={handleSubmit}>
<TextField
  select
  label="Repair Type"
  fullWidth
  margin="normal"
  variant="filled"
  sx={{
    backgroundColor: '#2c2c2c',
    borderRadius: 1,
    '& .MuiInputBase-input': { color: 'white' },
    '& .MuiInputLabel-root': { color: '#90caf9' },
    '& .MuiSvgIcon-root': { color: '#2196F3' }
  }}
  InputLabelProps={{ shrink: true }}
  required
  value={installType}
  onChange={(e) => setInstallType(e.target.value)}
>
  <MenuItem value="">Select an option</MenuItem>
  <MenuItem value="installation">Central Air Conditioning</MenuItem>
  <MenuItem value="installation">Ductless Mini-Split</MenuItem>
  <MenuItem value="installation">Furnace Installation</MenuItem>
  <MenuItem value="installation">Heat Pump</MenuItem>
  <MenuItem value="installation">Refrigeration</MenuItem>
  <MenuItem value="installation">Suspended Unit</MenuItem>
  <MenuItem value="installation">Roof Top</MenuItem>
  <MenuItem value="installation">Natural Gas</MenuItem>
</TextField>


          <Grid container spacing={3} sx={{ mt: 2 }}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ mb: 1 }}>Select Date:</Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                  value={selectedDate}
                  onChange={(newValue) => setSelectedDate(newValue)}
                  sx={{
                    bgcolor: '#2c2c2c',
                    borderRadius: 2,
                    p: 2,
                    '& .MuiPickersArrowSwitcher-button': {
                      color: '#2196F3'
                    },
                    '& .MuiSvgIcon-root': {
                      color: '#2196F3'
                    }
                  }}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ mb: 1 }}>Select Time:</Typography>
              <Box sx={{ maxHeight: 360, overflowY: 'auto', pr: 1 }}>
                <Grid container direction="column" spacing={1}>
                  {availableSlots.length > 0 ? (
                    availableSlots.map((slot) => (
                      <Grid item key={slot}>
                        <Button
                          variant={selectedTime === slot ? "contained" : "outlined"}
                          fullWidth
                          color="error"
                          onClick={() => setSelectedTime(slot)}
                          sx={{ fontWeight: 'bold' }}
                        >
                          {slot}
                        </Button>
                      </Grid>
                    ))
                  ) : (
                    <Typography variant="body2" color="error">
                      No available slots for this day.
                    </Typography>
                  )}
                </Grid>
              </Box>
            </Grid>
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Button type="submit" variant="contained" sx={{ px: 4, py: 1.5 }}>
              Schedule Appointment
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default Installation;
