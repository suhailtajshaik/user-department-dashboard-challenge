# User Department Dashboard - Coding Challenge

## Overview

This is a React coding challenge to assess your ability to implement core functionality in a user department dashboard application. You'll be working with an incomplete codebase and need to implement three key features.

## Challenge Requirements

You are given a partially implemented React application that displays users and their department affiliations. Your task is to complete the following three steps:

### Step 1: Data Fetching in React
- Implement the data fetching functionality in `App.jsx`
- Fetch user data from the API endpoint: `https://generate-users-svc.vercel.app/api/users/20`
- Handle loading states and error conditions properly
- Update the application state with the fetched data

### Step 2: Data Processing and State Management
- Implement the `calculateDepartmentStats` function
- Count the number of users in each department
- Update the department count state with this information
- Consider performance implications when processing the data

### Step 3: Implementing Filtering Functionality
- Implement the `handleDepartmentSelect` function
- Add toggle behavior for selecting/deselecting departments
- Filter the user list based on the selected department
- Update the UI to reflect the current filter state

## Evaluation Criteria

Your solution will be evaluated based on:

1. **Correctness**: Does your implementation work as expected?
2. **Code Quality**: Is your code clean, well-structured, and maintainable?
3. **React Best Practices**: Do you follow React patterns and best practices?
4. **Error Handling**: How well do you handle edge cases and errors?
5. **Performance Considerations**: Have you considered performance in your implementation?

## Getting Started

1. Clone the repository
2. Install dependencies with `npm install`
3. Start the development server with `npm run dev`
4. Open your browser to `http://localhost:5173`
5. Look for the `TODO` comments in `src/App.jsx` to find where you need to implement functionality

## Technology Stack

- React 19
- Vite 6.2
- Modern JavaScript (ES6+)

## Submission

When you've completed the challenge, please:
1. Make sure all three features are implemented
2. Ensure the code runs without errors
3. Be prepared to explain your implementation decisions

Good luck!

## Features

- Display users with their profile information and department affiliations
- Interactive department filtering
- Responsive design that works on all device sizes
- Real-time statistics showing filtered vs. total users
- Modern UI with smooth animations and transitions

## Technology Stack

- React 19
- Vite 6.2
- ESLint 9 with modern configuration
- CSS3 with responsive design principles

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository
   ```
   git clone https://github.com/suhailtajshaik/user-department-dashboard-challenge.git
   cd user-department-dashboard-challenge
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Start the development server
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the app for production
- `npm run lint` - Run ESLint to check code quality
- `npm run preview` - Preview the production build locally

## Project Structure

```
user-department-dashboard-challenge/
├── public/
├── src/
│ ├── components/
│ │ ├── DepartmentsList.jsx
│ │ ├── UserCard.jsx
│ │ └── UsersList.jsx
│ ├── App.css
│ ├── App.jsx
│ ├── index.css
│ └── main.jsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── README.md
└── vite.config.js
```

## API Integration

The application fetches user data from the `generate-users-svc.vercel.app` API, which provides randomly generated user profiles with department affiliations.

## License

[MIT](LICENSE)

