package com.hospital.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

import com.hospital.backend.entity.Patient;

@Entity
@Table(name = "appointments")
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;

    @ManyToOne
    @JoinColumn(name = "doctor_id")
    private Doctor doctor;

    private LocalDateTime appointmentDatetime;
    private String status;
    private String notes;
    private String reason;

    // ✅ Default constructor (REQUIRED by JPA)
    public Appointment() {}

    // Optional: convenience constructor
    public Appointment(Patient patient, Doctor doctor, LocalDateTime appointmentDatetime, String reason) {
        this.patient = patient;
        this.doctor = doctor;
        this.appointmentDatetime = appointmentDatetime;
        this.reason = reason;
    }

    // ✅ Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Patient getPatient() { return patient; }
    public void setPatient(Patient patient) { this.patient = patient; }

    public Doctor getDoctor() { return doctor; }
    public void setDoctor(Doctor doctor) { this.doctor = doctor; }

    public LocalDateTime getAppointmentDatetime() { return appointmentDatetime; }
    public void setAppointmentDatetime(LocalDateTime appointmentDatetime) { this.appointmentDatetime = appointmentDatetime; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }
}
