import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { CircularProgress } from '@mui/material';

const Profile = () => {
  const user = JSON.parse(localStorage.getItem('user'));   // { _id, name, ... }
  const [appts, setAppts]         = useState([]);
  const [loading, setLoading]     = useState(true);

  /* ─── guard if not logged‑in ─── */
  if (!user) return <h2>Please log in to view your profile.</h2>;

  /* ─── fetch this user’s appointments ─── */
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res  = await fetch(
          `http://localhost:5001/api/schedule?userId=${user._id}`
        );
        const data = await res.json();
        if (res.ok) setAppts(data);
        else        console.error(data.message || 'Failed to fetch');
      } catch (err) {
        console.error('Error fetching appointments', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, [user._id]);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Profile Page</h2>

      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Main Phone:</strong> {user.mainPhone}</p>
      <p><strong>Telephone:</strong> {user.telephone}</p>
      <p><strong>Address:</strong> {user.address}</p>
      <p><strong>Role:</strong> {user.role}</p>

      <hr style={{ margin: '2rem 0' }} />

      <h3>Your Appointments</h3>

      {loading ? (
        <CircularProgress />
      ) : appts.length === 0 ? (
        <p>You don’t have any upcoming appointments.</p>
      ) : (
        <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
          {appts.map(a => (
            <li key={a._id}
                style={{
                  marginBottom: '1rem',
                  padding: '0.75rem 1rem',
                  background: '#2c2c2c',
                  borderRadius: 6,
                  color: '#e6e8ef'
                }}>
              <strong>{a.type.charAt(0).toUpperCase() + a.type.slice(1)}</strong><br />
              {dayjs(a.date).format('MMM D, YYYY')} &nbsp;|&nbsp; {a.time}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Profile;
