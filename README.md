# User Activity Dashboard

A full‑stack example demonstrating:

- **Go** backend serving raw user data at `/api/users`.
- **React + TypeScript** frontend with **Material‑UI** to fetch, compute, filter, and display that data.

---

## 📂 Repository Structure

```
/ (root)
│
├── api/                     # Go backend
│   ├── main.go              # HTTP handler and server
│   ├── main_test.go         # Go unit tests for handler
│   └── go.mod               # Go module file
│
└── frontend/                # React + TS frontend
    ├── package.json         # npm manifest & proxy
    ├── tsconfig.json        # TypeScript config
    ├── public/              # Static assets
    └── src/                 # Application code
        ├── index.tsx
        ├── App.tsx
        └── components/
            └── UsersTable.tsx
```

> **Exclude**: `node_modules/`, `frontend/build/`, Go binaries, IDE configs.

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

- Open: http://localhost:8080/api/users
- Returns: JSON array of raw user records

### 3. Run Frontend (React)

```bash
cd ../user-table-frontend
# Install dependencies
npm install
# Start dev server on port 3000
npm start
```

- Open: http://localhost:3000
- Proxy: `package.json` forwards `/api` to backend

---

## 🔧 Testing

### Go Handler Tests

```bash
cd user-table-backend
go test -v
```

## 💡 Design Notes & Trade‑offs

- **Client‑side live computation**: `daysSince*` calculated in client to simplfy server logic and we want to display data in relation to client time, not server time.
- **Hard‑coded data**: Go server uses hard-coded user data, which should be swapped to a proper database in a real application.
- **TypeScript**: Ensures type safety in frontend webpage.
- **Material‑UI**: Provides nice looking and responsive UI components.
