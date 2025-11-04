const baseUrl = "http://localhost:8080/api/doctors";
const urlParams = new URLSearchParams(window.location.search);
const doctorId = urlParams.get("id");

const firstNameInput = document.getElementById("firstName");
const lastNameInput = document.getElementById("lastName");
const specialtyInput = document.getElementById("specialty");
const contactInput = document.getElementById("contact");   // ✅ matches your HTML
const emailInput = document.getElementById("email");
const form = document.getElementById("doctorForm");

// ✅ Load doctor for edit mode
async function loadDoctor() {
  if (!doctorId) return;
  document.getElementById("formTitle").innerText = "Edit Doctor";

  try {
    const res = await fetch(`${baseUrl}/${doctorId}`);
    if (!res.ok) throw new Error("Doctor not found");

    const data = await res.json();
    console.log("Loaded doctor:", data);

    // ✅ Prefill fields (match backend + HTML IDs)
    firstNameInput.value = data.firstName || "";
    lastNameInput.value = data.lastName || "";
    specialtyInput.value = data.specialty || "";
    contactInput.value = data.contactNo || "";  // 👈 FIXED
    emailInput.value = data.email || "";
  } catch (err) {
    console.error("Load error:", err);
    alert("Error loading doctor details.");
  }
}

// ✅ Save or update doctor
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const payload = {
    firstName: firstNameInput.value,
    lastName: lastNameInput.value,
    specialty: specialtyInput.value,
    contactNo: contactInput.value,  // 👈 FIXED
    email: emailInput.value,
  };

  const method = doctorId ? "PUT" : "POST";
  const url = doctorId ? `${baseUrl}/${doctorId}` : baseUrl;

  try {
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      alert("Doctor saved successfully!");
      window.location.href = "doctors.html";
    } else {
      console.error("Save error:", await res.text());
      alert("Failed to save doctor.");
    }
  } catch (err) {
    console.error("Error:", err);
    alert("Error connecting to backend.");
  }
});

window.addEventListener("DOMContentLoaded", loadDoctor);
