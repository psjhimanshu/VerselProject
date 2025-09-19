// import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
// import { AgentExecutor, createToolCallingAgent } from "langchain/agents";
// import { DynamicStructuredTool } from "@langchain/core/tools";
// import { ChatPromptTemplate } from "@langchain/core/prompts";
// import { z } from "zod";
// import dotenv from "dotenv";



// dotenv.config();

// const model = new ChatGoogleGenerativeAI({
//    model:"models/gemini-2.5-flash",
//     maxOutputTokens:2048,
//     temperature:0.7,
//     apiKey:process.env.GOOGLE_API_KEY,
// });

// // Tool: Portfolio Info
// const getPortfolioInfo = new DynamicStructuredTool({
//   name: "getPortfolioInfo",
//   description: "Return portfolio info such as skills, projects, or contact details",
//   schema: z.object({
//     query: z.string().describe("type of info user wants: skills, projects, contact"),
//   }),
//   func: async ({ query }) => {
//     const portfolio = {
//       skills: "Java, Python, Flutter, Spring Boot, Data Science, Android, JavaScript",
//       projects:
//         "Spotify Clone (Flutter + GetX), Green Bharat App, Spring Boot API, Invoice Generator",
//       contact:
//         "Email: crackerhimansh@gmail.com, LinkedIn: linkedin.com/in/himanshu, GitHub: github.com/himanshu",
//     };
//     return portfolio[query.toLowerCase()] || "Sorry, I don't have info for that.";
//   },
// });

// const prompt = ChatPromptTemplate.fromMessages([
//   ["system", "You are Himanshu’s AI portfolio assistant. Use tools if needed."],
//   ["human", "{input}"],
//   ["ai", "{agent_scratchpad}"],
// ]);

// export const createPortfolioAgent = async () => {
//   const agent = await createToolCallingAgent({
//     llm: model,
//     tools: [getPortfolioInfo],
//     prompt,
//   });

//   const executor = await AgentExecutor.fromAgentAndTools({
//     agent,
//     tools: [getPortfolioInfo],
//     verbose: true,
//     maxIterations: 3,
//     returnIntermediateSteps: true,
//   });

//   return executor;
// };




import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { AgentExecutor, createToolCallingAgent } from "langchain/agents";
import { DynamicStructuredTool } from "@langchain/core/tools";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { z } from "zod";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

// Load portfolio.json
const portfolioPath = path.join(process.cwd(), "data", "portfolio.json");
const portfolioData = JSON.parse(fs.readFileSync(portfolioPath, "utf-8"));

const model = new ChatGoogleGenerativeAI({
  model: "models/gemini-2.5-flash",
  maxOutputTokens: 2048,
  temperature: 0.7,
  apiKey: process.env.GOOGLE_API_KEY,
});

// Tool: Portfolio Info
const getPortfolioInfo = new DynamicStructuredTool({
  name: "getPortfolioInfo",
  description: "Return portfolio info such as skills, projects, experience or contact details",
  schema: z.object({
    query: z
      .string()
      .describe("type of info user wants: skills, projects, experience or contact"),
  }),
  func: async ({ query }) => {
    const key = query.toLowerCase();
    return portfolioData[key] || "Sorry, I don't have info for that.";
  },
});

const prompt = ChatPromptTemplate.fromMessages([
  ["system", "You are Himanshu’s AI portfolio assistant. Use tools if needed."],
  ["human", "{input}"],
  ["ai", "{agent_scratchpad}"],
]);

export const createPortfolioAgent = async () => {
  const agent = await createToolCallingAgent({
    llm: model,
    tools: [getPortfolioInfo],
    prompt,
  });

  const executor = await AgentExecutor.fromAgentAndTools({
    agent,
    tools: [getPortfolioInfo],
    verbose: true,
    maxIterations: 3,
    returnIntermediateSteps: true,
  });

  return executor;
};
