# CT Candidates App - Setup Guide

This is the setup guide for running the **CT Candidates App**, a project built using **Laravel** (backend), **React**, **MUI**, **Vite.js** (frontend), and **Sanctum** for authentication.

---

## ⚙️ Prerequisites

- **PHP** (latest version)
- **Node.js** (v16+)
- **Git**
- **Docker** (for PostgreSQL)
- **PostgreSQL** or **MySQL** (depending on configuration)

The application can run with **Docker** for PostgreSQL, simplifying database setup. You can also choose MySQL if preferred.

---

## 🧑‍💻 Supported Operating Systems

- **Windows**
- **macOS**

---

## 🖥️ Recommended Hardware Requirements

- **CPU**: Dual-core 2.0 GHz+ (Quad-core recommended)
- **RAM**: Minimum 8 GB (16 GB recommended for Docker)
- **Storage**: 2+ GB of free space
- **OS**: Windows 10+ or macOS 11+ (Intel/Apple Silicon)

---

## 🚀 Step-by-Step Installation

### 1. Install Docker

#### Windows:
- Install Docker Desktop: [https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop)
- Docker Compose comes included.

#### macOS:
- Use Homebrew:
```bash
brew install --cask docker
```

---

### 2. Install PHP

#### Windows:
- Download ZIP from: [https://windows.php.net/download](https://windows.php.net/download)
- Extract to `C:\php`
- Add `C:\php` to system PATH (Environment Variables)
- Enable extensions in `php.ini`:
```ini
extension=pgsql
extension=pdo_pgsql
; or for MySQL:
extension=mysqli
```

#### macOS:
```bash
brew install php
brew install php-pgsql   # PostgreSQL
```

---

### 3. Install Node.js

- Install from [https://nodejs.org/](https://nodejs.org/)
- Verify:
```bash
node -v
```

---

### 4. Install Composer

- Download from [https://getcomposer.org/download/](https://getcomposer.org/download/)
- Verify:
```bash
composer --version
```

---

### 5. Clone the Repository

```bash
git clone https://github.com/jimmyochoa/ct-candidates-app.git
cd ct-candidates-app
```

---

### 6. Set Up `.env` File

```bash
cp .env.example .env
```

Update `.env`:

```env
APP_NAME=CT Candidates
APP_ENV=local
APP_KEY=base64:uMm3FTa3n950tzEa7CDffuTKpNF1OP5qhtrQVH/aIlU=
APP_DEBUG=true
APP_URL=http://localhost

DB_CONNECTION=pgsql
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=ct_candidates_app
DB_USERNAME=postgres
DB_PASSWORD=your_postgres_password
```

---

### 7. Generate Laravel Key

```bash
php artisan key:generate
```

---

### 8. Run PostgreSQL via Docker

```bash
docker run -d \
  --name postgres-container \
  -e POSTGRES_PASSWORD=your_postgres_password \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_DB=ct_candidates_app \
  -p 5432:5432 \
  postgres:latest
```

---

### 9. Run Migrations

```bash
php artisan migrate
```

---

### 10. Install Frontend Dependencies

```bash
npm install
```

---

### 11. Compile Frontend

```bash
npm run dev
```

---

### 12. Start Laravel Server

```bash
php artisan serve
```

---

## 📡 API Endpoints (Sanctum Protected)

All authenticated routes require a Bearer token from login.

### 🔐 Auth

- **POST `/register`**
```json
{
  "name": "User",
  "email": "user@example.com",
  "password": "secret123"
}
```

- **POST `/login`**
```json
{
  "email": "user@example.com",
  "password": "secret123"
}
```
**Returns:**
```json
{
  "token": "sanctum-token-here"
}
```

Use this token for authenticated requests:
```
Authorization: Bearer your-token-here
```

---

### ✅ Authenticated User

- **GET `/api/user`**

---

### 📋 Tasks

- **GET `/api/tasks`**
  - Optional query params:
    - `status=pending`
    - `orderBy=created_at&direction=desc`

- **POST `/api/tasks`**
```json
{
  "title": "New Task"
}
```

- **GET `/api/tasks/{id}`**

- **PUT `/api/tasks/{id}`**
```json
{
  "title": "Updated Task",
  "status": "completed",
  "order": 1
}
```

- **DELETE `/api/tasks/{id}`**

---

## 🧹 Useful Commands

Clear cache:
```bash
php artisan config:clear
php artisan route:clear
php artisan view:clear
```

Reset database:
```bash
php artisan migrate:fresh --seed
```

---

## ✅ Tech Stack Summary

- **Laravel** (PHP backend)
- **React + Vite + MUI** (frontend)
- **Sanctum** (authentication)
- **PostgreSQL** (via Docker)

