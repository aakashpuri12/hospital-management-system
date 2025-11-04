const baseUrl = "http://localhost:8080/api/doctors";

document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.querySelector("#doctorTable tbody");
  fetch(baseUrl)
    .then(res => res.json())
    .then(data => {
      tbody.innerHTML = "";
      data.forEach(d => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${d.id}</td>
          <td>${d.firstName}</td>
          <td>${d.lastName}</td>
          <td>${d.specialty}</td>
          <td>${d.contactNo}</td>
          <td>${d.email}</td>
          <td>
            <button class="edit-btn" onclick="editDoctor(${d.id})">✏️ Edit</button>
            <button class="delete-btn" onclick="deleteDoctor(${d.id})">🗑️ Delete</button>
          </td>`;
        tbody.appendChild(row);
      });
    })
    .catch(err => console.error("Error loading doctors:", err));
});

function deleteDoctor(id) {
  if (confirm("Delete this doctor?")) {
    fetch(`${baseUrl}/${id}`, { method: "DELETE" })
      .then(() => {
        alert("Doctor deleted successfully!");
        location.reload();
      })
      .catch(err => alert("Error deleting doctor: " + err));
  }
}

function editDoctor(id) {
  window.location = `add-doctor.html?id=${id}`;
}
