import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { createPortfolioAgent } from "./agent/portfolioAgent.js";

// Load env once (sirf yaha)
dotenv.config();
console.log("DEBUG GOOGLE_API_KEY:", process.env.GOOGLE_API_KEY ? "✅ Loaded" : "❌ Missing");

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("DEBUG: GOOGLE_API_KEY =>", process.env.GOOGLE_API_KEY);

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

let executor;

// Agent load karo once
(async () => {
  executor = await createPortfolioAgent();
})();

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// app.post("/api/chat", async (req, res) => {
//   const userInput = req.body.input;
//   console.log("User:", userInput);

//   try {
//     const response = await executor.invoke({ input: userInput });
//     console.log("Agent Response:", response);

//     const data = response.intermediateSteps?.[0]?.observation;
//     if (
//       response.output &&
//       response.output !== "Agent stopped due to max iterations."
//     ) {
//       return res.json({ output: response.output });
//     } else if (data) {
//       return res.json({ output: data });
//     }
//     res.status(500).json({ output: "Mujhe nahi pata." });
//   } catch (err) {
//     console.error("Error:", err);
//     res.status(500).json({ output: "Something went wrong." });
//   }
// });


app.post("/api/chat", async (req, res) => {
  if (!executor) {
    return res.status(503).json({ output: "Agent is still loading, try again later." });
  }

  const userInput = req.body.input;
  try {
    const response = await executor.invoke({ input: userInput });

    const data = response.intermediateSteps?.[0]?.observation;
    if (response.output && response.output !== "Agent stopped due to max iterations.") {
      return res.json({ output: response.output });
    } else if (data) {
      return res.json({ output: data });
    }
    res.status(500).json({ output: "Mujhe nahi pata." });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ output: "Something went wrong." });
  }
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
