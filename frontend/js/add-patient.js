const apiBase = "http://localhost:8080/api/patients";
const form = document.getElementById("patientForm");
const urlParams = new URLSearchParams(window.location.search);
const patientId = urlParams.get("id");

// ✅ If editing, pre-fill form
if (patientId) {
  document.getElementById("formTitle").innerText = "Edit Patient";
  fetch(`${apiBase}/${patientId}`)
    .then(res => res.json())
    .then(p => {
      document.getElementById("patientId").value = p.id;
      document.getElementById("firstName").value = p.firstName;
      document.getElementById("lastName").value = p.lastName;
      document.getElementById("age").value = p.age;
      document.getElementById("gender").value = p.gender;
      document.getElementById("disease").value = p.disease;
      document.getElementById("contact").value = p.contact;
    });
}

// ✅ Add or update patient
form.addEventListener("submit", e => {
  e.preventDefault();

  const patient = {
    firstName: form.firstName.value,
    lastName: form.lastName.value,
    age: form.age.value,
    gender: form.gender.value,
    disease: form.disease.value,
    contact: form.contact.value
  };

  const method = patientId ? "PUT" : "POST";
  const url = patientId ? `${apiBase}/${patientId}` : apiBase;

  fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patient)
  })
    .then(res => res.json())
    .then(() => {
      alert("✅ Patient saved successfully!");
      window.location = "patients.html";
    })
    .catch(err => alert("Error saving patient: " + err));
});
