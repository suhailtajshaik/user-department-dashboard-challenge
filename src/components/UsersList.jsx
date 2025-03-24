import React from 'react';
import UserCard from './UserCard';

function UsersList({ users }) {
  return (
    <div className="users-section">
      <h2>Users</h2>
      <div className="users-grid">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}

export default UsersList; 