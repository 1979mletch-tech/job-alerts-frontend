// Your Base44 app ID and backend secret
const BASE44_APP_ID = "6ac129b13c8f63e1f265f186";
const BACKEND_SECRET = "my-super-secret-key";

const ENDPOINT = `https://app.base44.com/apps/${BASE44_APP_ID}/functions/sendSmsJobAlerts`;

document.getElementById("sendBtn").addEventListener("click", async () => {
  const phone = document.getElementById("phone").value.trim();
  const trade = document.getElementById("trade").value.trim();
  const statusEl = document.getElementById("status");

  statusEl.textContent = "";
  statusEl.className = "status";

  if (!phone || !trade) {
    statusEl.textContent = "Please enter your phone number and trade.";
    statusEl.classList.add("error");
    return;
  }

  const message = `New tradesman signup: ${trade} – ${phone}`;

  try {
    statusEl.textContent = "Submitting...";
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-backend-secret": BACKEND_SECRET
      },
      body: JSON.stringify({ to: phone, message })
    });

    const data = await res.json();

    if (res.ok && data.success) {
      statusEl.textContent = "You're signed up! You'll receive job alerts soon.";
      statusEl.classList.add("success");
    } else {
      statusEl.textContent = `Error: ${data.error || "Unknown error"}`;
      statusEl.classList.add("error");
    }
  } catch (err) {
    statusEl.textContent = `Network error: ${err.message}`;
    statusEl.classList.add("error");
  }
});