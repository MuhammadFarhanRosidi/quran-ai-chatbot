const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

// ...

const gemini = async (verse) => {
  // Access your API key as an environment variable (see "Set up your API key" above)
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);

  // The Gemini 1.5 models are versatile and work with most use cases
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
  console.log(verse, "<<<<<< iki verse");
  const prompt = `Jelaskan ${verse} dan apa kolerasinya dengan kehidupan manusia, jangan gunakan poin, namun langsung kesimpulannya saja.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  let text = response.text();
  console.log(text);
  // text = JSON.parse(text.trim());
  return text;
};

module.exports = gemini;
