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
  - Pinia
  - Vee validate
- Mysql v8
- Phpmyadmin
- Google Places integration
- AWS S3 storage

### Architecture

- Backend: agenda-backend-app
- Frontend: agenda-frontend-app

### Setup

- Download both agenda-app folders
- Make sure no containers are running on ports 3306, 6379, 80, 8080.
- Access backend folder and execute `./vendor/bin/sail up`
- Access frontend folder and create a `.env` file based on `.env.example`. Fill the variables. By default, Laravel uses `/api` for api requests.
- Access frontend folder and execute `npm run dev`
- To enable google's places API, paste you project's token in the env file

### On going improvements

- [x] Use AWS S3 bucket to store images
- [ ] Create a dedicate `contacts` table and model to store contacts with user id reference.
- [ ] Improve UI


### Screenshots

|![Screenshot from 2023-11-15 18-25-46](https://github.com/arielmoguillansky/agenda-lnm-app/assets/50706052/df19c294-a979-4ee2-b32b-47a9afcb8b8a)|![Screenshot from 2023-11-15 18-29-32](https://github.com/arielmoguillansky/agenda-lnm-app/assets/50706052/af992386-1dcd-4417-99e6-7f1e129946fe)|![Screenshot from 2023-11-15 18-29-39](https://github.com/arielmoguillansky/agenda-lnm-app/assets/50706052/7578086f-a77c-4f34-a1f1-86df2d5f05e1)|![Screenshot from 2023-11-15 18-37-34](https://github.com/arielmoguillansky/agenda-lnm-app/assets/50706052/87d82ddf-9215-4f81-ac1a-e6862c92f17c)|![Screenshot from 2023-11-15 18-38-03](https://github.com/arielmoguillansky/agenda-lnm-app/assets/50706052/36190071-e76b-4ac1-8921-8565e05baa67)




