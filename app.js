document.addEventListener("DOMContentLoaded", () => {
  const birthdateInput = document.getElementById("birthdate");
  const calculateBtn = document.getElementById("calculateBtn");
  const resultDiv = document.getElementById("result");
  const errorDiv = document.getElementById("error");

  if (!birthdateInput || !calculateBtn || !resultDiv || !errorDiv) {
    console.error("One or more elements are missing in the DOM.");
    return;
  }

  // Set max date to today
  const today = new Date().toISOString().split("T")[0];
  birthdateInput.setAttribute("max", today);

  calculateBtn.addEventListener("click", (evt) => {
    evt.preventDefault();
    errorDiv.style.display = "none";
    resultDiv.textContent = "";

    const birthdate = new Date(birthdateInput.value);
    const today = new Date();

    if (birthdate > today) {
      showError("Birthdate cannot be in the future.");
      return;
    }

    if (!birthdateInput.value) {
      showError("Please select a birthdate.");
      return;
    }

    const age = calculateAge(birthdate);
    displayResult(age);
  });

  function calculateAge(birthdate) {
    const today = new Date();

    let years = today.getFullYear() - birthdate.getFullYear();
    let months = today.getMonth() - birthdate.getMonth();
    let days = today.getDate() - birthdate.getDate();

    // Adjust for negative days
    if (days < 0) {
      months--;
      const lastMonthDate = new Date(today.getFullYear(), today.getMonth(), 0);
      days += lastMonthDate.getDate();
    }

    // Adjust for negative months
    if (months < 0) {
      years--;
      months += 12;
    }

    return { years, months, days };
  }

  function displayResult(age) {
    resultDiv.textContent = `You are ${age.years} years, ${age.months} months, and ${age.days} days old.`;
  }

  function showError(message) {
    errorDiv.textContent = message;
    errorDiv.style.display = "block";
  }
});
