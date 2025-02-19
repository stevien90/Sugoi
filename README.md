# Workout Tracker - React/Node Project

This project is a **Workout Tracker** designed to help users log their fitness routines and track their progress. The goal of the app is to allow users to **login**, create **workout routines**, and log their **sets** and **reps** along with the **weights** used for each exercise. Users can track their progress as they complete their routines, and the logs are stored in a PostgreSQL database.

The project is built with **React** for the frontend, **Node.js** with **Express** for the backend, and **PostgreSQL** as the database.

## Features

- **User Authentication**: Users can **register** and **login** to access their personal workout routines.
- **Workout Routines**: Users can create workout routines with custom names for each workout and specify the **sets** and **reps**.
- **Logging Workouts**: Users can log their **sets**, **reps**, and **weights** for each workout in their routine.
- **Progress Tracking** (Coming Soon): The ability to track the progress of workouts and routines is in progress.

## Tech Stack

- **Frontend**: React, Material-UI, Bootstrap
- **Backend**: Node.js, Express
- **Database**: PostgreSQL
- **Authentication**: Session-based authentication with Express-Session
- **Architecture**: MVC (Model-View-Controller) structure

## Project Structure

### Backend (`server` folder)
- **Express** for routing and API handling
- **Model**: Defines the structure of data in PostgreSQL (including User, Routine, Workout, Log models)
- **Controller**: Contains business logic to handle API requests (authentication, workout creation, logging, etc.)
- **Router**: Manages API route handling
- **Database**: PostgreSQL for storing user information, routines, workouts, and logs
- **Session-based Authentication**: Uses `express-session` for managing user login sessions
- **Password Hashing**: Uses `bcrypt` to securely hash passwords

### Frontend (`client` folder)
- **React**: A component-based architecture for building the user interface
- **Material-UI** and **Bootstrap** for styling and responsive design
- **React Router** for managing navigation between login, registration, and workout pages
- **API calls** to interact with the backend (for authentication, creating routines, logging workouts, etc.)

## Getting Started

### Prerequisites
Before running the project, make sure you have the following installed:
- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **PostgreSQL**

### Setup Backend (Server)
1. Navigate to the `server` directory:
   ```bash
   cd server

2. Install backend dependencies:
npm install

3. Create a .env file in the server folder and add your PostgreSQL connection details:
DB_HOST=localhost
DB_USER=yourusername
DB_PASSWORD=yourpassword
DB_NAME=yourdbname
SESSION_SECRET=yoursecretkey
Set up the database by running any necessary migrations or seed scripts to create the required tables (Users, Routines, Workouts, Logs).

4. Start the backend server:
npm start

### Setup Frontend (Client)
1. Navigate to the clietn directory:
cd client

2. Install frontend dependencies:
npm install

3. Start the frontend development server:
npm start

### Connecting Backend and Frontend
The frontend React app will interact with the backend API to manage user authentication, workout creation, and logging:

Login & Register: When users register or log in, the frontend sends a POST request to /api/auth/register or /api/auth/login, and the server uses sessions to track user login state.

Create Routine & Workouts: Users can create and manage their workout routines and workouts by making POST requests to the backend (e.g., /api/routines, /api/workouts).

Log Sets, Reps, and Weights: After creating a routine, users can log their progress by sending data (sets, reps, weights) to the backend via a POST request to /api/logs.

### Session Management
Since this project uses session-based authentication:

When users log in, the server creates a session for them.
The session is stored on the server and a session cookie is sent to the user's browser, which is used for maintaining the login state across requests,

### Contributing
If you'd like to contribute to this project:

Fork the repository
Create your feature branch (git checkout -b feature-name)
Commit your changes (git commit -m 'Add feature')
Push to the branch (git push origin feature-name)
Open a Pull Request

### License
This project is open-source and available under the MIT License.

### Notes
The project is a work-in-progress and currently supports user authentication, routine creation, workout logging, and user progress tracking.
The progress tracker feature is in development and will be released soon.
Future improvements will include better UI, progress graphs, and more advanced features such as workout history and workout recommendations.

