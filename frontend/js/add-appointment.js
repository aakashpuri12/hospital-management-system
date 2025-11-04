// ✅ Correct base URL — matches your controller @RequestMapping("/api/appointments")
const baseUrl = "http://localhost:8080/api/appointments";

const urlParams = new URLSearchParams(window.location.search);
const appointmentId = urlParams.get("id");

const patientSelect = document.getElementById("patientSelect");
const doctorSelect = document.getElementById("doctorSelect");
const datetimeInput = document.getElementById("appointmentDatetime");
const reasonInput = document.getElementById("reason");
const form = document.getElementById("appointmentForm");

async function loadDropdowns() {
  try {
    // ✅ Fetch patients and doctors separately
    const [patients, doctors] = await Promise.all([
      fetch("http://localhost:8080/api/patients").then((r) => r.json()),
      fetch("http://localhost:8080/api/doctors").then((r) => r.json()),
    ]);

    patientSelect.innerHTML = patients
      .map((p) => `<option value="${p.id}">${p.firstName} ${p.lastName}</option>`)
      .join("");

    doctorSelect.innerHTML = doctors
      .map(
        (d) =>
          `<option value="${d.id}">${d.firstName} ${d.lastName} (${d.specialty})</option>`
      )
      .join("");
  } catch (err) {
    console.error("Dropdown load error:", err);
    alert("Failed to load patient or doctor list.");
  }
}

async function loadAppointment() {
  if (!appointmentId) return; // Only for edit mode
  document.getElementById("formTitle").innerText = "Edit Appointment";

  try {
    // ✅ Corrected fetch URL
    const res = await fetch(`${baseUrl}/${appointmentId}`);
    if (!res.ok) throw new Error("Appointment not found");

    const data = await res.json();
    console.log("Loaded appointment:", data);

    // ✅ Prefill fields
    patientSelect.value = data.patient?.id || "";
    doctorSelect.value = data.doctor?.id || "";
    datetimeInput.value = data.appointmentDatetime?.slice(0, 16) || "";
    reasonInput.value = data.reason || data.notes || "";
  } catch (err) {
    console.error("Load error:", err);
    alert("Error loading appointment details.");
  }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const payload = {
    patient: { id: parseInt(patientSelect.value) },
    doctor: { id: parseInt(doctorSelect.value) },
    appointmentDatetime: datetimeInput.value,
    reason: reasonInput.value,
  };

  const method = appointmentId ? "PUT" : "POST";
  const url = appointmentId ? `${baseUrl}/${appointmentId}` : baseUrl;

  try {
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      alert("Appointment saved successfully!");
      window.location.href = "appointments.html";
    } else {
      console.error("Save error:", await res.text());
      alert("Failed to save appointment.");
    }
  } catch (err) {
    console.error("Error:", err);
    alert("Error connecting to backend.");
  }
});

window.addEventListener("DOMContentLoaded", async () => {
  await loadDropdowns();
  if (appointmentId) await loadAppointment();
});
