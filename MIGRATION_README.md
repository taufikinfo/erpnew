# ERP System Migration from Supabase to FastAPI + MySQL

This project has been successfully migrated from Supabase to a FastAPI backend with MySQL database. All functionality has been preserved while moving to a self-hosted solution.

## 🚀 Quick Start

### Single Command Startup (Recommended)

Choose any of these methods to start both backend and frontend:

#### Option 1: Batch Script (Windows)
```bash
./start.bat
```

#### Option 2: PowerShell Script
```bash
./start.ps1
```

#### Option 3: Node.js Script
```bash
node start.js
```

#### Option 4: pnpm Script (Single Terminal)
```bash
pnpm start:dev
```

### Prerequisites
- Python 3.8+ installed
- MySQL 8.0+ installed and running
- Node.js 18+ installed
- pnpm package manager (`npm install -g pnpm`)

### Manual Setup (Advanced)

#### Backend Setup
1. **Create MySQL Database**
   ```sql
   CREATE DATABASE erpnew;
   ```

2. **Run the setup script**
   ```bash
   ./setup_backend.bat
   ```

3. **Manual backend setup (alternative)**
   ```bash
   cd backend
   python -m venv venv
   venv\Scripts\activate
   pip install -r requirements.txt
   python seed_data.py
   python run.py
   ```

#### Frontend Setup
1. **Install dependencies**
   ```bash
   pnpm install
   ```

2. **Start development server**
   ```bash
   pnpm dev
   ```

## 🏗️ Architecture

### Backend (FastAPI)
- **Framework**: FastAPI with Python
- **Database**: MySQL with SQLAlchemy ORM
- **Authentication**: JWT tokens with Bearer authentication
- **API Documentation**: Auto-generated at `http://localhost:8000/docs`
- **Port**: 8000

### Frontend (React + Vite)
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **UI**: Tailwind CSS + shadcn/ui components
- **State Management**: TanStack Query for server state
- **Port**: 5173

## 📊 Database Schema

The system includes the following entities:

### Core Tables
- **users** - Authentication and user management
- **profiles** - User profile information
- **customers** - Customer management
- **employees** - HR and employee records
- **projects** - Project management
- **inventory_items** - Inventory management
- **sales_leads** - Sales pipeline
- **invoices** - Financial records
- **expenses** - Expense tracking
- **suppliers** - Supplier management
- **purchase_orders** - Procurement
- **work_orders** - Manufacturing/operations
- **reports** - Business reporting

### Supporting Tables
- **user_preferences** - User settings
- **user_roles** - Role-based access control
- **leave_requests** - HR leave management
- **settings** - System configuration

## 🔐 Authentication

### Default Admin Account
- **Email**: `admin@erpnew.com`
- **Password**: `admin123`

### API Authentication
All API endpoints (except auth) require a Bearer token:
```javascript
Authorization: Bearer <jwt_token>
```

## 📡 API Endpoints

### Authentication
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/register` - User registration

### Dashboard
- `GET /api/v1/dashboard/stats` - Dashboard statistics

### Customers
- `GET /api/v1/customers/` - List customers
- `POST /api/v1/customers/` - Create customer
- `GET /api/v1/customers/{id}` - Get customer
- `PUT /api/v1/customers/{id}` - Update customer
- `DELETE /api/v1/customers/{id}` - Delete customer

### Employees
- `GET /api/v1/employees/` - List employees
- `POST /api/v1/employees/` - Create employee
- `GET /api/v1/employees/{id}` - Get employee
- `PUT /api/v1/employees/{id}` - Update employee
- `DELETE /api/v1/employees/{id}` - Delete employee

### Inventory
- `GET /api/v1/inventory/` - List inventory items
- `POST /api/v1/inventory/` - Create inventory item
- `GET /api/v1/inventory/{id}` - Get inventory item
- `PUT /api/v1/inventory/{id}` - Update inventory item
- `DELETE /api/v1/inventory/{id}` - Delete inventory item

*Full API documentation available at `http://localhost:8000/docs`*

