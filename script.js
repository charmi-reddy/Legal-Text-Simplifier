async function simplifyText() {
    const text = document.getElementById("legalText").value;
    const language = document.getElementById("language").value;
    const apiUrl = "https://c84e-35-237-248-56.ngrok-free.app/simplify/";

    if (!text.trim()) {
        alert("Please enter legal text!");
        return;
    }

    document.getElementById("loading").style.display = "block"; // Show loading text
    document.getElementById("output").innerText = ""; // Clear previous output

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ text, language })
        });

        const data = await response.json();
        if (data.translated_text) {
            document.getElementById("output").innerText = "Simplified Text: " + data.translated_text;
        } else {
            document.getElementById("output").innerText = "Error: " + (data.error || "Could not process request.");
        }
    } catch (error) {
        document.getElementById("output").innerText = "Error connecting to server.";
    } finally {
        document.getElementById("loading").style.display = "none"; // Hide loading text
    }
}
