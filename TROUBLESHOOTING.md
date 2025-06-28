# Troubleshooting Guide

## Common Issues

### 1. Port Already in Use
- **Error:** `EADDRINUSE: address already in use`
- **Solution:** Stop the process using the port or change the port in your `.env` file.

### 2. CORS Errors
- **Error:** `Access to fetch at ... from origin ... has been blocked by CORS policy`
- **Solution:** Ensure both backend and frontend are running and CORS is enabled in Flask.

### 3. Database Connection Errors
- **Error:** `psycopg2.OperationalError: could not connect to server`
- **Solution:**
  - Check your database is running and credentials are correct.
  - Verify your database URI in `config.py` or `.env`.

### 4. Resetting the Database
- Run the reset script:
  ```bash
  python server/reset_db.py
  ```
- Or manually drop and recreate the database, then run migrations.

### 5. Module Not Found / Import Errors
- **Error:** `ModuleNotFoundError: No module named ...`
- **Solution:**
  - Ensure all dependencies are installed (`pipenv install` or `npm install`).
  - Activate your virtual environment if using pipenv.

### 6. Frontend Not Connecting to Backend
- **Error:** API requests fail or return 404/500
- **Solution:**
  - Make sure both servers are running.
  - Check API URLs in your frontend code and `.env` files.

### 7. Styling Issues
- **Error:** Styles not applied or look broken
- **Solution:**
  - Ensure CSS files are imported correctly.
  - Clear your browser cache and restart the dev server.

### 8. Getting Help
- Check the README and SETUP.md for setup instructions.
- Ask in your team chat or open an issue on GitHub. 