const baseUrl = "http://localhost:8080/api/staff";

document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.querySelector("#staffTable tbody");
  fetch(baseUrl)
    .then(res => res.json())
    .then(data => {
      tbody.innerHTML = "";
      data.forEach(s => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${s.id}</td>
          <td>${s.firstName}</td>
          <td>${s.lastName}</td>
          <td>${s.role}</td>
          <td>${s.specialty ?? "-"}</td>
          <td>${s.contactNo}</td>
          <td>${s.email}</td>
          <td>
            <button class="edit-btn" onclick="editStaff(${s.id})">✏️ Edit</button>
            <button class="delete-btn" onclick="deleteStaff(${s.id})">🗑️ Delete</button>
          </td>`;
        tbody.appendChild(row);
      });
    })
    .catch(err => console.error("Error loading staff:", err));
});

function deleteStaff(id) {
  if (confirm("Delete this staff member?")) {
    fetch(`${baseUrl}/${id}`, { method: "DELETE" })
      .then(() => {
        alert("Staff deleted successfully!");
        location.reload();
      })
      .catch(err => alert("Error deleting staff: " + err));
  }
}

function editStaff(id) {
  window.location = `add-staff.html?id=${id}`;
}
