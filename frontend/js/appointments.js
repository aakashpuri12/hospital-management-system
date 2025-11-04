// 🔗 API base URL
const apiUrl = "http://localhost:8080/api/appointments";

// 📦 Table body reference
const tableBody = document.getElementById("appointmentsTableBody");

// 🚀 Load all appointments
async function loadAppointments() {
  try {
    tableBody.innerHTML = `<tr><td colspan="7" style="text-align:center;">Loading appointments...</td></tr>`;

    // ✅ Fetch data from backend
    const res = await fetch(apiUrl);
    if (!res.ok) throw new Error(`Backend returned ${res.status}`);

    const data = await res.json();
    console.log("✅ Appointments data received:", data);

    // 🟨 No appointments found
    if (!Array.isArray(data) || data.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="7" style="text-align:center;">No appointments found.</td></tr>`;
      return;
    }

    // 🧹 Clear old rows
    tableBody.innerHTML = "";

    // 🧾 Populate the table
    data.forEach((a) => {
      const patientName = a.patient
        ? `${a.patient.firstName || ""} ${a.patient.lastName || ""}`.trim()
        : (a.patientName || "-");

      const doctorName = a.doctor
        ? `${a.doctor.firstName || ""} ${a.doctor.lastName || ""}`.trim()
        : (a.doctorName || "-");

      const dateTime = a.appointmentDatetime
        ? a.appointmentDatetime.replace("T", " ").slice(0, 16)
        : "-";

      const reason = a.reason || a.notes || "-";

      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${a.id || "-"}</td>
        <td>${patientName}</td>
        <td>${doctorName}</td>
        <td>${dateTime}</td>
        <td>${a.status || "Scheduled"}</td>
        <td>${reason}</td>
        <td>
          <button class="edit-btn" onclick="editAppointment(${a.id})">✏️ Edit</button>
          <button class="delete-btn" onclick="deleteAppointment(${a.id})">🗑 Delete</button>
        </td>
      `;
      tableBody.appendChild(row);
    });
  } catch (err) {
    console.error("❌ Error loading appointments:", err);
    tableBody.innerHTML = `
      <tr><td colspan="7" style="text-align:center;color:red;">⚠️ Failed to load appointments</td></tr>`;
  }
}

// ✏️ Edit button handler
function editAppointment(id) {
  window.location.href = `add-appointment.html?id=${id}`;
}

// 🗑 Delete button handler
async function deleteAppointment(id) {
  if (!confirm("Are you sure you want to delete this appointment?")) return;
  try {
    const res = await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
    if (res.ok) {
      alert("Appointment deleted successfully!");
      loadAppointments();
    } else {
      alert("Failed to delete appointment. Server error.");
    }
  } catch (err) {
    console.error("Delete error:", err);
    alert("Error deleting appointment.");
  }
}

// 🕒 Load on startup
window.addEventListener("DOMContentLoaded", loadAppointments);
