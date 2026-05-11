document.getElementById("form").onsubmit = async (e) => {
  e.preventDefault();

  const urlInput = document.getElementById("url");
  const btn = document.getElementById("btn");
  const resultEl = document.getElementById("result");
  const errorEl = document.getElementById("error");

  resultEl.textContent = "";
  errorEl.textContent = "";
  btn.disabled = true;
  btn.textContent = "Shortening...";

  try {
    const res = await fetch("/shorten", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ originalUrl: urlInput.value }),
    });

    const data = await res.json();

    if (!res.ok || data.error) {
      errorEl.textContent = data.error || "Something went wrong.";
      return;
    }

    const link = document.createElement("a");
    link.href = data.shortUrl;
    link.textContent = data.shortUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";

    resultEl.textContent = "Short URL: ";
    resultEl.appendChild(link);

    urlInput.value = "";
  } catch (err) {
    errorEl.textContent = "Network error. Is the server running?";
  } finally {
    btn.disabled = false;
    btn.textContent = "Shorten";
  }
};