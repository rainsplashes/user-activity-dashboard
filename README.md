# User Activity Dashboard

A throughly commented full‑stack example demonstrating:

- **Go** backend serving raw user data at `/api/users`.
- **React + TypeScript** frontend with **Material‑UI** to fetch, compute, filter, and display that data.

---

## 🚀 Prerequisites

- **Go** ≥1.20
- **Node.js** ≥14 (includes npm)

---

## 🏗 Setup & Local Run

### 1. Clone repository

```bash
git clone https://github.com/rainsplashes/user-activity-dashboard.git
cd user‑activity-dashboard
```

### 2. Run Backend (Go)

```bash
cd user-table-backend
# If first time, initialize modules
go mod tidy
# Start server on port 8080
go run main.go
```

- Backend server now running at http://localhost:8080

### 3. Run Frontend (React)

```bash
cd ../user-table-frontend
# Install dependencies
npm install
# Start dev server on port 3000
npm start
```

- Web Server now running at http://localhost:3000
- Proxy: `package.json` forwards `/api` to backend

---

## 🔧 Testing

### Go Handler Tests

```bash
cd user-table-backend
go test -v
```

## 💡 Design Notes & Trade‑offs

- **Client‑side live computation**: `daysSince*` calculated in client to simplify server logic and we want to display data in relation to client time, not server time.
- **Hard‑coded data**: Go server uses hard-coded user data, which should be swapped to a proper database in a real application.
- **TypeScript**: Ensures type safety in frontend webpage.
- **Material‑UI**: Provides nice looking and responsive UI components.
