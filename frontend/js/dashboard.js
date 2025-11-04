const api = {
    patients: "http://localhost:8080/api/patients",
    doctors: "http://localhost:8080/api/doctors",
    staff: "http://localhost:8080/api/staff",
    appointments: "http://localhost:8080/api/appointments"
  };
  
  async function fetchCount(url, elementId) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("HTTP " + res.status);
      const data = await res.json();
      document.getElementById(elementId).textContent = "Total: " + data.length;
    } catch (err) {
      console.error(err);
      document.getElementById(elementId).textContent = "Error";
    }
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    fetchCount(api.patients, "patientCount");
    fetchCount(api.doctors, "doctorCount");
    fetchCount(api.staff, "staffCount");
    fetchCount(api.appointments, "appointmentCount");
  });
  