import React, { useMemo } from "react";
import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./calendar-theme.css";

import IconButton from "@mui/material/IconButton";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";

const bgByType = {
  installation: "#1976d2",
  maintenance: "#43a047",
  repair: "#f57c00",
};

const locales = { "en-US": enUS };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 0 }),
  getDay,
  locales,
});

const toEvents = (apts) =>
  (apts ?? []).map((a) => {
    const padded = a.time?.length === 4 ? "0" + a.time : a.time;
    const start = parse(`${a.date} ${padded}`, "yyyy-MM-dd HH:mm", new Date());

    const end = new Date(start);
    if (a.type === "installation") end.setHours(18, 0, 0, 0);
    else end.setHours(start.getHours() + 3);

    return { id: a._id, start, end, title: a.type };
  });

const CustomToolbar = (props) => {
  const { onNavigate, label } = props;

  return (
    <div className="rbc-toolbar">
      <IconButton
        size="small"
        aria-label="previous"
        className="rbc-nav-btn"
        onClick={() => onNavigate("PREV")}
      >
        <ChevronLeft sx={{ color: "rgba(255,255,255,0.85)" }} />
      </IconButton>

      <button
        type="button"
        className="rbc-reset-btn"
        onClick={() => onNavigate("TODAY")}
      >
        Today
      </button>

      <IconButton
        size="small"
        aria-label="next"
        className="rbc-nav-btn"
        onClick={() => onNavigate("NEXT")}
      >
        <ChevronRight sx={{ color: "rgba(255,255,255,0.85)" }} />
      </IconButton>

      <span className="rbc-toolbar-label">{label}</span>

      <span className="rbc-btn-group">
        {["week", "month"].map((v) => (
          <button
            key={v}
            type="button"
            className={props.view === v ? "rbc-active" : ""}
            onClick={() => props.onView(v)}
          >
            {v[0].toUpperCase() + v.slice(1)}
          </button>
        ))}
      </span>
    </div>
  );
};

const CalendarScheduler = ({ appointments }) => {
  const events = useMemo(() => toEvents(appointments), [appointments]);

  return (
    <div style={{ height: "100%", width: "100%", minHeight: 0 }}>
      <Calendar
        components={{ toolbar: CustomToolbar }}
        localizer={localizer}
        events={events}
        defaultView={Views.WEEK}
        views={{ week: true, month: true }}
        step={30}
        timeslots={1}
        min={new Date(0, 0, 0, 8, 0)}
        max={new Date(0, 0, 0, 18, 0)}
        style={{ height: "100%", width: "100%" }}
        eventPropGetter={(evt) => {
          const bg = bgByType[evt.title] || "#e53935";
          return {
            style: {
              backgroundColor: bg,
              border: "none",
              borderRadius: 10,
              boxShadow: "0 6px 18px rgba(0,0,0,.35)",
              color: "#fff",
              padding: "4px 8px",
              fontWeight: 700,
              textTransform: "capitalize",
            },
          };
        }}
      />
    </div>
  );
};

export default CalendarScheduler;