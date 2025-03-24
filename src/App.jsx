// App.jsx
import React, { useEffect, useState } from 'react';
import './App.css';
import UsersList from './components/UsersList';
import DepartmentsList from './components/DepartmentsList';

function App() {
  // State for users, department counts, loading, and error handling.
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [departmentCount, setDepartmentCount] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  // TODO: Step 1 - Implement data fetching from the API
  // Fetch users data from the API on component mount using async/await.
  useEffect(() => {
    // Implement fetchUsers function to:
    // 1. Fetch data from 'https://generate-users-svc.vercel.app/api/users/20'
    // 2. Handle loading state
    // 3. Handle errors properly
    // 4. Set the users data in state
    // 5. Call calculateDepartmentStats with the fetched data

    // TODO: Implement fetchUsers function here

    // TODO: Step 2 - Implement department statistics calculation
    // Function to calculate department statistics
    const calculateDepartmentStats = (userData) => {
      // Implement a function that:
      // 1. Counts users per department
      // 2. Updates the departmentCount state
      
      // TODO: Implement department counting logic here
    };

    // Call fetchUsers to start the data loading process
    // TODO: Call the fetchUsers function
  }, []);

  // TODO: Step 3 - Implement department selection for filtering
  const handleDepartmentSelect = (department) => {
    // Implement a function that:
    // 1. Toggles selection when clicking the same department
    // 2. Filters users by the selected department
    // 3. Updates the filteredUsers state
    // 4. Updates the selectedDepartment state
    
    // TODO: Implement department selection logic here
  };

  // Render the UI
  if (loading) {
    return <div className="loading-container">Loading users...</div>;
  }

  if (error) {
    return <div className="error-container">Error: {error}</div>;
  }

  return (
    <div className="app-container">
      <h1 className="app-title">User Department Dashboard</h1>
      
      <div className="dashboard-stats">
        <div className="user-count-display">
          <span className="stat-label">Total Users:</span>
          <span className="stat-value">{users.length}</span>
          
          {selectedDepartment && (
            <>
              <span className="stat-divider">•</span>
              <span className="stat-label">Filtered Users:</span>
              <span className="stat-value">{filteredUsers.length}</span>
              <span className="stat-percentage">
                ({Math.round((filteredUsers.length / users.length) * 100)}%)
              </span>
            </>
          )}
        </div>
      </div>
      
      {selectedDepartment && (
        <div className="filter-indicator">
          <span>Filtered by: </span>
          <span className="filter-tag">{selectedDepartment}</span>
          <button 
            className="clear-filter-btn" 
            onClick={() => handleDepartmentSelect(selectedDepartment)}
          >
            Clear Filter
          </button>
        </div>
      )}
      
      <div className="content-container">
        <UsersList users={filteredUsers} />
        <DepartmentsList 
          departmentCount={departmentCount} 
          onDepartmentSelect={handleDepartmentSelect}
          selectedDepartment={selectedDepartment}
        />
      </div>
    </div>
  );
}

export default App;
