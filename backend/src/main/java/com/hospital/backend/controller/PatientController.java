package com.hospital.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.hospital.backend.entity.Patient;
import com.hospital.backend.service.PatientService;

import java.util.List;

@RestController
@RequestMapping("/api/patients")
public class PatientController {

    @Autowired
    private PatientService service;

    @GetMapping
    public List<Patient> getAllPatients() {
        return service.getAllPatients();
    }

    @PostMapping
    public Patient addPatient(@RequestBody Patient patient) {
        return service.addPatient(patient);
    }

    @GetMapping("/{id}")
    public Patient getPatientById(@PathVariable Long id) {
        return service.getPatientById(id);
    }

    @DeleteMapping("/{id}")
    public void deletePatient(@PathVariable Long id) {
        service.deletePatient(id);
    }
}
