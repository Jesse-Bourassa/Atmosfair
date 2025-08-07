import {
  TextField, Button, Typography, Box, Paper, MenuItem, Grid
} from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useState, useEffect } from 'react';

const Repair = () => {
  const [selectedDate, setSelectedDate]   = useState(dayjs());
  const [selectedTime, setSelectedTime]   = useState(null);
  const [repairType,   setRepairType]     = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);

  /* ── fetch available slots whenever date or type changes ── */
  useEffect(() => {
    
    if (selectedDate && repairType) {
      fetchAvailableSlots(
        selectedDate.format('YYYY-MM-DD'),
        repairType                       // always "repair"
      );
    }
  }, [selectedDate, repairType]);
  const apiBase = import.meta.env.VITE_API_URL ?? 'https://api.atmosfairs.com';

  const fetchAvailableSlots = async (date, type) => {
    try {
      const res  = await fetch(
        `${apiBase}/api/schedule/available-slots?date=${date}&type=${type}`
      );
      const data = await res.json();
      if (res.ok) setAvailableSlots(data);
      else        alert(data.message || 'Failed to fetch available slots.');
    } catch (err) {
      console.error('Error fetching slots:', err);
      alert('Error fetching available slots.');
    }
  };

  /* ── submit ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!repairType || !selectedDate || !selectedTime) {
      alert('Please fill in all fields.');
      return;
    }

    const userId = localStorage.getItem('userId');   // adjust if stored differently
    try {
      const res = await fetch(`${apiBase}/api/schedule`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          type: repairType,                           // "repair"
          date: selectedDate.format('YYYY-MM-DD'),
          time: selectedTime
        })
      });
      const data = await res.json();
      if (res.ok) {
        alert('Repair appointment scheduled!');
        setSelectedTime(null);
      } else {
        alert(data.message || 'Failed to schedule.');
      }
    } catch (err) {
      console.error('Error scheduling:', err);
      alert('Error scheduling appointment.');
    }
  };

  /* ── UI ── */
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 14 }}>
      <Paper elevation={6}
             sx={{ p: 4, width: '100%', maxWidth: 800,
                   backgroundColor: '#1e1e1e', color: 'white' }}>
        <Grid container justifyContent="center">
          <Typography variant="h4" gutterBottom align="center"
                      sx={{ color: '#90caf9', mb: 2 }}>
            HVAC Repairs
          </Typography>
        </Grid>

        <Typography variant="body1" paragraph align="center">
          Choose the repair category and your preferred date. Our team will handle the rest.
        </Typography>

        <form onSubmit={handleSubmit}>
          {/* ── repair type select ── */}
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
            value={repairType}
            onChange={(e) => setRepairType(e.target.value)}
          >
            <MenuItem value="">Select an option</MenuItem>
            {/* every option passes "repair" so backend knows the service */}
            <MenuItem value="repair">Central Air Conditioning</MenuItem>
            <MenuItem value="repair">Ductless Mini‑Split</MenuItem>
            <MenuItem value="repair">Furnace</MenuItem>
            <MenuItem value="repair">Heat Pump</MenuItem>
            <MenuItem value="repair">Refrigeration</MenuItem>
            <MenuItem value="repair">Suspended Unit</MenuItem>
            <MenuItem value="repair">Roof Top</MenuItem>
            <MenuItem value="repair">Natural Gas</MenuItem>
          </TextField>

          {/* ── date + time pickers ── */}
          <Grid container spacing={3} sx={{ mt: 2 }}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ mb: 1 }}>Select Date:</Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                  value={selectedDate}
                  onChange={(val) => setSelectedDate(val)}
                  sx={{
                    bgcolor: '#2c2c2c', borderRadius: 2, p: 2,
                    '& .MuiPickersArrowSwitcher-button,.MuiSvgIcon-root': {
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
                          variant={selectedTime === slot ? 'contained' : 'outlined'}
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

          {/* ── submit ── */}
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

export default Repair;
