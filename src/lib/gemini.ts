import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY || "";
const ai = new GoogleGenAI({ apiKey });

export async function callGemini(
  prompt: string,
  retries = 5,
  delay = 1000,
): Promise<string | undefined> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    if (retries > 0) {
      await new Promise((res) => setTimeout(res, delay));
      return callGemini(prompt, retries - 1, delay * 2);
    }
    throw error;
  }
}
