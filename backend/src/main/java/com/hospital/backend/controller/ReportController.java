package com.hospital.backend.controller;

import com.hospital.backend.entity.*;
import com.hospital.backend.model.*;
import com.hospital.backend.repository.*;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayOutputStream;
import java.util.*;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin(origins = "http://localhost:5500") // adjust to your frontend port
public class ReportController {

    @Autowired private PatientRepository patientRepo;
    @Autowired private DoctorRepository doctorRepo;
    @Autowired private StaffRepository staffRepo;
    @Autowired private AppointmentRepository appointmentRepo;

    @GetMapping("/pdf")
    public ResponseEntity<byte[]> generateReport(@RequestParam(required = false, defaultValue = "all") String module) {
        try {
            ByteArrayOutputStream out = new ByteArrayOutputStream();
            Document document = new Document(PageSize.A4.rotate());
            PdfWriter.getInstance(document, out);
            document.open();

            Font titleFont = new Font(Font.FontFamily.HELVETICA, 18, Font.BOLD, BaseColor.BLUE);
            Font headerFont = new Font(Font.FontFamily.HELVETICA, 12, Font.BOLD, BaseColor.WHITE);
            Font textFont = new Font(Font.FontFamily.HELVETICA, 10, Font.NORMAL, BaseColor.DARK_GRAY);

            document.add(new Paragraph("🏥 Hospital Management System Report", titleFont));
            document.add(new Paragraph("Generated on: " + new Date().toString(), textFont));
            document.add(new Paragraph(" "));

            // ✅ Summary Section (Always visible)
            document.add(new Paragraph("📊 Summary Overview:", titleFont));
            PdfPTable summaryTable = new PdfPTable(2);
            summaryTable.setWidthPercentage(60);
            summaryTable.addCell("Total Patients");
            summaryTable.addCell(String.valueOf(patientRepo.count()));
            summaryTable.addCell("Total Doctors");
            summaryTable.addCell(String.valueOf(doctorRepo.count()));
            summaryTable.addCell("Total Staff");
            summaryTable.addCell(String.valueOf(staffRepo.count()));
            summaryTable.addCell("Total Appointments");
            summaryTable.addCell(String.valueOf(appointmentRepo.count()));
            document.add(summaryTable);
            document.add(new Paragraph(" "));

            // ✅ Detailed Section Based on Dropdown Selection
            if (module.equalsIgnoreCase("all") || module.equalsIgnoreCase("patients")) {
                addPatientTable(document, headerFont, textFont);
            }
            if (module.equalsIgnoreCase("all") || module.equalsIgnoreCase("doctors")) {
                addDoctorTable(document, headerFont, textFont);
            }
            if (module.equalsIgnoreCase("all") || module.equalsIgnoreCase("staff")) {
                addStaffTable(document, headerFont, textFont);
            }
            if (module.equalsIgnoreCase("all") || module.equalsIgnoreCase("appointments")) {
                addAppointmentTable(document, headerFont, textFont);
            }

            document.add(new Paragraph("✅ End of Report", textFont));
            document.close();

            String fileName = "Hospital_Report_" + module.toUpperCase() + ".pdf";

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + fileName)
                    .contentType(MediaType.APPLICATION_PDF)
                    .body(out.toByteArray());

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(("Error generating PDF: " + e.getMessage()).getBytes());
        }
    }

    private void addPatientTable(Document document, Font headerFont, Font textFont) throws DocumentException {
        document.add(new Paragraph("🩺 Patient Details:", new Font(Font.FontFamily.HELVETICA, 14, Font.BOLD, BaseColor.BLACK)));
        PdfPTable table = new PdfPTable(5);
        table.setWidthPercentage(100);
        addTableHeader(table, headerFont, "ID", "First Name", "Last Name", "Gender", "Contact");

        for (Patient p : patientRepo.findAll()) {
            table.addCell(String.valueOf(p.getId()));
            table.addCell(p.getFirstName());
            table.addCell(p.getLastName());
            table.addCell(p.getGender());
            table.addCell(p.getContact());
        }
        document.add(table);
        document.add(new Paragraph(" "));
    }

    private void addDoctorTable(Document document, Font headerFont, Font textFont) throws DocumentException {
        document.add(new Paragraph("🧑‍⚕️ Doctor Details:", new Font(Font.FontFamily.HELVETICA, 14, Font.BOLD, BaseColor.BLACK)));
        PdfPTable table = new PdfPTable(4);
        table.setWidthPercentage(100);
        addTableHeader(table, headerFont, "ID", "First Name", "Specialty", "Contact");

        for (Doctor d : doctorRepo.findAll()) {
            table.addCell(String.valueOf(d.getId()));
            table.addCell(d.getFirstName());
            table.addCell(d.getSpecialty());
            table.addCell(d.getContactNo());
        }
        document.add(table);
        document.add(new Paragraph(" "));
    }

    private void addStaffTable(Document document, Font headerFont, Font textFont) throws DocumentException {
        document.add(new Paragraph("👨‍💼 Staff Details:", new Font(Font.FontFamily.HELVETICA, 14, Font.BOLD, BaseColor.BLACK)));
        PdfPTable table = new PdfPTable(4);
        table.setWidthPercentage(100);
        addTableHeader(table, headerFont, "ID", "Name", "Role", "Contact");

        for (Staff s : staffRepo.findAll()) {
            table.addCell(String.valueOf(s.getId()));
            table.addCell(s.getFirstName() + " " + s.getLastName());
            table.addCell(s.getRole());
            table.addCell(s.getContactNo());
        }
        document.add(table);
        document.add(new Paragraph(" "));
    }

    private void addAppointmentTable(Document document, Font headerFont, Font textFont) throws DocumentException {
        document.add(new Paragraph("📅 Appointment Details:", new Font(Font.FontFamily.HELVETICA, 14, Font.BOLD, BaseColor.BLACK)));
        PdfPTable table = new PdfPTable(5);
        table.setWidthPercentage(100);
        addTableHeader(table, headerFont, "ID", "Patient", "Doctor", "Date/Time", "Status");

        for (Appointment a : appointmentRepo.findAll()) {
            table.addCell(String.valueOf(a.getId()));
            table.addCell(a.getPatient() != null ? a.getPatient().getFirstName() : "N/A");
            table.addCell(a.getDoctor() != null ? a.getDoctor().getFirstName() : "N/A");
            table.addCell(String.valueOf(a.getAppointmentDatetime()));
            table.addCell(a.getStatus());
        }
        document.add(table);
        document.add(new Paragraph(" "));
    }

    private void addTableHeader(PdfPTable table, Font font, String... headers) {
        for (String h : headers) {
            PdfPCell cell = new PdfPCell(new Phrase(h, font));
            cell.setBackgroundColor(BaseColor.BLUE);
            cell.setHorizontalAlignment(Element.ALIGN_CENTER);
            table.addCell(cell);
        }
    }
}
