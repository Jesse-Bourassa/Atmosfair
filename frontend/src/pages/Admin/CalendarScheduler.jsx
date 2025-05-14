import React, { useMemo } from 'react';
import {
  Calendar,
  dateFnsLocalizer,
  Views
} from 'react-big-calendar';
import {
  format,
  parse,
  startOfWeek,
  getDay
} from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import "./calendar-theme.css";     //  ← add this line
import IconButton from '@mui/material/IconButton';
import ChevronLeft  from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';

const bgByType = {
  installation : '#1976d2',   // blue
  maintenance  : '#43a047',   // green
  repair       : '#f57c00'    // orange
};


/* ---------- localizer ---------- */
const locales = { 'en-US': enUS };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 0 }),
  getDay,
  locales
});

/* ---------- transform DB → events ---------- */
const toEvents = (apts) =>
  apts.map((a) => {
    const padded = a.time.length === 4 ? '0' + a.time : a.time;      // “9:30” → “09:30”
    const start  = parse(`${a.date} ${padded}`, 'yyyy-MM-dd HH:mm', new Date());

    const end = new Date(start);
    if (a.type === 'installation') end.setHours(18, 0, 0, 0);
    else                           end.setHours(start.getHours() + 3);

    return { id: a._id, start, end, title: a.type };
  });

const CustomToolbar = (props) => {
    const { onNavigate, label } = props;
  
    return (
      <div className="rbc-toolbar">
        {/* left arrow */}
        <IconButton
          size="small"
          aria-label="previous week"
          className="rbc-nav-btn"    
          onClick={() => onNavigate('PREV')}
        >
          <ChevronLeft sx={{ color: '#e6e8ef' }} />
        </IconButton>
  
        {/* Reset (today) */}
        <button
          type="button"
          className="rbc-reset-btn"
          onClick={() => onNavigate('TODAY')}
        >
          Reset
        </button>
  
        {/* right arrow */}
        <IconButton
          size="small"
          aria-label="next week"
          className="rbc-nav-btn" 
          onClick={() => onNavigate('NEXT')}
        >
          <ChevronRight sx={{ color: '#e6e8ef' }} />
        </IconButton>
  
        {/* centred date range */}
        <span className="rbc-toolbar-label">{label}</span>
  
        {/* view switch – week / month */}
        <span className="rbc-btn-group">
          {['week', 'month'].map((v) => (
            <button
              key={v}
              type="button"
              className={props.view === v ? 'rbc-active' : ''}
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
    <div className="scheduler-card" style={{ marginBottom: 24 }}>
      

      <Calendar
        components={{ toolbar: CustomToolbar }}   
        localizer={localizer}
        events={events}
        defaultView={Views.WEEK}
        views={{ week: true, month:true }}
        step={30}
        timeslots={1}
        min={new Date(0, 0, 0, 8, 0)}
        max={new Date(0, 0, 0, 18, 0)}
        style={{ height: 1000 }}
        eventPropGetter={(evt) => {
          const bg = bgByType[evt.title] || '#e53935';
          return{
          style: {
            backgroundColor: bg,
            border: 'none',
            borderRadius: 6,
            boxShadow: '0 1px 4px rgba(0,0,0,.3)'
          }
        };
        }}
      />
    </div>
  );
};

export default CalendarScheduler;
