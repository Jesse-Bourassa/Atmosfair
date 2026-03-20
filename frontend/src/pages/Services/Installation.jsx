import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  MenuItem,
  Grid,
  Chip,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DateCalendar } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import EngineeringIcon from "@mui/icons-material/Engineering";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import BoltIcon from "@mui/icons-material/Bolt";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { apiUrl } from "../../lib/api";
import { useLanguage } from "../../context/LanguageContext";
import "dayjs/locale/en";

const MotionBox = motion(Box);

const filledInputStyles = {
  "& .MuiFilledInput-root": {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "14px",
    color: "#fff",
    overflow: "hidden",
    "&:hover": {
      background: "rgba(255,255,255,0.06)",
    },
    "&.Mui-focused": {
      background: "rgba(255,255,255,0.07)",
      border: "1px solid rgba(127,179,255,0.35)",
    },
  },
  "& .MuiInputLabel-root": {
    color: "#8fb4da",
  },
  "& .MuiInputBase-input": {
    color: "#fff",
  },
  "& .MuiFilledInput-input": {
    color: "#fff",
  },
  "& .MuiFormHelperText-root": {
    color: "#94a3b8",
  },
  "& .MuiSvgIcon-root": {
    color: "#7fb3ff",
  },
};

const Installation = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedTime, setSelectedTime] = useState(null);
  const [installType, setInstallType] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const { t, language } = useLanguage();

  const installationOptions = [
    t("equipmentCentralAirConditioning"),
    t("equipmentDuctlessMiniSplit"),
    t("equipmentFurnaceInstallation"),
    t("equipmentHeatPump"),
    t("equipmentRefrigeration"),
    t("equipmentSuspendedUnit"),
    t("equipmentRoofTop"),
    t("equipmentNaturalGas"),
  ];

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    notes: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    dayjs.locale(language === "fr" ? "fr" : "en");
  }, [language]);

  useEffect(() => {
    if (selectedDate && installType) {
      fetchAvailableSlots(selectedDate.format("YYYY-MM-DD"), "installation");
    } else {
      setAvailableSlots([]);
      setSelectedTime(null);
    }
  }, [selectedDate, installType]);

  const handleCustomerChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const fetchAvailableSlots = async (date, type) => {
    setLoadingSlots(true);
    setSelectedTime(null);

    try {
      const response = await fetch(
        apiUrl(`/api/schedule/available-slots?date=${date}&type=${type}`),
      );
      const data = await response.json();

      if (response.ok) {
        setAvailableSlots(data);
      } else {
        setAvailableSlots([]);
        alert(data.message || t("failedToFetchSlots"));
      }
    } catch (err) {
      console.error("Error fetching slots:", err);
      setAvailableSlots([]);
      alert(t("errorFetchingSlots"));
    } finally {
      setLoadingSlots(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !customer.name.trim() ||
      !customer.phone.trim() ||
      !customer.email.trim() ||
      !customer.address.trim() ||
      !installType ||
      !selectedDate ||
      !selectedTime
    ) {
      alert(t("fillRequiredFields"));
      return;
    }

    try {
      setSubmitting(true);

      const response = await fetch(apiUrl(`/api/schedule`), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "installation",
          equipmentType: installType,
          date: selectedDate.format("YYYY-MM-DD"),
          time: selectedTime,
          name: customer.name.trim(),
          phone: customer.phone.trim(),
          email: customer.email.trim(),
          address: customer.address.trim(),
          notes: customer.notes.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(t("installationSubmitted"));
        navigate("/");
      } else {
        alert(data.message || t("failedToSchedule"));
      }
    } catch (err) {
      console.error("Error scheduling:", err);
      alert(t("errorSchedulingAppointment"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        color: "#fff",
        background:
          "radial-gradient(circle at top, rgba(36,74,120,0.16), transparent 28%), linear-gradient(180deg, #08111c 0%, #0b1420 45%, #091018 100%)",
        py: { xs: 10, md: 12 },
      }}
    >
      <Box sx={{ maxWidth: "xl", mx: "auto", px: { xs: 2, sm: 3, md: 4 } }}>
        <Box sx={{ textAlign: "center", mb: { xs: 5, md: 7 } }}>
          <Typography
            sx={{
              color: "#88a8c9",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              fontSize: "0.8rem",
              mb: 1.5,
            }}
          >
            {t("installationService")}
          </Typography>

          <Typography
            sx={{
              color: "#f8fafc",
              fontWeight: 800,
              lineHeight: 1.08,
              fontSize: { xs: "2rem", md: "3rem" },
              mb: 2,
            }}
          >
            {t("bookInstallation")}
          </Typography>

          <Typography
            sx={{
              color: "#cbd5e1",
              maxWidth: "760px",
              mx: "auto",
              lineHeight: 1.9,
              fontSize: { xs: "1rem", md: "1.04rem" },
            }}
          >
            {t("bookingIntro")}
          </Typography>
        </Box>

        <Box
          sx={{
            mb: { xs: 6, md: 6 },
            py: 2.2,
            px: 2,
            background: "rgba(10, 16, 24, 0.65)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.05)",
            borderRadius: "18px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: { xs: 1.5, md: 4 },
            }}
          >
            {[
              t("professionalSetup"),
              t("reliableScheduling"),
              t("residentialCommercial"),
              t("highQualityService"),
            ].map((item) => (
              <Typography
                key={item}
                sx={{
                  color: "#d6deea",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  letterSpacing: ".02em",
                }}
              >
                ✓ {item}
              </Typography>
            ))}
          </Box>
        </Box>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3.5}>
            <Grid item xs={12} lg={7}>
              <MotionBox
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 2.2, md: 3.2 },
                    borderRadius: "24px",
                    background: "rgba(20, 28, 40, 0.62)",
                    backdropFilter: "blur(14px)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    boxShadow: "0 10px 40px rgba(0,0,0,0.35)",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.2,
                      mb: 2,
                    }}
                  >
                    <PersonOutlineIcon sx={{ color: "#7fb3ff" }} />
                    <Typography
                      sx={{
                        color: "#f8fafc",
                        fontWeight: 800,
                        fontSize: "1.25rem",
                      }}
                    >
                      {t("customerInformation")}
                    </Typography>
                  </Box>

                  <Typography
                    sx={{
                      color: "#cbd5e1",
                      mb: 2.5,
                      lineHeight: 1.8,
                      fontSize: "0.96rem",
                    }}
                  >
                    {t("enterContactDetails")}
                  </Typography>

                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        label={t("fullName")}
                        name="name"
                        fullWidth
                        required
                        variant="filled"
                        value={customer.name}
                        onChange={handleCustomerChange}
                        InputLabelProps={{ shrink: true }}
                        sx={filledInputStyles}
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <TextField
                        label={t("phoneNumber")}
                        name="phone"
                        fullWidth
                        required
                        variant="filled"
                        value={customer.phone}
                        onChange={handleCustomerChange}
                        InputLabelProps={{ shrink: true }}
                        sx={filledInputStyles}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        label={t("email")}
                        name="email"
                        type="email"
                        fullWidth
                        required
                        variant="filled"
                        value={customer.email}
                        onChange={handleCustomerChange}
                        InputLabelProps={{ shrink: true }}
                        sx={filledInputStyles}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        label={t("serviceAddress")}
                        name="address"
                        fullWidth
                        required
                        variant="filled"
                        value={customer.address}
                        onChange={handleCustomerChange}
                        InputLabelProps={{ shrink: true }}
                        sx={filledInputStyles}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        label={t("additionalNotes")}
                        name="notes"
                        fullWidth
                        multiline
                        minRows={4}
                        variant="filled"
                        value={customer.notes}
                        onChange={handleCustomerChange}
                        InputLabelProps={{ shrink: true }}
                        placeholder={t("installationNotesPlaceholder")}
                        sx={filledInputStyles}
                      />
                    </Grid>
                  </Grid>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.2,
                      mt: 4,
                      mb: 2,
                    }}
                  >
                    <EngineeringIcon sx={{ color: "#7fb3ff" }} />
                    <Typography
                      sx={{
                        color: "#f8fafc",
                        fontWeight: 800,
                        fontSize: "1.25rem",
                      }}
                    >
                      {t("installationDetails")}
                    </Typography>
                  </Box>

                  <Typography
                    sx={{
                      color: "#cbd5e1",
                      mb: 2.5,
                      lineHeight: 1.8,
                      fontSize: "0.96rem",
                    }}
                  >
                    {t("installationDetailsIntro")}
                  </Typography>

                  <TextField
                    select
                    label={t("equipmentType")}
                    fullWidth
                    value={installType}
                    onChange={(e) => setInstallType(e.target.value)}
                    required
                    InputLabelProps={{ shrink: true }}
                    variant="filled"
                    sx={{ ...filledInputStyles, mb: 3 }}
                  >
                    <MenuItem value="">{t("selectOption")}</MenuItem>
                    {installationOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>

                  <Grid container spacing={3} alignItems="flex-start">
                    <Grid item xs={12} md={5} sx={{ minWidth: 0 }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mb: 1.5,
                        }}
                      >
                        <CalendarMonthIcon
                          sx={{ color: "#7fb3ff", fontSize: 20 }}
                        />
                        <Typography sx={{ color: "#f8fafc", fontWeight: 700 }}>
                          {t("selectDate")}
                        </Typography>
                      </Box>

                      <LocalizationProvider
                        dateAdapter={AdapterDayjs}
                        adapterLocale={language === "fr" ? "fr" : "en"}
                      >
                        <DateCalendar
                          value={selectedDate}
                          onChange={(newValue) => setSelectedDate(newValue)}
                          disablePast
                          sx={{
                            width: "100%",
                            minWidth: 0,
                            maxWidth: "100%",
                            overflow: "hidden",
                            color: "#fff",
                            bgcolor: "rgba(255,255,255,0.03)",
                            borderRadius: "18px",
                            border: "1px solid rgba(255,255,255,0.08)",
                            p: 1.5,
                            "& .MuiPickersCalendarHeader-root": {
                              paddingLeft: 0,
                              paddingRight: 0,
                            },
                            "& .MuiDayCalendar-header": {
                              justifyContent: "space-between",
                            },
                            "& .MuiDayCalendar-weekContainer": {
                              justifyContent: "space-between",
                            },
                            "& .MuiPickersCalendarHeader-label": {
                              color: "#f8fafc",
                              fontWeight: 700,
                            },
                            "& .MuiDayCalendar-weekDayLabel": {
                              color: "#88a8c9",
                            },
                            "& .MuiPickersDay-root": {
                              color: "#dbe7f5",
                              borderRadius: "10px",
                            },
                            "& .MuiPickersDay-root.Mui-selected": {
                              background:
                                "linear-gradient(90deg,#3a7bd5,#4fa3ff)",
                            },
                            "& .MuiPickersArrowSwitcher-button, & .MuiSvgIcon-root":
                              {
                                color: "#7fb3ff",
                              },
                          }}
                        />
                      </LocalizationProvider>
                    </Grid>

                    <Grid item xs={12} md={7} sx={{ minWidth: 0 }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mb: 1.5,
                          ml: { md: 2 },
                        }}
                      >
                        <AccessTimeIcon
                          sx={{ color: "#7fb3ff", fontSize: 20 }}
                        />
                        <Typography sx={{ color: "#f8fafc", fontWeight: 700 }}>
                          {t("selectTime")}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          maxHeight: 390,
                          overflowY: "auto",
                          pr: 0.5,
                          ml: { md: 2 },
                          display: "flex",
                          flexDirection: "column",
                          gap: 1.2,
                          width: "100%",
                          scrollbarWidth: "none",
                          msOverflowStyle: "none",
                          "&::-webkit-scrollbar": {
                            display: "none",
                          },
                        }}
                      >
                        {!installType ? (
                          <Typography
                            sx={{ color: "#94a3b8", lineHeight: 1.8 }}
                          >
                            {t("selectEquipmentFirst")}
                          </Typography>
                        ) : loadingSlots ? (
                          <Box
                            sx={{
                              minHeight: 200,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <CircularProgress
                              size={28}
                              sx={{ color: "#7fb3ff" }}
                            />
                          </Box>
                        ) : availableSlots.length > 0 ? (
                          availableSlots.map((slot) => (
                            <Button
                              key={slot}
                              fullWidth
                              onClick={() => setSelectedTime(slot)}
                              variant={
                                selectedTime === slot ? "contained" : "outlined"
                              }
                              sx={{
                                py: 1.2,
                                borderRadius: "14px",
                                textTransform: "none",
                                fontWeight: 700,
                                justifyContent: "flex-start",
                                background:
                                  selectedTime === slot
                                    ? "linear-gradient(90deg,#3a7bd5,#4fa3ff)"
                                    : "rgba(255,255,255,0.02)",
                                color: "#fff",
                                borderColor:
                                  selectedTime === slot
                                    ? "transparent"
                                    : "rgba(255,255,255,0.12)",
                                "&:hover": {
                                  borderColor: "rgba(255,255,255,0.22)",
                                  background:
                                    selectedTime === slot
                                      ? "linear-gradient(90deg,#346ec0,#4597eb)"
                                      : "rgba(255,255,255,0.05)",
                                },
                              }}
                            >
                              {slot}
                            </Button>
                          ))
                        ) : (
                          <Typography
                            sx={{ color: "#f87171", lineHeight: 1.8 }}
                          >
                            {t("noAvailableSlots")}
                          </Typography>
                        )}
                      </Box>
                    </Grid>
                  </Grid>
                </Paper>
              </MotionBox>
            </Grid>

            <Grid item xs={12} lg={5}>
              <MotionBox
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.08 }}
                sx={{ height: "100%" }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 2.2, md: 3.2 },
                    height: "100%",
                    borderRadius: "24px",
                    background: "rgba(20, 28, 40, 0.62)",
                    backdropFilter: "blur(14px)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    boxShadow: "0 10px 40px rgba(0,0,0,0.35)",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    sx={{
                      color: "#f8fafc",
                      fontWeight: 800,
                      fontSize: "1.25rem",
                      mb: 1.5,
                    }}
                  >
                    {t("appointmentSummary")}
                  </Typography>

                  <Typography
                    sx={{
                      color: "#cbd5e1",
                      lineHeight: 1.8,
                      fontSize: "0.96rem",
                      mb: 2.5,
                    }}
                  >
                    {t("installationSummaryIntro")}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 1.5,
                      mb: 3,
                    }}
                  >
                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        borderRadius: "16px",
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      <Typography
                        sx={{ color: "#88a8c9", fontSize: ".82rem", mb: 0.6 }}
                      >
                        {t("customerName")}
                      </Typography>
                      <Typography sx={{ color: "#fff", fontWeight: 700 }}>
                        {customer.name || t("notEnteredYet")}
                      </Typography>
                    </Paper>

                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        borderRadius: "16px",
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      <Typography
                        sx={{ color: "#88a8c9", fontSize: ".82rem", mb: 0.6 }}
                      >
                        {t("phoneNumber")}
                      </Typography>
                      <Typography sx={{ color: "#fff", fontWeight: 700 }}>
                        {customer.phone || t("notEnteredYet")}
                      </Typography>
                    </Paper>

                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        borderRadius: "16px",
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      <Typography
                        sx={{ color: "#88a8c9", fontSize: ".82rem", mb: 0.6 }}
                      >
                        {t("equipmentType")}
                      </Typography>
                      <Typography sx={{ color: "#fff", fontWeight: 700 }}>
                        {installType || t("notSelectedYet")}
                      </Typography>
                    </Paper>

                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        borderRadius: "16px",
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      <Typography
                        sx={{ color: "#88a8c9", fontSize: ".82rem", mb: 0.6 }}
                      >
                        {t("date")}
                      </Typography>
                      <Typography sx={{ color: "#fff", fontWeight: 700 }}>
                        {selectedDate
                          ? selectedDate
                              .locale(language === "fr" ? "fr" : "en")
                              .format(
                                language === "fr"
                                  ? "D MMMM YYYY"
                                  : "MMMM D, YYYY",
                              )
                          : t("notSelectedYet")}
                      </Typography>
                    </Paper>

                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        borderRadius: "16px",
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      <Typography
                        sx={{ color: "#88a8c9", fontSize: ".82rem", mb: 0.6 }}
                      >
                        {t("timeSlot")}
                      </Typography>
                      <Typography sx={{ color: "#fff", fontWeight: 700 }}>
                        {selectedTime || t("notSelectedYet")}
                      </Typography>
                    </Paper>
                  </Box>

                  <Box
                    sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}
                  >
                    <Chip
                      icon={<BoltIcon />}
                      label={t("professionalSetup")}
                      sx={{
                        color: "#dbeafe",
                        background: "rgba(127,179,255,0.12)",
                        border: "1px solid rgba(127,179,255,0.18)",
                      }}
                    />
                    <Chip
                      icon={<CheckCircleIcon />}
                      label={t("highQualityService")}
                      sx={{
                        color: "#dbeafe",
                        background: "rgba(127,179,255,0.12)",
                        border: "1px solid rgba(127,179,255,0.18)",
                      }}
                    />
                  </Box>

                  <Box sx={{ mt: "auto" }}>
                    <Button
                      type="submit"
                      fullWidth
                      disabled={
                        !customer.name.trim() ||
                        !customer.phone.trim() ||
                        !customer.email.trim() ||
                        !customer.address.trim() ||
                        !installType ||
                        !selectedDate ||
                        !selectedTime ||
                        submitting
                      }
                      variant="contained"
                      sx={{
                        py: 1.4,
                        borderRadius: "14px",
                        textTransform: "none",
                        fontWeight: 800,
                        fontSize: "1rem",
                        background: "linear-gradient(90deg,#3a7bd5,#4fa3ff)",
                        boxShadow: "0 0 18px rgba(0,170,255,0.25)",
                        "&:hover": {
                          background: "linear-gradient(90deg,#346ec0,#4597eb)",
                        },
                        "&.Mui-disabled": {
                          color: "rgba(255,255,255,0.45)",
                          background: "rgba(255,255,255,0.08)",
                        },
                      }}
                    >
                      {submitting ? t("scheduling") : t("scheduleAppointment")}
                    </Button>
                  </Box>
                </Paper>
              </MotionBox>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};

export default Installation;
