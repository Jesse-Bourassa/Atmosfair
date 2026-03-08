# Copilot / AI Agent Instructions for Atmo

Summary
- Monorepo with two primary services: `backend/` (Express + MongoDB) and `frontend/` (React + Vite + MUI).
- Backend exposes REST endpoints under `/api/*` (see `backend/server.js`).
- Frontend uses `src/lib/api.js` helper and `VITE_API_URL` to build API URLs.

Quick dev commands
- Frontend (dev server): `npm run dev` in `frontend/` (runs Vite). See `frontend/package.json`.
- Backend (dev server): `npm run dev` in `backend/` (runs `nodemon server.js`). See `backend/package.json`.
- Full-stack: project contains `docker-compose.yml` for containerized runs—inspect it when adding infra changes.

Auth & API patterns (important)
- Token-based auth: frontend stores JWT in `localStorage` under the key `token` and sends it as `Authorization: Bearer <token>` to protected endpoints. Example: `fetch(apiUrl('/api/users/customers'), { headers: { Authorization: `Bearer ${token}` } })` (see `src/pages/Admin/Dashboard.jsx`).
- API routes wired in `backend/server.js`: `/api/auth`, `/api/users`, `/api/schedule` (see `backend/routes/`).
- `src/lib/api.js` centralizes API base URL logic; use `apiUrl(path)` for all client requests.

Data shapes & UI conventions
- Appointments: objects returned by `/api/schedule` include `date` and `time`. The frontend normalizes `time` strings (pads to 5 chars) before use (`Dashboard.jsx`).
- Customers: user objects use `_id`. The UI often augments server objects (e.g., `visible: true`) rather than mutating server models.
- Admin UI components live under `src/pages/Admin/` (Dashboard, CalendarScheduler, Appointments, Customer). Calendar uses `react-big-calendar` and MUI components.

Styling and patterns
- UI uses MUI v5 and emotion. Shared component-level styling often uses `sx` objects defined inline (example: `cardSx` in `Dashboard.jsx`).
- Prefer passing processed data down the tree (props) from pages rather than deep-fetching inside small components.

What to watch for when editing
- Do not change the API paths or JWT key without updating both front and back. The token key (`token`) and `apiUrl()` usage are coupled across the repo.
- Backend expects `process.env.MONGO_URI` in environment; dev uses `backend/env` file (review `server.js`).
- When adding new routes, register them in `backend/server.js` and add corresponding client calls using `apiUrl()`.

Examples (copy-paste)
- Build a client request with token:

  const token = localStorage.getItem('token');
  const res = await fetch(apiUrl('/api/schedule'), { headers: { Authorization: `Bearer ${token}` } });

- Normalize incoming appointment time (pattern used in Dashboard):

  item.time = item.time?.length === 7 ? `0${item.time}` : item.time;

Where to look first
- `backend/server.js` — route registration and app bootstrapping.
- `backend/routes/` and `backend/models/` — domain logic and DB models.
- `frontend/src/lib/api.js` — API base URL and helper.
- `frontend/src/pages/Admin/Dashboard.jsx` — example of auth check, data fetching, normalization, and component composition.

If something is unclear
- Tell me which file or flow you want clarified (auth, schedule, or customer flows) and I will expand examples or annotate code.

— End
