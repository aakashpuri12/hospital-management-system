package com.hospital.backend.controller;

import com.hospital.backend.model.Doctor;
import com.hospital.backend.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = {"http://127.0.0.1:5500", "http://localhost:5500"})
@RestController
@RequestMapping("/api/doctors")
public class DoctorController {

    @Autowired
    private DoctorRepository doctorRepo;

    // ✅ 1. Get all doctors
    @GetMapping("")
    public List<Doctor> getAllDoctors() {
        return doctorRepo.findAll();
    }

    // ✅ 2. Get one doctor by ID  ← THIS FIXES YOUR 405 ERROR
    @GetMapping("/{id}")
    public Doctor getDoctor(@PathVariable("id") Long id) {
        return doctorRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Doctor not found with id: " + id));
    }

    // ✅ 3. Add new doctor
    @PostMapping("")
    public Doctor addDoctor(@RequestBody Doctor doctor) {
        return doctorRepo.save(doctor);
    }

    // ✅ 4. Update existing doctor
    @PutMapping("/{id}")
    public Doctor updateDoctor(@PathVariable("id") Long id, @RequestBody Doctor updated) {
        Doctor existing = doctorRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Doctor not found with id: " + id));

        existing.setFirstName(updated.getFirstName());
        existing.setLastName(updated.getLastName());
        existing.setSpecialty(updated.getSpecialty());
        existing.setEmail(updated.getEmail());
        existing.setContactNo(updated.getContactNo());        
        return doctorRepo.save(existing);
    }

    // ✅ 5. Delete doctor
    @DeleteMapping("/{id}")
    public void deleteDoctor(@PathVariable("id") Long id) {
        doctorRepo.deleteById(id);
    }
}
