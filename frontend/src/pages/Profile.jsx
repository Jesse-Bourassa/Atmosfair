import React from 'react';

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) return <h2>Please log in to view your profile.</h2>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Profile Page</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>
    </div>
  );
};

export default Profile;
