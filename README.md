# Chat Application

Project with PostgreSQL and WebSocket for real-time chat functionality.

## Overview

This project implements a real-time chat application using WebSocket for communication and PostgreSQL for data persistence. It includes features like user authentication, chat room management, and message broadcasting to multiple clients. The backend is built with Node.js and Express, while the frontend is designed to integrate seamlessly with an Angular application.

## Design

### Architecture

- **Backend:** Node.js, Express, WebSocket, PostgreSQL
- **Frontend:** Angular
- **Database:** PostgreSQL

## Features

- **User Authentication:** Secure login and session management.
- **Real-Time Communication:** WebSocket-based messaging for instantaneous chat updates.
- **Chat Rooms:** Support for multiple chat rooms with message history(in process yet)
- **Message Persistence:** All messages are stored in PostgreSQL for retrieval and analysis

## Technologies

- ![Node.js](https://img.shields.io/badge/node.js-%23339933.svg?style=for-the-badge&logo=nodedotjs&logoColor=white)
- ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
- ![WebSocket](https://img.shields.io/badge/WebSocket-0A0A0A?style=for-the-badge&logo=websocket&logoColor=white)
- ![PostgreSQL](https://img.shields.io/badge/postgresql-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
- ![Angular](https://img.shields.io/badge/angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white)

## Backend

### API Endpoints

- **User Routes**
  - Register: `POST /user/register`
  - Login: `POST /user/login`
  
## Frontend

### Features

- **Responsive Design:** Optimized for both desktop and mobile devices.
- **Real-Time Updates:** Seamless user experience with real-time message updates and notifications.

## How to Run Locally

### Prerequisites

- Node.js and npm installed.
- PostgreSQL database running.
- Angular CLI installed.

### Steps

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/username/chat-application.git
   cd chat-application

## Backend Setup:

1. **Install dependencies:**
   npm install

start the application:

   node index.js

   ## Frontend Setup:
    Navigate to the frontend directory:

       cd client
Install dependencies:

npm install

start the application:

ng serve

## Access the Application:
Visit http://localhost:4200 in your browser.

