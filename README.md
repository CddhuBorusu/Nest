# Nest Task/Posts API

Task/Blog Post management REST API built with NestJS, TypeORM (SQLite), and JWT authentication.

## Features

- JWT auth with register and login
- CRUD for posts (`create`, `findAll`, `findOne`, `update`, `remove`)
- Protected endpoints via `Bearer` token
- TypeORM with SQLite and auto entity sync (dev only)

## Getting Started

1. Install dependencies:

   npm install

2. Configure environment:

   - Copy `.env.example` to `.env` and adjust values.
   - Defaults: `DB_PATH=data/db.sqlite`, `JWT_SECRET=change_me`, `PORT=3000`.

3. Run the app (dev):

   npm run start:dev

## API

### Auth

- POST `/auth/register`
  - Body: `{ "username": string, "password": string }`
  - Creates a new user

- POST `/auth/login`
  - Body: `{ "username": string, "password": string }`
  - Response: `{ "access_token": string }`

Include `Authorization: Bearer <token>` for all routes below.

### Posts

- POST `/posts`
  - Body: `{ "title": string, "content": string, "status?": "draft"|"published" }`

- GET `/posts`

- GET `/posts/:id`

- PATCH `/posts/:id`
  - Body: Any subset of create fields

- DELETE `/posts/:id`

## Notes

- `synchronize: true` is enabled for convenience. Disable in production and use migrations.
- Passwords are hashed with `bcryptjs`.

## Frontend (Next.js)

A simple Next.js frontend is included under `frontend/` to interact with this API.

- Dev server runs on port 3001
- Configure API URL via `NEXT_PUBLIC_API_URL` (default `http://localhost:3000`)

### Run Frontend

1. In a new terminal:

   cd frontend
   
   npm install
   
   cp .env.local.example .env.local
   
   npm run dev

2. Open `http://localhost:3001`.

3. Register, login, and manage posts.

Backend CORS is enabled for `http://localhost:3001` by default. Adjust `CORS_ORIGIN` if needed.
