package com.hospital.backend.controller;

import com.hospital.backend.model.Appointment;
import com.hospital.backend.repository.AppointmentRepository;
import com.hospital.backend.repository.DoctorRepository;
import com.hospital.backend.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = {"http://127.0.0.1:5500", "http://localhost:5500"}) // allow frontend calls
@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    @Autowired
    private AppointmentRepository appointmentRepo;

    @Autowired
    private DoctorRepository doctorRepo;

    @Autowired
    private PatientRepository patientRepo;

    // ✅ 1. Get all appointments
    @GetMapping("")
    public List<Appointment> getAllAppointments() {
        return appointmentRepo.findAll();
    }

    // ✅ 2. Get one appointment by ID (⚠️ THIS IS THE IMPORTANT FIX)
    @GetMapping("/{id}")
    public Appointment getAppointment(@PathVariable("id") Long id) {
        return appointmentRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found for ID: " + id));
    }

    // ✅ 3. Add new appointment
    @PostMapping("")
    public Appointment addAppointment(@RequestBody Appointment appointment) {
        return appointmentRepo.save(appointment);
    }

    // ✅ 4. Update existing appointment
    @PutMapping("/{id}")
    public Appointment updateAppointment(@PathVariable("id") Long id, @RequestBody Appointment updated) {
        Appointment existing = appointmentRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found for ID: " + id));

        existing.setAppointmentDatetime(updated.getAppointmentDatetime());
        existing.setStatus(updated.getStatus());
        existing.setNotes(updated.getNotes());
        existing.setDoctor(updated.getDoctor());
        existing.setPatient(updated.getPatient());
        existing.setReason(updated.getReason());

        return appointmentRepo.save(existing);
    }

    // ✅ 5. Delete appointment
    @DeleteMapping("/{id}")
    public void deleteAppointment(@PathVariable("id") Long id) {
        appointmentRepo.deleteById(id);
    }
}
