# School Management System

A lightweight student records manager built with **React 19**, **React Router**, and **Vite**, backed by a mock REST API powered by **json-server**. It supports full CRUD (Create, Read, Update, Delete) on student records, with search/filtering on the client.

**Repo:** https://github.com/gitahidave/schoolManagementSystem

---

## Features

- **Student roster** — view all registered students in a searchable card list
- **Live search** — filter by first name, second name, admission number, email, or course
- **Register students** — add new learners via a validated form
- **Student profile** — dedicated detail view per student
- **Edit records** — update any student's details
- **Delete with confirmation** — guarded by a confirmation modal to prevent accidental deletes
- **Graceful image fallback** — auto-generates an avatar if a student's photo URL fails to load
- **Loading & error states** — every data-driven view handles loading and failure gracefully

---

## Tech Stack

| Layer            | Technology                                  |
|-------------------|----------------------------------------------|
| UI                | React 19                                     |
| Routing           | React Router DOM 6                           |
| Build tool        | Vite                                         |
| Mock backend      | json-server (serves `db.json` as a REST API) |
| Linting           | ESLint (with React Hooks / Refresh plugins)  |
| Styling           | Plain CSS (`App.css`, `index.css`)           |

> **Note:** `json-server` is a development-only mock API. There is no real backend, authentication, or persistent database — all data lives in `db.json` and resets/persists only on that local file.

---

## Project Structure

```
schoolManagementSystem/
├── db.json                  # Mock database (json-server data source)
├── index.html                # Vite entry HTML
├── vite.config.js            # Vite configuration
├── eslint.config.js          # ESLint configuration
├── package.json
├── public/
│   ├── favicon.svg
│   └── icons.svg
└── src/
    ├── main.jsx               # App bootstrap (BrowserRouter + StrictMode)
    ├── App.jsx                # Route definitions
    ├── App.css / index.css    # Global styles
    ├── api/
    │   └── students.js        # fetch/create/update/delete API calls
    ├── hooks/
    │   └── useStudents.js     # Custom hook: loads & manages student list state
    ├── components/
    │   ├── Navbar.jsx          # Top navigation
    │   ├── StudentCard.jsx     # Single student card (list item)
    │   ├── StudentsList.jsx    # Roster page: search, list, delete flow
    │   ├── AddStudentForm.jsx  # "Register Student" form
    │   └── ConfirmModal.jsx    # Reusable confirm/cancel modal
    └── pages/
        ├── HomePage.jsx        # Landing page
        ├── StudentProfile.jsx  # Single student detail view
        ├── EditStudent.jsx     # Edit form (pre-filled)
        └── NotFound.jsx        # 404 fallback
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ (recommended: latest LTS)
- npm (bundled with Node.js)

### Installation

```bash
git clone https://github.com/gitahidave/schoolManagementSystem.git
cd schoolManagementSystem
npm install
```

### Running the app

This project needs **two processes running at once**: the mock API server and the Vite dev server.

**Terminal 1 — start the mock API** (serves `db.json` at `http://localhost:5000`):

```bash
npm run server
```

**Terminal 2 — start the frontend dev server:**

```bash
npm run dev
```

Then open the URL Vite prints in the terminal (typically `http://localhost:5173`).

> The frontend expects the API at `http://localhost:5000` (hardcoded in `src/api/students.js`). If you change the json-server port, update `BASE_URL` in that file to match.

### Available Scripts

| Command           | Description                                         |
|--------------------|------------------------------------------------------|
| `npm run dev`      | Start the Vite development server with hot reload    |
| `npm run server`   | Start json-server, watching `db.json`, on port 5000   |
| `npm run build`    | Build a production bundle to `dist/`                 |
| `npm run preview`  | Preview the production build locally                 |
| `npm run lint`     | Run ESLint across the project                        |

---

## Routes

| Path                     | Page                | Description                              |
|----------------------------|----------------------|--------------------------------------------|
| `/`                        | `HomePage`            | Landing page with calls to action           |
| `/students`                | `StudentsList`        | Searchable roster of all students          |
| `/students/:id`            | `StudentProfile`      | Detail view for one student                |
| `/students/:id/edit`       | `EditStudent`         | Edit form pre-filled with existing data     |
| `/add-student`             | `AddStudentForm`      | Form to register a new student              |
| `*`                        | `NotFound`            | 404 fallback for unmatched routes           |

---

## Data Model

Each student record in `db.json` has the following shape:

```json
{
  "id": 1,
  "firstName": "Amina",
  "secondName": "Khan",
  "admissionNumber": "ADM001",
  "email": "amina.khan@example.com",
  "course": "Computer Science",
  "imageUrl": "https://..."
}
```

## API Reference (json-server, base URL `http://localhost:5000/students`)

| Method | Endpoint          | Description                     |
|--------|--------------------|-----------------------------------|
| GET    | `/students`         | List all students                |
| GET    | `/students/:id`     | Get a single student              |
| POST   | `/students`         | Create a new student              |
| PUT    | `/students/:id`     | Replace/update a student's fields |
| DELETE | `/students/:id`     | Delete a student                  |

These map directly to the helper functions exported from `src/api/students.js`:
`fetchStudents`, `fetchStudent`, `createStudent`, `updateStudent`, `deleteStudent`.

---

## Key Implementation Notes

- **`useStudents` hook** centralizes fetching, loading, and error state for the roster, exposing a `reload()` function so components (like the delete flow) can refresh data after a mutation.
- **Client-side search** in `StudentsList` filters the already-fetched list in memory (`useMemo`) rather than hitting the API — fine for small datasets, but would need server-side filtering/pagination at scale.
- **Delete confirmation** uses a shared `ConfirmModal` component, keeping the "are you sure?" UX consistent and reusable.
- **Broken image handling**: `StudentCard` falls back to a generated avatar (via `ui-avatars.com`) if `imageUrl` fails to load.

---

## Known Limitations / Ideas for Improvement

- No authentication or authorization — anyone with access to the app can add/edit/delete records.
- `json-server` is not suitable for production; a real backend (e.g., Node/Express + a database) would be needed to deploy this beyond local development.
- No client- or server-side validation beyond basic HTML `required` attributes (e.g., no duplicate admission number checks, no email format enforcement beyond `type="email"`).
- No automated tests currently included.
- `BASE_URL` is hardcoded rather than driven by an environment variable, which makes deployment to different environments harder.

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes and push
4. Open a pull request

Run `npm run lint` before submitting a PR to catch style/hook issues.

## License

No license file is currently included in the repository. Add one (e.g., MIT) if you intend for others to reuse this code.