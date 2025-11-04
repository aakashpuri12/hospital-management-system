const BASE_URL = "http://localhost:8080/api";

document.addEventListener("DOMContentLoaded", () => {
  fetchCounts();
  setupReportButton();
});

// Fetch live counts
function fetchCounts() {
  Promise.all([
    fetch(`${BASE_URL}/patients`).then(r => r.json()),
    fetch(`${BASE_URL}/doctors`).then(r => r.json()),
    fetch(`${BASE_URL}/staff`).then(r => r.json()),
    fetch(`${BASE_URL}/appointments`).then(r => r.json())
  ])
    .then(([patients, doctors, staff, appointments]) => {
      document.getElementById("totalPatients").textContent = patients.length;
      document.getElementById("totalDoctors").textContent = doctors.length;
      document.getElementById("totalStaff").textContent = staff.length;
      document.getElementById("totalAppointments").textContent = appointments.length;
    })
    .catch(err => console.error("Error loading counts:", err));
}

// Setup preview button
function setupReportButton() {
  const btn = document.getElementById("generateReportBtn");
  btn.addEventListener("click", () => {
    const selected = document.getElementById("reportType").value;
    showPreview(selected);
  });
}

// Show live preview
function showPreview(module) {
  const preview = document.getElementById("reportPreview");
  const content = document.getElementById("previewContent");
  preview.classList.remove("hidden");
  content.innerHTML = "<p>Loading preview...</p>";

  let fetches = [];
  if (module === "all" || module === "patients") fetches.push(fetch(`${BASE_URL}/patients`).then(r => r.json()));
  if (module === "all" || module === "doctors") fetches.push(fetch(`${BASE_URL}/doctors`).then(r => r.json()));
  if (module === "all" || module === "staff") fetches.push(fetch(`${BASE_URL}/staff`).then(r => r.json()));
  if (module === "all" || module === "appointments") fetches.push(fetch(`${BASE_URL}/appointments`).then(r => r.json()));

  Promise.all(fetches)
    .then(results => {
      let html = "";

      if (module === "all" || module === "patients") {
        const data = results.shift();
        html += `<h3>🩺 Patients (${data.length})</h3><table><tr><th>ID</th><th>Name</th><th>Gender</th><th>Contact</th></tr>`;
        data.forEach(p => html += `<tr><td>${p.id}</td><td>${p.firstName} ${p.lastName}</td><td>${p.gender}</td><td>${p.contact}</td></tr>`);
        html += `</table>`;
      }

      if (module === "all" || module === "doctors") {
        const data = results.shift();
        html += `<h3>🧑‍⚕️ Doctors (${data.length})</h3><table><tr><th>ID</th><th>Name</th><th>Specialty</th><th>Contact</th></tr>`;
        data.forEach(d => html += `<tr><td>${d.id}</td><td>${d.firstName}</td><td>${d.specialty}</td><td>${d.contactNo}</td></tr>`);
        html += `</table>`;
      }

      if (module === "all" || module === "staff") {
        const data = results.shift();
        html += `<h3>👨‍💼 Staff (${data.length})</h3><table><tr><th>ID</th><th>Name</th><th>Role</th><th>Contact</th></tr>`;
        data.forEach(s => html += `<tr><td>${s.id}</td><td>${s.firstName} ${s.lastName}</td><td>${s.role}</td><td>${s.contactNo}</td></tr>`);
        html += `</table>`;
      }

      if (module === "all" || module === "appointments") {
        const data = results.shift();
        html += `<h3>📅 Appointments (${data.length})</h3><table><tr><th>ID</th><th>Patient</th><th>Doctor</th><th>Date/Time</th><th>Status</th></tr>`;
        data.forEach(a => html += `<tr><td>${a.id}</td><td>${a.patient?.firstName || "N/A"}</td><td>${a.doctor?.firstName || "N/A"}</td><td>${a.appointmentDatetime}</td><td>${a.status}</td></tr>`);
        html += `</table>`;
      }

      content.innerHTML = html + `<div class="center"><button class="add-btn" onclick="generatePdf('${module}')">📄 Download PDF</button></div>`;
    })
    .catch(err => {
      content.innerHTML = `<p style="color:red;">Error loading preview: ${err.message}</p>`;
    });
}

// Generate PDF
function generatePdf(module) {
  const url = `${BASE_URL}/reports/pdf?module=${module}`;
  fetch(url)
    .then(res => res.blob())
    .then(blob => {
      const a = document.createElement("a");
      a.href = window.URL.createObjectURL(blob);
      a.download = `Hospital_Report_${module}.pdf`;
      a.click();
    })
    .catch(err => alert("Error generating PDF: " + err.message));
}
