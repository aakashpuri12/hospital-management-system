package com.hospital.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.hospital.backend.model.Doctor;
import java.util.List;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    List<Doctor> findBySpecialty(String specialty);
}
