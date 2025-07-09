# ERP System - FastAPI + React + MySQL

A comprehensive Enterprise Resource Planning (ERP) system built with modern web technologies.

## 🚀 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components
- **React Query** for data fetching
- **React Router** for navigation

### Backend
- **FastAPI** (Python) for REST API
- **SQLAlchemy** for ORM
- **MySQL** for database
- **JWT** for authentication
- **Pydantic** for data validation

## 📋 Features

- **Authentication & Authorization** - JWT-based auth with role management
- **Dashboard** - Real-time analytics and KPIs
- **Finance Management** - Transactions, invoices, and expense tracking
- **Human Resources** - Employee management and leave requests
- **Inventory Management** - Stock tracking and management
- **Sales Management** - Customer and order management
- **Project Management** - Task and project tracking
- **Chat System** - Real-time team communication
- **User Management** - Admin controls and user profiles
- **System Settings** - Configurable application settings

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ and pnpm
- Python 3.8+
- MySQL 8.0+

### Frontend Setup
```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### Backend Setup
```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Set up database
# Create MySQL database named 'erpnew'
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS erpnew;"

# Run database migrations (create tables)
python -c "from app.core.database import engine; from app.models import Base; Base.metadata.create_all(bind=engine)"

# Seed the database with sample data
python seed_data.py

# Start the server
python run_server.py
```

## 🚦 Quick Start

1. **Start the backend server:**
   ```bash
   cd backend
   python run_server.py
   ```
   Backend will be available at `http://localhost:8000`

2. **Start the frontend development server:**
   ```bash
   pnpm dev
   ```
   Frontend will be available at `http://localhost:8080`

3. **Login with test credentials:**
   - Email: `admin@example.com`
   - Password: `password123`

## 📁 Project Structure

```
erpnew/
├── backend/                 # FastAPI backend
│   ├── app/
│   │   ├── api/            # API routes
│   │   ├── core/           # Core functionality (auth, config, database)
│   │   ├── models/         # SQLAlchemy models
│   │   └── schemas/        # Pydantic schemas
│   ├── seed_data.py        # Database seeding script
│   └── run_server.py       # Server startup script
├── src/                    # React frontend
│   ├── components/         # Reusable UI components
│   ├── pages/             # Page components
│   ├── hooks/             # Custom React hooks
│   ├── contexts/          # React contexts
│   └── lib/               # Utility functions
├── public/                # Static assets
└── docs/                  # Documentation
```

## 🔧 Configuration

### Backend Configuration
- Database settings in `backend/app/core/config.py`
- JWT secret and expiration settings
- CORS configuration in `backend/app/main.py`

### Frontend Configuration  
- API base URL in `src/lib/api-client.ts`
- Tailwind CSS configuration in `tailwind.config.ts`
- Vite configuration in `vite.config.ts`

## 🔐 API Documentation

When the backend server is running, visit:
- **Swagger UI:** `http://localhost:8000/docs`
- **ReDoc:** `http://localhost:8000/redoc`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support or questions, please create an issue in the GitHub repository.

---

**Note:** This project was migrated from Supabase to a custom FastAPI + MySQL stack for better control and scalability.

# Step 6: Seed the database
python seed_data.py

# Step 7: Start both the backend and frontend (in separate terminals)
# Terminal 1 (backend):
cd backend
source venv/bin/activate  # On Windows: venv\Scripts\activate
python -m uvicorn app.main:app --reload --port 8000

# Terminal 2 (frontend):
cd <YOUR_PROJECT_ROOT>
pnpm run dev  # or npm run dev
```

# Or use the provided start script
# On Windows, just run start.bat

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

### Frontend
- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- TanStack Query (React Query)

### Backend
- FastAPI
- SQLAlchemy
- MySQL
- JWT Authentication

## Project Structure

The project consists of two main parts:

1. **Frontend** (React + TypeScript)
   - Located in the root and src/ directory
   - Manages UI components, state, and API client

2. **Backend** (FastAPI)
   - Located in the backend/ directory
   - Provides RESTful API endpoints for all ERP modules
   - Handles data persistence with MySQL

## Key Features

- User authentication and authorization
- Dashboard with key metrics
- Inventory management
- Customer management
- Sales tracking
- Project management
- Finance management (Transactions, Invoices, Expenses)
- Employee management
- Documentation and FAQ systems
- Blog system

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/b225f2b9-88bd-4ae8-8431-0d6e4212e376) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
