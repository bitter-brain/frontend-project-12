### Hexlet tests and linter status
[![Actions Status](https://github.com/bitter-brain/frontend-project-12/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/bitter-brain/frontend-project-12/actions)

## Hexlet Chat

Fullstack real-time chat application, inspired by Slack.

[Demo](https://frontend-project-12-vg29.onrender.com) 

---

## Tech Stack

**Frontend:** React 19, Redux Toolkit, RTK Query, React Router, Formik, Yup, Bootstrap 5, react-i18next, Socket.IO Client  
**Backend:** Node.js, Fastify, Socket.IO  
**Infrastructure:** Vite, ESLint, Render

---

## Features

- User registration and authentication
- Real-time messaging via WebSocket
- Channel management: create, rename, delete
- Profanity filtering
- Toast notifications for errors and actions
- Internationalization (i18n)
- Error tracking via Rollbar

---

## Project Highlights

-  JWT authentication with token stored in localStorage
-  Real-time updates for messages and channels
-  User-friendly interface with focus management and button disabling during requests
-  Modal windows for channel management with form validation (Formik + Yup)
-  Toast notifications for all user actions
-  Fully compatible with Playwright tests and ESLint rules

---

## Quick Commands

| Command | Description |
|---------|-------------|
| `make install` | Install all dependencies |
| `make build` | Build the frontend |
| `make start` | Run the backend server with frontend |
| Test account | `admin` / `admin` |