const apiBase = "http://localhost:8080/api/staff";
const form = document.getElementById("staffForm");
const params = new URLSearchParams(window.location.search);
const staffId = params.get("id");

// Pre-fill if editing
if (staffId) {
  document.getElementById("formTitle").innerText = "Edit Staff Member";
  fetch(`${apiBase}/${staffId}`)
    .then(res => res.json())
    .then(s => {
      document.getElementById("staffId").value = s.id;
      document.getElementById("firstName").value = s.firstName;
      document.getElementById("lastName").value = s.lastName;
      document.getElementById("role").value = s.role;
      document.getElementById("specialty").value = s.specialty;
      document.getElementById("contactNo").value = s.contactNo;
      document.getElementById("email").value = s.email;
    });
}

// Save or update
form.addEventListener("submit", e => {
  e.preventDefault();
  const staff = {
    firstName: form.firstName.value,
    lastName: form.lastName.value,
    role: form.role.value,
    specialty: form.specialty.value,
    contactNo: form.contactNo.value,
    email: form.email.value
  };

  const method = staffId ? "PUT" : "POST";
  const url = staffId ? `${apiBase}/${staffId}` : apiBase;

  fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(staff)
  })
    .then(res => res.json())
    .then(() => {
      alert("✅ Staff saved successfully!");
      window.location = "staff.html";
    })
    .catch(err => alert("Error saving staff: " + err));
});
