# Agenda app

This is a simple Laravel/Sail + NuxtJs app that manages contacts.
Laravel Sail is a light-weight command-line interface for interacting with Laravel's default Docker development environment

### Stack

- Laravel
- Nuxt JS
- Mysql
- Phpmyadmin

### Architecture

- Backend: agenda-backend-app
- Frontend: agenda-frontend-app

### Setup

- Download both agenda-app folders and docker-compose file
- Make sure no containers are running on ports used by this app
- Access backend folder and execute ```./vendor/bin/sail up```
- Access frontend folder and execute ```npm run dev```
