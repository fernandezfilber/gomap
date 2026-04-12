# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Forward Vision** is a GIS web application for fiber optic network management. It provides tools for planning, visualizing, and managing fiber infrastructure including poles, trunks, mufas, distribution boxes, and customer connections.

## Architecture

### Full-Stack Structure

```
forward-vision/
├── backend/          # Node.js + Express API
│   ├── src/
│   │   ├── controllers/    # Business logic (auth, clientes, postes, mufas, etc.)
│   │   ├── routes/         # API route definitions
│   │   ├── Middleware/     # JWT auth, tenant validation
│   │   ├── config/db.js    # Prisma client initialization
│   │   ├── app.js          # Express app configuration
│   │   ├── server.js       # Server initialization
│   │   └── start.js        # Entry point (loads env vars first)
│   └── prisma/
│       └── schema.prisma   # Database schema (MySQL)
├── frontend/         # React + Vite SPA
│   ├── src/
│   │   ├── pages/          # Route pages (Login, Dashboard, Empresa, etc.)
│   │   ├── components/     # React components (forms, map, layout)
│   │   ├── hooks/          # Custom React hooks (useAuth, useProyectos, etc.)
│   │   ├── context/        # React context providers
│   │   ├── api/            # Axios API client (fvApi.js)
│   │   └── routes/         # React Router configuration
│   └── dist/               # Build output (served in production)
└── docker-compose.yml      # Orchestrates Redis, backend, frontend
```

### Domain Model

The application manages fiber optic infrastructure with these key entities:

- **Empresa**: Multi-tenant organization (tenant isolation)
- **Usuario**: Users with roles (ADMIN, TECNICO, VIEWER)
- **Proyecto**: A fiber deployment project
- **Poste**: Geographic poles (lat/long) that support infrastructure
- **Troncal**: Main fiber trunk lines (96 fibers by default)
- **Mufa**: Splice closures attached to poles, splitting trunk fibers
- **Caja**: Distribution boxes attached to poles, receiving split fibers
- **TramoCable**: Cable segments connecting poles/mufas/cajas with GeoJSON paths
- **Cliente**: End customers connected to cajas

All geographic entities store coordinates (latitud/longitud) and render on an interactive Leaflet map.

### Authentication Flow

1. JWT-based auth stored in localStorage
2. `verifyToken` middleware validates Bearer tokens
3. `checkTenant` middleware ensures empresa isolation
4. User context available via `req.user` (id, rol, empresaId, nombre, email)

## Common Commands

### Backend (Node.js)

```bash
cd backend

# Install dependencies
npm install

# Development (with hot reload via nodemon)
npm run dev

# Production start
npm start

# Prisma commands (after schema changes)
npx prisma generate        # Regenerate client
npx prisma db push         # Push schema changes to DB
npx prisma studio          # Open Prisma Studio GUI
```

### Frontend (React + Vite)

```bash
cd frontend

# Install dependencies
npm install

# Development server (port 5173)
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Linting
npm run lint
```

### Docker (Full Stack)

```bash
# Start all services (Redis, backend, frontend)
docker-compose up -d

# Rebuild after changes
docker-compose up -d --build

# Stop all
docker-compose down

# View logs
docker-compose logs -f backend
docker-compose logs -f frontend
```

## Key Configuration

### Environment Variables

Backend (`backend/.env`):
- `DATABASE_URL`: MySQL connection string
- `PORT`: Backend server port (default 5000)
- `JWT_SECRET`: Secret for JWT signing
- `SMARTOLT_API_KEY` / `SMARTOLT_DOMAIN`: External OLT integration

Frontend (`frontend/.env`):
- `VITE_API_URL`: Backend API URL
- `VITE_GOOGLE_MAPS_API_KEY`: Google Maps integration

### API Client

The frontend uses `fvApi` (axios instance) from `frontend/src/api/fvApi.js`:
- Automatically injects Bearer token from localStorage
- Configured baseURL via `VITE_API_URL`
- Global error handling via `handleGlobalError`

## Code Patterns

### Backend Controllers

Controllers follow a standard pattern:
- Import `{ prisma }` from `../config/db`
- Use `async/await` with try/catch blocks
- Return JSON with `{ success: true/false, data: ..., message: ... }`
- Validate empresaId from `req.user` for tenant isolation

Example:
```javascript
const { prisma } = require('../config/db');

const getAll = async (req, res) => {
    try {
        const items = await prisma.entidad.findMany({
            where: { empresaId: req.user.empresaId }
        });
        res.json({ success: true, data: items });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
```

### Frontend Hooks

Custom hooks wrap API calls and manage state:
- Located in `frontend/src/hooks/`
- Follow pattern: `useEntidades.js` with CRUD functions
- Use `fvApi` for HTTP requests
- Handle loading states and errors

### Map Components

The main map is `MapaPrincipal.jsx` using React Leaflet:
- Renders Poste, Mufa, and Caja markers
- Polylines for TramoCable paths
- Uses `NetworkContext` for shared map state

## Deployment Notes

- Production builds are Docker-based
- Backend serves API on port 5000
- Frontend serves static files on port 80
- CORS configured for production domain (`demostracion.toq.life`)
- Redis caches map data to reduce database load
