# Project Setup Guide

Welcome to the TasteNShop E-Commerce Project!

## Prerequisites
- Node.js (v18+ recommended)
- Python 3.12+
- pipenv or pip
- npm or yarn
- PostgreSQL (or your chosen database)

## Installation

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd e-commerce
```

### 2. Backend Setup
```bash
cd server
pipenv install  # or pip install -r requirements.txt
pipenv shell     # if using pipenv
```

#### Database Setup
- Ensure PostgreSQL is running and you have created a database.
- Update your database URI in `server/config.py` or your `.env` file if used.

#### Migrations
```bash
flask db upgrade
```

#### Run the Backend
```bash
flask run
```

### 3. Frontend Setup
```bash
cd ../client
npm install
npm start
```

### 4. Environment Variables
- Copy `.env.example` to `.env` in both `server/` and `client/` if provided.
- Fill in required values (e.g., database URI, secret keys, API URLs).

## Running the Application
- Frontend: http://localhost:3000
- Backend: http://127.0.0.1:5000

## Useful Commands
- **Reset database:** `python server/reset_db.py OR python3 server/reset_db.py`
- **Run migrations:** `flask db upgrade`
- **Install dependencies:** `pipenv install` or `npm install`

## Troubleshooting
- See TROUBLESHOOTING.md for common issues and solutions while running this project.

## Need Help?
- Check the README for more details.
- Open an issue on GitHub or ask in the team chat. 