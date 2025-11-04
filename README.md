🏥 Hospital Management System
📋 Project Overview

Hospital Management System is a full-stack web application designed to streamline hospital operations by digitizing patient, doctor, staff, and appointment management.
This project integrates a Spring Boot backend with a modern HTML/CSS/JavaScript frontend, ensuring a seamless user experience and real-time data handling using a MySQL database.

🚀 Features
👨‍⚕️ Doctor Management

Add, edit, update, and delete doctor profiles

Fields include name, specialty, contact number, email, and experience years

Integrated frontend form with prefill and backend synchronization

🧑‍🤝‍🧑 Patient Management

Register new patients and manage existing records

Edit details like age, gender, disease, and contact number

Gender dropdown with auto-prefill functionality

Real-time validation and updates

🧑‍🍳 Staff Management

Add and manage hospital staff details

Assign departments and maintain records with CRUD operations

📅 Appointment Scheduling

Waiterless-style booking experience for hospital appointments

Real-time doctor-patient selection from dropdowns

Date, time, and reason fields with backend MySQL connectivity

Automatic update and delete options

📊 Dashboard Overview

Interactive, user-friendly dashboard to manage doctors, patients, staff, and appointments

Modern UI with responsive design

🧩 Tech Stack
Layer	Technology
Frontend	HTML5, CSS3, JavaScript (Vanilla)
Backend	Spring Boot (Java)
Database	MySQL
IDE Used	Eclipse for backend, VS Code for frontend
API Communication	RESTful APIs (JSON)
Deployment	Netlify (Frontend), Render/Railway (Backend recommended)

💾 Database Schema (MySQL)
Tables Used:

doctors

patients

staff

appointments

Example SQL query:
```bash
      SELECT * FROM appointments;
```
| Column               | Type         | Description            |
| -------------------- | ------------ | ---------------------- |
| id                   | INT          | Primary key            |
| patient_id           | INT          | Foreign key (patients) |
| doctor_id            | INT          | Foreign key (doctors)  |
| appointment_datetime | DATETIME     | Appointment date/time  |
| reason               | VARCHAR(255) | Description            |
| created_at           | TIMESTAMP    | Auto timestamp         |


🖥️ How to Run the Project Locally
🔹 Backend (Spring Boot)

Open the project in Eclipse or IntelliJ

Configure your MySQL Database in application.properties:
```bash
spring.datasource.url=jdbc:mysql://localhost:3306/hospital_db
spring.datasource.username=yourusername
spring.datasource.password=yourpassword
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```
<img width="1919" height="967" alt="image" src="https://github.com/user-attachments/assets/2d4fc7ca-086a-46d3-90e5-51aced69a51a" />


<img width="1910" height="911" alt="image" src="https://github.com/user-attachments/assets/0cd9cad5-3aa8-4071-9a3d-713852931f45" />

<img width="1919" height="699" alt="image" src="https://github.com/user-attachments/assets/8e7d328f-1661-4dc8-b00f-8e68dd8aae43" />

<img width="1919" height="772" alt="image" src="https://github.com/user-attachments/assets/d385173d-5cc8-4dcf-ad6d-7defa9448401" />

<img width="1919" height="864" alt="image" src="https://github.com/user-attachments/assets/13db6537-1105-485f-86b7-b8262b047ce3" />




