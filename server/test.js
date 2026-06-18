import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const AI = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

async function test() {
  try {
    const response = await AI.chat.completions.create({
      model: "gemini-2.5-flash",
      messages: [
        {
          role: "user",
          content: "Hello",
        },
      ],
    });

    console.log(JSON.stringify(response, null, 2));
  } catch (err) {
    console.log("STATUS:", err.status);
    console.dir(err, { depth: null });
  }
}

test();
