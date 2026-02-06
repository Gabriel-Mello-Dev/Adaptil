import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: "AIzaSyAOmElCAw6eqhEu5oYmOEE1YQBqEJq5c7g",
});

export async function POST(request: { json: () => any; }) {
  const body = await request.json();
  const questao = body.questao;
  const tema = body.tema;
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents:
      "Adapte a questão para o tema:" + tema + ",alem disto somente responda com o titulo, o corpo do texto, e as alternativas, cada parte deve ser separado por uma #: " + questao,
  });

  return Response.json({ text: response.text });
}
