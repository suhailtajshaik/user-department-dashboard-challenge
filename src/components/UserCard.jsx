import React from "react";

function UserCard({ user }) {
  return (
    <div className="user-card">
      <div className="user-avatar">
        <img src={user.avatar} alt={`${user.firstName} ${user.lastName}`} />
      </div>
      <div className="user-info">
        <h3>{user.name}</h3>
        <p className="user-username">@{user.name}</p>
        <div className="user-departments">
          {user.departments.map((dept) => (
            <span key={dept} className="department-tag">
              {dept}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserCard;