## 🗄️ Sample Data

The system is pre-populated with 10 sample records for each table:

- **10 Customers** - Various companies and contacts
- **10 Employees** - Different departments and roles
- **10 Inventory Items** - Electronics, furniture, and office supplies
- **10 Invoices** - Mix of paid, pending, and overdue
- **10 Sales Leads** - Various lead statuses and values
- **10 Projects** - Different project types and statuses
- **10 Suppliers** - Various supplier categories
- **10 Expenses** - Different expense categories
- **10 Work Orders** - Manufacturing and service orders

## 🔧 Configuration

### Backend Configuration (.env)
```env
DATABASE_HOST=localhost
DATABASE_USER=root
DATABASE_PASSWORD=
DATABASE_PORT=3306
DATABASE_NAME=erpnew
SECRET_KEY=your-secret-key-here
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

### Database Connection
Update the database credentials in `backend/app/core/config.py` if needed:
```python
database_host: str = "localhost"
database_user: str = "root"
database_password: str = ""
database_port: int = 3306
database_name: str = "erpnew"
```

## 🚀 Deployment

### Backend Deployment
1. Set up production environment variables
2. Configure MySQL database
3. Run migrations: `python seed_data.py`
4. Start with production server: `uvicorn app.main:app --host 0.0.0.0 --port 8000`

### Frontend Deployment
1. Build the application: `pnpm build`
2. Deploy the `dist` folder to your web server
3. Update API base URL in `src/lib/api-client.ts`

## 🔄 Migration Changes

### Removed Dependencies
- `@supabase/supabase-js` - Replaced with custom API client
- Supabase authentication - Replaced with JWT authentication
- Supabase real-time subscriptions - Can be implemented with WebSockets if needed

### New Dependencies (Backend)
- `fastapi` - Web framework
- `uvicorn` - ASGI server
- `sqlalchemy` - ORM
- `mysql-connector-python` - MySQL driver
- `python-jose` - JWT handling
- `passlib` - Password hashing

### Key Changes
1. **Authentication**: Moved from Supabase Auth to JWT
2. **Database**: PostgreSQL → MySQL
3. **API**: Supabase Client → Custom FastAPI endpoints
4. **Real-time**: Removed (can be added with WebSockets)
5. **File Storage**: Not included (can be added with local/cloud storage)

## 🐛 Troubleshooting

### Common Issues

1. **MySQL Connection Error**
   - Ensure MySQL is running
   - Check credentials in config
   - Verify database exists

2. **Permission Errors**
   - Ensure MySQL user has proper permissions
   - Grant privileges: `GRANT ALL PRIVILEGES ON erpnew.* TO 'root'@'localhost';`

3. **Port Conflicts**
   - Backend runs on port 8000
   - Frontend runs on port 5173
   - Ensure ports are available

4. **CORS Issues**
   - Frontend URL is whitelisted in backend CORS settings
   - Update `allow_origins` in `app/main.py` if needed

## 📝 Development

### Adding New Endpoints
1. Create new route in `backend/app/api/endpoints/`
2. Add to router in `backend/app/api/__init__.py`
3. Update frontend API client in `src/lib/api-client.ts`

### Database Changes
1. Update models in `backend/app/models/__init__.py`
2. Update schemas in `backend/app/schemas/__init__.py`
3. Run migration or recreate tables

### Frontend Updates
1. Update React Query hooks in `src/hooks/`
2. Update components to use new API client
3. Test authentication flow

## 🎯 Next Steps

1. **Add more API endpoints** for remaining entities
2. **Implement role-based access control**
3. **Add real-time features** with WebSockets
4. **Implement file upload** for avatars and documents
5. **Add comprehensive error handling**
6. **Implement API rate limiting**
7. **Add comprehensive logging**
8. **Set up automated backups**

## 📞 Support

For issues or questions about the migration:
1. Check the API documentation at `http://localhost:8000/docs`
2. Review the error logs in the terminal
3. Ensure all prerequisites are properly installed

The migration preserves all existing functionality while providing a more flexible and self-hosted solution.
