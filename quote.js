// Receiving a random quote using the ZenQuotes API via CORS Proxy
async function fetchQuote() {
  const apiURL = `https://api.allorigins.win/get?url=https://zenquotes.io/api/random&timestamp=${new Date().getTime()}`;
  try {
        const response = await fetch(apiURL);
        const data = await response.json();
        const quoteData = JSON.parse(data.contents)[0];

        // Checking API's "Too many requests" message
        if (quoteData.q === "Too many requests. Obtain an auth key for unlimited access.") {
          document.querySelector("#quote").textContent = `Too many requests. Buy an auth key for unlimited access, or wait 30 seconds and press the button again!`;
          // Setting font and font-size for "Too many requests" message
          document.querySelector("#quote").style.fontFamily = "var(--mainFontFamily)";
          document.querySelector("#quote").style.fontSize = "1rem";
          document.querySelector("#author").style.fontStyle = "normal";
        } else {
          // Updating the quote and author text on the page
          document.querySelector("#quote").textContent = `"${quoteData.q}"`;
          document.querySelector("#quote").style.fontSize = "1.8rem";
          document.querySelector("#author").style.fontStyle = "italic";
          // Setting font to handwriting font for normal quotes
          document.querySelector("#quote").style.fontFamily = "var(--QuoteHandWritingFont)";
        }
      document.querySelector("#author").textContent = `- ${quoteData.a}`;
  } catch (error) {
    console.error("Error fetching the quote:", error);
    document.querySelector("#quote").textContent = "An error occurred, please try again!";
    // Main Font for Error message
    document.querySelector("#quote").style.fontFamily = "var(--mainFontFamily)";
    document.querySelector("#author").textContent = "";
  }
}
// Event listener for button to generate a new quote
document.getElementById("new-quote").addEventListener("click", fetchQuote);


