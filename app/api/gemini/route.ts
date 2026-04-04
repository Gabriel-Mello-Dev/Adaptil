import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY não definida");
}

const ai = new GoogleGenAI({
  apiKey,
});

export async function POST(request: Request) {
  const body = await request.json();
  const questao = body.questao;
  const tema = body.tema;


  
  const response = await ai.models.generateContent({
    model: "models/gemini-3-flash-preview",
    contents: [
      {
        role: "user",
        parts: [
          {
     text:
`Adapte a questão para o tema: ${tema}.

REGRAS CRÍTICAS:
- NÃO alterar pergunta.
- NÃO alterar alternativas (copiar EXATAMENTE).
- NÃO alterar resposta correta.
- NÃO alterar números ou lógica.
- Apenas adaptar o contexto.

ALTERNATIVAS:
- Copiar exatamente como estão.
- NÃO recalcular ou corrigir.

RESPOSTA CORRETA:
- Identificar qual alternativa já é correta na questão original.
- Retornar o ÍNDICE (base 0).
- NÃO inventar.

FORMATO (uma linha):
titulo # corpo # alt1 § alt2 § alt3 § alt4 # correta:indice

REGRAS:
- NÃO usar quebra de linha
- NÃO adicionar explicações
- EXATAMENTE 3 "#" e 3 "§"

Questão:
${questao}`,
          },
        ],
      },
    ],
  });

  const text =
    response.candidates?.[0]?.content?.parts?.[0]?.text ?? "Sem resposta";

  return Response.json({ text });
}
