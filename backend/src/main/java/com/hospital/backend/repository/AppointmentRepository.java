package com.hospital.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.hospital.backend.model.Appointment;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> { }
