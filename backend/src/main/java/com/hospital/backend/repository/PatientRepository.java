package com.hospital.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.hospital.backend.entity.Patient;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {
}
