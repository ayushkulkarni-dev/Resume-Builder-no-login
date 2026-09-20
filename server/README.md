# Resume Builder — Server

Backend service for the **Resume Builder** web application, built with the MERN stack (MongoDB, Express, React, Node.js). This is a shared, open-access app — no login or authentication required.

## Features

- REST API for creating, updating, and deleting resumes
- Stores resume data (personal info, education, experience, skills, projects) in MongoDB
- No authentication layer — fully open access, no user accounts
- CORS-enabled for frontend communication

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Environment Config:** dotenv

## Project Structure

```
server/
├── config/          # Database connection setup
├── models/          # Mongoose schemas (Resume model, etc.)
├── routes/          # API route definitions
├── controllers/     # Route handler logic
├── middleware/       # Error handling, request validation
├── .env              # Environment variables (not committed)
├── server.js         # Entry point
└── package.json
```

## Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB (local instance or MongoDB Atlas connection string)

### Installation

```bash
cd server
npm install
```

### Environment Variables

Create a `.env` file in the `server/` root:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

### Run the Server

```bash
# Development (with nodemon)
npm run dev

# Production
npm start
```

Server runs on `http://localhost:5000` by default.

## API Endpoints

| Method | Endpoint             | Description             |
|--------|-----------------------|--------------------------|
| GET    | `/api/resumes`         | Get all resumes         |
| GET    | `/api/resumes/:id`     | Get a single resume     |
| POST   | `/api/resumes`         | Create a new resume     |
| PUT    | `/api/resumes/:id`     | Update a resume         |
| DELETE | `/api/resumes/:id`     | Delete a resume         |

*(Update this table to match your actual route names/params.)*

## Notes

- No JWT/OAuth — authentication was intentionally removed to make this a public, shared tool.
- Make sure MongoDB is running/accessible before starting the server.

## License

This project is for personal/portfolio use.
