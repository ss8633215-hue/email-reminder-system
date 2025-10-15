document.getElementById("reminderForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;
  const date = document.getElementById("date").value;

  const res = await fetch("/add-reminder", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, message, date })
  });

  const data = await res.json();
  alert(data.msg);
});
