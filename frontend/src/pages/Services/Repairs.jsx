// src/pages/Services/Maintenance.jsx

import React, { useState } from 'react';
import {
  Box, Button, TextField, Typography, Paper, Grid
} from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const Maintenance = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedTime, setSelectedTime] = useState(null);

  const timeSlots = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
    "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM"
  ];

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 14 }}>
      <Paper elevation={6} sx={{ p: 4, width: '100%', maxWidth: 800, backgroundColor: '#1e1e1e', color: 'white' }}>
        <Grid container justifyContent="center">
          <Typography variant="h4" gutterBottom align="center" sx={{ color: '#90caf9', mb: 2 }}>
            HVAC Repairs
          </Typography>
        </Grid>

        <Typography variant="body1" paragraph align="center">
          Choose your Repairs needs and schedule a convenient time for our team to service your HVAC system.
        </Typography>

        <form>
          <TextField
            select
            label="Repair Type"
            fullWidth
            margin="normal"
            SelectProps={{ native: true }}
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
          >
            <option value="">Select an option</option>
            <option value="seasonal">Seasonal Tune-Up</option>
            <option value="filter">Filter Replacement</option>
            <option value="inspection">Full System Inspection</option>
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
                  {timeSlots.map((slot) => (
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
                  ))}
                </Grid>
              </Box>
            </Grid>
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Button type="submit" variant="contained" sx={{ px: 4, py: 1.5 }}>
              Schedule Repair
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default Maintenance;
