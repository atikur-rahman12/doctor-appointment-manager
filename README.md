# 🏥 DocAppoint – Doctor Appointment Manager

A modern full-stack **Doctor Appointment Booking System** built with MERN stack and secure authentication.  
Users can browse doctors, book appointments, manage bookings, and update profiles through a smooth and responsive UI.

---

## 🚀 Live Demo
> https://doctor-appointment-manager.vercel.app

---

## 📌 Project Overview

**DocAppoint** allows users to:
- Browse available doctors
- View detailed doctor profiles
- Book appointments securely
- Manage their bookings from a personal dashboard
- Update profile information
- Authenticate using secure login system (JWT + Better Auth)

---

## 🎯 Key Features

### 🏠 Home Page
- Modern hero banner (Swiper.js supported)
- Top 3 rated doctors section (dynamic data)
- Doctor cards with **View Details** button
- Conditional navigation (login required for booking/details)
- Additional custom sections for UI enhancement

---

### 🩺 Doctor Details Page
- Full doctor profile display
- Availability schedule
- Hospital & location info
- Consultation fee
- **Book Appointment button**
- Booking via modal or separate page

---

### 📅 Appointment System
- Book appointments with form
- Save data to MongoDB
- Success toast on booking
- Stored fields:
  - Patient name
  - Email
  - Phone number
  - Gender
  - Appointment date & time

---

### 📋 All Appointments Page
- Displays all available appointments
- Search by doctor name
- Responsive card layout
- View Details functionality with auth protection

---

### 🔐 Authentication System
- JWT-based secure authentication
- Login & Registration system
- Google/GitHub social login (one provider)
- Protected routes

#### Login Features
- Email & Password login
- Forgot password UI (optional)
- Redirect to previous route after login

#### Registration Features
- Name, Email, Photo, Password
- Password rules:
  - 1 uppercase letter
  - 1 lowercase letter
  - Minimum 6 characters

---

### 🧑‍⚕️ Dashboard (Private Route)

#### 📌 My Bookings
- View only logged-in user’s appointments
- Update & Delete functionality
- Instant UI update without reload
- MongoDB sync

#### 👤 My Profile
- View user info
- Update name & photo
- Instant UI update
- Modal-based editing

---

## ⚙️ Tech Stack

### Frontend
- React.js
- Tailwind CSS
- React Router DOM
- Axios
- Swiper.js
- React Toastify

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Better Auth (Session/JWT handling)

---

## 🧠 Core Functionalities

- 🔐 JWT Authentication System
- 📦 MongoDB CRUD Operations
- 🔎 Search functionality (Doctor name)
- 🧾 Appointment booking system
- ✏️ Update/Delete bookings
- 👤 Profile management
- 🔒 Protected routes
- 📱 Fully responsive UI

---
