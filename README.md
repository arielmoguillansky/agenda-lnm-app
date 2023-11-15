# Agenda app

This is a simple Laravel/Sail + NuxtJs app that manages contacts.
Laravel Sail is a light-weight command-line interface for interacting with Laravel's default Docker development environment

### Requirements

- node v18
- php v8.2
- docker

### Stack

- Laravel v10
- NuxtJS v3
-- Pinia
-- Vee validate
- Mysql v8
- Phpmyadmin

### Architecture

- Backend: agenda-backend-app
- Frontend: agenda-frontend-app

### Setup

- Download both agenda-app folders
- Make sure no containers are running on ports 3306, 6379, 80, 8080.
- Access backend folder and execute `./vendor/bin/sail up`
- Access frontend folder and create a `.env` file based on `.env.example`. Fill the variables. By default, Laravel uses `/api` for api purposes and `/storage` for asset management and local storage.
- Access frontend folder and execute `npm run dev`

### On going improvements

[] Use AWS S3 bucket to store images
[] Create a dedicate `contacts` table and model to store contacts with user id reference.
[] Improve UI
