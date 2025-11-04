package com.hospital.backend.controller;

import com.hospital.backend.model.Staff;
import com.hospital.backend.repository.StaffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = {"http://127.0.0.1:5500", "http://localhost:5500"})
@RestController
@RequestMapping("/api/staff")
public class StaffController {

    @Autowired
    private StaffRepository staffRepository;

    @GetMapping
    public List<Staff> getAllStaff() {
        return staffRepository.findAll();
    }

    @PostMapping
    public Staff addStaff(@RequestBody Staff staff) {
        return staffRepository.save(staff);
    }

    @GetMapping("/{id}")
    public Staff getStaffById(@PathVariable Long id) {
        return staffRepository.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public Staff updateStaff(@PathVariable Long id, @RequestBody Staff updated) {
        return staffRepository.findById(id)
                .map(existing -> {
                    existing.setFirstName(updated.getFirstName());
                    existing.setLastName(updated.getLastName());
                    existing.setRole(updated.getRole());
                    existing.setSpecialty(updated.getSpecialty());
                    existing.setContactNo(updated.getContactNo());
                    existing.setEmail(updated.getEmail());
                    return staffRepository.save(existing);
                })
                .orElse(null);
    }

    @DeleteMapping("/{id}")
    public void deleteStaff(@PathVariable Long id) {
        staffRepository.deleteById(id);
    }
}
