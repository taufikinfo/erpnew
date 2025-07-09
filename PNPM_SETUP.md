# ERP Development Setup with pnpm

## Quick Start Commands

### Complete Setup (Recommended)
```bash
# Single command startup (choose one):
./start.bat          # Windows batch script
./start.ps1          # PowerShell script  
node start.js        # Node.js script
pnpm start:dev       # Single terminal with concurrently
```

### Individual Components
```bash
./setup_backend.bat  # Backend only
./start_frontend.bat # Frontend only
```

## Available pnpm Scripts

```bash
# Development
pnpm dev                 # Start frontend dev server
pnpm backend            # Start backend server
pnpm start:full         # Start both backend and frontend

# Build & Deploy
pnpm build              # Build for production
pnpm build:dev          # Build for development
pnpm preview            # Preview production build

# Maintenance
pnpm setup              # Install all dependencies
pnpm clean              # Clean all generated files
pnpm lint               # Run ESLint
```

## Development Workflow

1. **First time setup:**
   ```bash
   ./start_complete.bat
   ```

2. **Daily development:**
   ```bash
   # Terminal 1: Backend
   cd backend && python run.py
   
   # Terminal 2: Frontend  
   pnpm dev
   ```

3. **Quick frontend-only development:**
   ```bash
   ./start_frontend.bat
   ```

## Package Management Benefits

### Why pnpm?
- **Faster installs** - Uses hard links and symlinks
- **Disk space efficient** - Shared package store
- **Strict dependency resolution** - Prevents phantom dependencies
- **Monorepo friendly** - Better workspace support

### Migration from npm
If you have `node_modules` from npm:
```bash
rm -rf node_modules package-lock.json
pnpm install
```

## Project Structure
```
erpnew/
├── backend/           # FastAPI backend
│   ├── app/          # Application code
│   ├── venv/         # Python virtual environment
│   └── requirements.txt
├── src/              # React frontend
├── package.json      # Frontend dependencies
├── pnpm-lock.yaml   # pnpm lockfile
└── *.bat            # Setup scripts
```

## Troubleshooting

### pnpm not found
```bash
npm install -g pnpm
```

### Package conflicts
```bash
pnpm clean
pnpm install
```

### Backend issues
```bash
cd backend
pip install -r requirements.txt
python seed_data.py
```

## Performance Tips

1. **Use pnpm workspaces** for monorepo setups
2. **Enable shamefully-hoist** if needed for compatibility
3. **Use .npmrc** for custom configurations

## VS Code Integration

Add to `.vscode/settings.json`:
```json
{
  "npm.packageManager": "pnpm",
  "typescript.preferences.npmManager": "pnpm"
}
```
