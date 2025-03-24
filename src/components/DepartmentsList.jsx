import React from 'react';

function DepartmentsList({ departmentCount, onDepartmentSelect, selectedDepartment }) {
  return (
    <div className="departments-section">
      <h2>Department Counts</h2>
      <p className="department-instruction">Click on a department to filter users</p>
      <ul className="department-list">
        {Object.entries(departmentCount)
          .sort((a, b) => b[1] - a[1]) // Sort by count in descending order
          .map(([dept, count]) => (
            <li 
              key={dept} 
              className={`department-item ${selectedDepartment === dept ? 'selected' : ''}`}
              onClick={() => onDepartmentSelect(dept)}
            >
              <span className="department-name">{dept}</span>
              <span className="department-count">{count}</span>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default DepartmentsList; 