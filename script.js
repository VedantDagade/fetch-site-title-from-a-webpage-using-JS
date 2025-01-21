// script.js
document.getElementById("fetch-title").addEventListener("click", async () => {
  const urlInput = document.getElementById("url-input").value.trim();
  const output = document.getElementById("output");

  // Clear previous output
  output.textContent = "";

  if (!urlInput) {
    output.textContent = "Please enter a valid URL.";
    return;
  }

  try {
    const response = await fetch(
      `https://api.allorigins.win/get?url=${encodeURIComponent(urlInput)}`
    );
    if (!response.ok) throw new Error("Failed to fetch the webpage.");

    const data = await response.json();
    const parser = new DOMParser();
    const doc = parser.parseFromString(data.contents, "text/html");
    const title = doc.querySelector("title");

    output.textContent = title
      ? `Title: ${title.textContent}`
      : "Title not found on this webpage.";
  } catch (error) {
    output.textContent = `Error: ${error.message}`;
  }
});
