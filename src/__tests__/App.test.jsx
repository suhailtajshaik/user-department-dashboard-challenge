import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import App from '../App';

// Mock the fetch API
global.fetch = vi.fn();

// Mock response data
const mockUsers = [
  {
    id: 1,
    name: 'John Doe',
    avatar: 'https://example.com/avatar1.jpg',
    departments: ['Engineering', 'Product']
  },
  {
    id: 2,
    name: 'Jane Smith',
    avatar: 'https://example.com/avatar2.jpg',
    departments: ['Engineering', 'Design']
  },
  {
    id: 3,
    name: 'Bob Johnson',
    avatar: 'https://example.com/avatar3.jpg',
    departments: ['Marketing', 'Sales']
  }
];

// Mock the child components to simplify testing
vi.mock('../components/UsersList', () => ({
  default: ({ users }) => (
    <div data-testid="users-list">
      {users.map(user => (
        <div key={user.id} data-testid={`user-${user.id}`}>{user.name}</div>
      ))}
    </div>
  )
}));

vi.mock('../components/DepartmentsList', () => ({
  default: ({ departmentCount, onDepartmentSelect, selectedDepartment }) => (
    <div data-testid="departments-list">
      {Object.entries(departmentCount).map(([dept, count]) => (
        <div 
          key={dept} 
          data-testid={`dept-${dept}`}
          data-selected={selectedDepartment === dept}
          onClick={() => onDepartmentSelect(dept)}
        >
          {dept}: {count}
        </div>
      ))}
    </div>
  )
}));

describe('App Component', () => {
  beforeEach(() => {
    fetch.mockClear();
    
    // Mock successful fetch response
    fetch.mockResolvedValue({
      ok: true,
      json: async () => mockUsers
    });
  });

  // Test 1: Data Fetching
  test('fetches and displays user data correctly', async () => {
    render(<App />);
    
    // Check loading state is displayed initially
    expect(screen.getByText('Loading users...')).toBeInTheDocument();
    
    // Verify fetch was called with correct URL
    expect(fetch).toHaveBeenCalledWith('https://generate-users-svc.vercel.app/api/users/20');
    
    // Wait for data to load
    await waitFor(() => {
      expect(screen.queryByText('Loading users...')).not.toBeInTheDocument();
    });
    
    // Check that total users count is displayed
    expect(screen.getByText('Total Users:')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument(); // 3 mock users
  });

  // Test 2: Error Handling
  test('handles fetch errors correctly', async () => {
    // Mock a failed fetch
    fetch.mockRejectedValue(new Error('Network error'));
    
    render(<App />);
    
    // Wait for error to be displayed
    await waitFor(() => {
      expect(screen.getByText(/Error:/)).toBeInTheDocument();
      expect(screen.getByText(/Network error/)).toBeInTheDocument();
    });
  });

  // Test 3: Department Statistics Calculation
  test('calculates department statistics correctly', async () => {
    render(<App />);
    
    // Wait for data to load
    await waitFor(() => {
      expect(screen.queryByText('Loading users...')).not.toBeInTheDocument();
    });
    
    // Check that department counts are calculated correctly
    const departmentsList = screen.getByTestId('departments-list');
    
    // Engineering: 2 users
    expect(departmentsList).toHaveTextContent('Engineering: 2');
    
    // Product: 1 user
    expect(departmentsList).toHaveTextContent('Product: 1');
    
    // Design: 1 user
    expect(departmentsList).toHaveTextContent('Design: 1');
    
    // Marketing: 1 user
    expect(departmentsList).toHaveTextContent('Marketing: 1');
    
    // Sales: 1 user
    expect(departmentsList).toHaveTextContent('Sales: 1');
  });

  // Test 4: Department Filtering
  test('filters users by department correctly', async () => {
    render(<App />);
    
    // Wait for data to load
    await waitFor(() => {
      expect(screen.queryByText('Loading users...')).not.toBeInTheDocument();
    });
    
    // Initially all users should be displayed
    expect(screen.getAllByTestId(/user-\d+/).length).toBe(3);
    
    // Click on Engineering department to filter
    fireEvent.click(screen.getByTestId('dept-Engineering'));
    
    // Should show filter indicator
    expect(screen.getByText('Filtered by:')).toBeInTheDocument();
    expect(screen.getByText('Engineering')).toBeInTheDocument();
    
    // Should show only Engineering users (2 users)
    expect(screen.getAllByTestId(/user-\d+/).length).toBe(2);
    expect(screen.getByTestId('user-1')).toBeInTheDocument(); // John Doe
    expect(screen.getByTestId('user-2')).toBeInTheDocument(); // Jane Smith
    expect(screen.queryByTestId('user-3')).not.toBeInTheDocument(); // Bob Johnson (not in Engineering)
    
    // Should show filtered count
    expect(screen.getByText('Filtered Users:')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('(67%)')).toBeInTheDocument(); // 2/3 = 67%
  });

  // Test 5: Toggle Department Selection
  test('toggles department selection correctly', async () => {
    render(<App />);
    
    // Wait for data to load
    await waitFor(() => {
      expect(screen.queryByText('Loading users...')).not.toBeInTheDocument();
    });
    
    // Click on Engineering department to filter
    fireEvent.click(screen.getByTestId('dept-Engineering'));
    
    // Engineering should be selected
    expect(screen.getByTestId('dept-Engineering').dataset.selected).toBe('true');
    
    // Click on Engineering again to clear filter
    fireEvent.click(screen.getByTestId('dept-Engineering'));
    
    // Filter should be cleared
    expect(screen.queryByText('Filtered by:')).not.toBeInTheDocument();
    
    // All users should be displayed again
    expect(screen.getAllByTestId(/user-\d+/).length).toBe(3);
  });

  // Test 6: Clear Filter Button
  test('clear filter button works correctly', async () => {
    render(<App />);
    
    // Wait for data to load
    await waitFor(() => {
      expect(screen.queryByText('Loading users...')).not.toBeInTheDocument();
    });
    
    // Click on Marketing department to filter
    fireEvent.click(screen.getByTestId('dept-Marketing'));
    
    // Should show filter indicator
    expect(screen.getByText('Filtered by:')).toBeInTheDocument();
    
    // Click clear filter button
    fireEvent.click(screen.getByText('Clear Filter'));
    
    // Filter should be cleared
    expect(screen.queryByText('Filtered by:')).not.toBeInTheDocument();
    
    // All users should be displayed again
    expect(screen.getAllByTestId(/user-\d+/).length).toBe(3);
  });
}); 