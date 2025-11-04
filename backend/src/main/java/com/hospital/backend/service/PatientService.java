package com.hospital.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.hospital.backend.entity.Patient;
import com.hospital.backend.repository.PatientRepository;

import java.util.List;

@Service
public class PatientService {

    @Autowired
    private PatientRepository repo;

    public List<Patient> getAllPatients() {
        return repo.findAll();
    }

    public Patient addPatient(Patient patient) {
        return repo.save(patient);
    }

    public Patient getPatientById(Long id) {
        return repo.findById(id).orElse(null);
    }

    public void deletePatient(Long id) {
        repo.deleteById(id);
    }
}
