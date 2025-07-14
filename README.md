# GrowthX

This project uses Node.js, Docker, Headless WordPress, and MySQL to create an automated content generation and publishing solution.

## Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/) (optional, for local development only)

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/thiagotna/growthx.git
cd growthx
```

### 2. Configure environment variables

Edit the `.env` file as needed. An example is already included in the project.

### 3. Start the containers with Docker Compose

```bash
docker-compose up -d
```

This will start three containers:

- **app**: Node.js application
- **wordpress**: Headless WordPress
- **db**: MySQL

### 4. WordPress installation and setup

Access WordPress at [http://localhost:8080](http://localhost:8080).

#### a) Install the database and create the admin user

The database will be created automatically by the MySQL container. Follow the WordPress installation wizard to create the admin user (e.g., `naraujo`).

#### b) Install the Headless plugin

1. In the WordPress dashboard, go to **Plugins > Add New**.
2. Search for `WPGraphQL` or another headless plugin of your choice.
3. Install and activate the plugin.

### 5. Application user and password setup

- Create an application password for the admin user in **Users > Your Profile > Application Passwords**.
- Update the `WP_APP_PASS` variable in the `.env` file with the generated password.

### 6. Manual build (optional)

If you want to run the application locally outside Docker:

```bash
npm install
npm run build
npm start
```

## Endpoints

The application will be available at [http://localhost:3000/docs](http://localhost:3000/docs).

## Notes

- WordPress is configured for headless use, with default 2025 theme.
- The database is persisted via Docker volume.
- To restart everything from scratch, remove the volumes:

```bash
docker-compose down -v
```

---

Video: [https://www.youtube.com/watch?v=1Yq3hVjYCrE](https://www.youtube.com/watch?v=1Yq3hVjYCrE)

---

Live API: https://growthxai.onrender.com/docs

Wordpress Site Demo: https://wordpress-1491060-5687336.cloudwaysapps.com/ (Expires on July 17th 2025)

Questions? Open an issue or contact the maintainer.
