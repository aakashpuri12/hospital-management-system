const baseUrl = "http://localhost:8080/api/patients";

// ✅ Fetch and display all patients
document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.querySelector("#patientTable tbody");
  fetch(baseUrl)
    .then(res => res.json())
    .then(data => {
      tbody.innerHTML = "";
      data.forEach(p => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${p.id}</td>
          <td>${p.firstName}</td>
          <td>${p.lastName}</td>
          <td>${p.age}</td>
          <td>${p.gender}</td>
          <td>${p.disease}</td>
          <td>${p.contact}</td>
          <td>
            <button class="edit-btn" onclick="editPatient(${p.id})">✏️ Edit</button>
            <button class="delete-btn" onclick="deletePatient(${p.id})">🗑️ Delete</button>
          </td>
        `;
        tbody.appendChild(row);
      });
    })
    .catch(err => console.error("Error:", err));
});

// ✅ Delete a patient
function deletePatient(id) {
  if (confirm("Are you sure you want to delete this patient?")) {
    fetch(`${baseUrl}/${id}`, { method: "DELETE" })
      .then(() => {
        alert("🗑️ Patient deleted successfully!");
        location.reload();
      })
      .catch(err => alert("Error deleting patient: " + err));
  }
}

// ✅ Edit patient
function editPatient(id) {
  window.location = `add-patient.html?id=${id}`;
}
