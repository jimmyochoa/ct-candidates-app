# CT Candidates App - Setup Guide

This is the setup guide for running the **CT Candidates App**, a project built using **Laravel** (backend), **React**, **MUI**, **Vite.js** (frontend), and **Sanctum** for authentication.

## ⚙️ Prerequisites

- **PHP** (latest version)
- **Node.js** (v16+)
- **Git**
- **Docker** (for PostgreSQL)
- **PostgreSQL** or **MySQL** (depends on your configuration)

The application can run with **Docker** for PostgreSQL, simplifying the database setup. You can also choose MySQL if preferred.

### 🧑‍💻 Supported Operating Systems

- **Windows**
- **MacOS**

---

## 🚀 Step-by-Step Installation

### 1. Install **Docker** & **Docker Compose**

Docker allows you to run the PostgreSQL database with a single command, simplifying setup.

#### **For Windows:**

1. **Install Docker**:
   - Download Docker Desktop for Windows: [Download Docker for Windows](https://www.docker.com/products/docker-desktop)
   - Follow the installation steps.

2. **Install Docker Compose**:
   - Docker Compose is bundled with Docker Desktop, so you don’t need to install it separately.

#### **For MacOS:**

1. **Install Docker**:
   - Run this command to install Docker using **Homebrew**:
     ```bash
     brew install --cask docker
     ```
   - Launch Docker from Applications once installed.

2. **Install Docker Compose**:
   - Docker Compose comes bundled with Docker Desktop, so no need to install it separately.

---

### 2. Install **PHP** (for Laravel)

- **For Windows:**
   - Download the latest **PHP** zip file from [PHP for Windows](https://windows.php.net/download).
   - Extract the contents to a folder (e.g., `C:\php`).
   - Add the PHP folder to your system's **Environment Variables**.
     - Open **System Properties** → **Advanced** → **Environment Variables**.
     - Under **System Variables**, find **Path** and add `C:\php` to it.
   - **Activate PHP extensions**: 
     - Open `php.ini` file (inside the PHP folder) and uncomment (remove the `;`) the lines for the necessary extensions:
       - For PostgreSQL: Uncomment `extension=pgsql` and `extension=pdo_pgsql`.
       - For MySQL: Uncomment `extension=mysqli`.
     - Restart the PHP service or the server after editing `php.ini`.

- **For MacOS:**
   - Install PHP using **Homebrew**:
     ```bash
     brew install php
     ```
   - **Activate PHP extensions** (PostgreSQL or MySQL):
     - For PostgreSQL, make sure to install `php-pgsql` by running:
       ```bash
       brew install php-pgsql
       ```
     - For MySQL, install `php-mysqli` by running:
       ```bash
       brew install php-mysqli
       ```

---

### 3. Install **Node.js** (for React frontend)

- **For Windows & MacOS:**
   - Download the latest version of **Node.js** from [Node.js official site](https://nodejs.org/).
   - Follow the installation steps for your system.
   - After installation, verify the installation by running:
     ```bash
     node -v
     ```

---

### 4. Install **Composer** (PHP Dependency Manager)

- **For Windows & MacOS:**
   - Download **Composer** from [getcomposer.org](https://getcomposer.org/download/).
   - Follow the installation instructions.
   - After installation, verify the installation by running:
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

### 6. Set Up Environment Variables

Copy the example environment file and configure it:

```bash
cp .env.example .env
```

Edit the `.env` file and make sure to configure the database settings properly:

```env
APP_NAME=CT Candidates
APP_ENV=local
APP_KEY=base64:uMm3FTa3n950tzEa7CDffuTKpNF1OP5qhtrQVH/aIlU=
APP_DEBUG=true
APP_URL=http://localhost

LOG_CHANNEL=stack
LOG_LEVEL=debug

DB_CONNECTION=pgsql
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=ct_candidates_app
DB_USERNAME=postgres
DB_PASSWORD=your_postgres_password
```

> **Note:** Ensure that the `DB_CONNECTION=pgsql` is set for PostgreSQL. If you prefer MySQL, change the `DB_CONNECTION` to `mysql` and configure the relevant `DB_HOST`, `DB_USERNAME`, and `DB_PASSWORD`.

---

### 7. Generate Laravel Application Key

Run the following command to generate a key for your Laravel app:

```bash
php artisan key:generate
```

---

### 8. Run PostgreSQL with Docker (without Docker Compose)

Instead of using a `docker-compose.yml` file, you can run PostgreSQL directly with Docker.

#### **For Windows & MacOS:**

1. **Make sure Docker is running.**

2. **Run PostgreSQL container with a single Docker command:**

```bash
docker run -d \
  --name postgres-container \
  -e POSTGRES_PASSWORD=your_postgres_password \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_DB=ct_candidates_app \
  -p 5432:5432 \
  postgres:latest
```

This command does the following:

- `-d`: Runs the container in detached mode.
- `--name postgres-container`: Names the PostgreSQL container.
- `-e POSTGRES_PASSWORD=your_postgres_password`: Sets the password for the PostgreSQL user.
- `-e POSTGRES_USER=postgres`: Sets the username for PostgreSQL.
- `-e POSTGRES_DB=ct_candidates_app`: Sets the name of the database.
- `-p 5432:5432`: Maps the local port `5432` to the container's port `5432`.
- `postgres:latest`: Uses the latest version of the official PostgreSQL image from Docker Hub.

---

### 9. Run Database Migrations

After setting up your environment and database, run the migrations:

```bash
php artisan migrate
```

---

### 10. Install Frontend Dependencies

From the project root, install the required Node.js dependencies:

```bash
npm install
```

---

### 11. Compile the Frontend Assets

Compile the frontend assets using Vite:

```bash
npm run dev
```

---

### 12. Run the Laravel Development Server

Now, start the Laravel backend server:

```bash
php artisan serve
```

The backend will be available at `http://127.0.0.1:8000`.

---

## 🧑‍💻 Useful Commands

- **Clear application cache:**

```bash
php artisan config:clear
php artisan route:clear
php artisan view:clear
```

- **Refresh database (⚠️ removes all data):**

```bash
php artisan migrate:fresh --seed
```

---

## 📝 Notes

- If you encounter issues with the `APP_KEY`, make sure you’ve run `php artisan key:generate`.
- Docker simplifies PostgreSQL setup; no need to install it manually.
- Ensure that you have **Git**, **PHP**, **Node.js**, and **Docker** properly installed.
- Make sure to activate the appropriate PHP drivers:
  - **For PostgreSQL**: Uncomment `extension=pgsql` and `extension=pdo_pgsql` in `php.ini`.
  - **For MySQL**: Uncomment `extension=mysqli` in `php.ini`.
  - After making changes to `php.ini`, restart the server or PHP service.
