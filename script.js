async function simplifyText() {
    const text = document.getElementById("legalText").value;
    const language = document.getElementById("language").value;

    if (!text.trim()) {
        alert("Please enter legal text!");
        return;
    }

    document.getElementById("loading").style.display = "block"; 
    document.getElementById("output").innerText = ""; 

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer YOUR_API_KEY_HERE"
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",   // lighter, faster model
                messages: [
                    {
                        role: "system",
                        content: `You are a legal text simplifier and translator.`
                    },
                    {
                        role: "user",
                        content: `Simplify the following legal text and translate it into ${language}:\n\n${text}`
                    }
                ]
            })
        });

        const data = await response.json();

        if (data.choices && data.choices.length > 0) {
            document.getElementById("output").innerText =
                "Simplified Text: " + data.choices[0].message.content.trim();
        } else {
            document.getElementById("output").innerText = "Error: No response received.";
        }
    } catch (error) {
        console.error(error);
        document.getElementById("output").innerText = "Error connecting to OpenAI API.";
    } finally {
        document.getElementById("loading").style.display = "none"; 
    }
}
