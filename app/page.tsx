"use client";
import { use, useState } from "react";

export default function Home() {
  const [inteira, setInteira] = useState([]);
  const [title, setTitle] = useState("titulo");
  const [text, setText] = useState("corpo da pergunta");
const [respostas, setRespostas] = useState([]);
  const [questao, setQuestao] = useState("");
  const [tema, setTema] = useState("");
  const [perguntando, setPerguntando]= useState(false);
 const [respostaEscolhida,setRespostaEscolhida]= useState(0)
 const [correta, setCorreta]= useState(0);
  async function main() {
    
    try{ 
      setPerguntando(true);
    console.log("função sendo feita");
    const res = await fetch("/api/gemini", {
      method: "POST",
      body: JSON.stringify({
        questao: questao,
        tema: tema,
      }),
    });

  
    if (!res.ok) {
      const erro = await res.text();
      console.log("erro api:", erro);
      return;
    }

    const data = await res.json();
const partes = data.text.split("#");

const titulo = partes[0]?.trim();
const corpo = partes[1]?.trim();
const alternativas = partes[2]?.split("§").map((a: string) => a.trim());

setTitle(titulo);
setText(corpo);
setRespostas(alternativas);
setInteira(partes);
setCorreta(Number(partes[3].replace("correta:", "").trim()));

if (correta < 0 || correta >= alternativas.length) {
  console.log("Resposta inválida, retry...");
  return main();
}

  }finally {
    setPerguntando(false);
  }
  }

function verificarResposta(escolhida: Number, correta: Number) {

if (escolhida===correta){

  alert("Acertou");
}else{

  alert("Errou")
}

  return escolhida === correta;

}

  return (
   <div className="min-h-screen bg-gradient-to-br from-[#0f0f1a] via-[#1a0f2e] to-[#2a0f3a] flex flex-col items-center p-6">

  {/* Header */}
  <div className="w-full max-w-2xl mb-6 text-center">
    <h1 className="text-4xl font-bold text-purple-400">Adaptil</h1>
    <p className="text-gray-400 mt-2">Adaptador inteligente de questões</p>
  </div>

  {/* Card principal */}
  <div className="w-full max-w-2xl bg-[#1c1c2b] rounded-2xl shadow-lg p-6 border border-purple-900">

    {/* Inputs */}
    <div className="space-y-4">
      
      <div>
        <label className="block text-sm text-gray-400 mb-1">
          Pergunta base
        </label>
        <input
          type="text"
          className="w-full p-3 rounded-lg bg-[#0f0f1a] border border-purple-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
          onChange={(e) => setQuestao(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm text-gray-400 mb-1">
          Tema
        </label>
        <input
          type="text"
          className="w-full p-3 rounded-lg bg-[#0f0f1a] border border-purple-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
          onChange={(e) => setTema(e.target.value)}
        />
      </div>

      <button
        onClick={main}
        className="w-full py-3 rounded-lg bg-purple-700 hover:bg-purple-600 transition text-white font-semibold"
      >
        {perguntando ? "Gerando pergunta..." : "Gerar pergunta"}
      </button>
    </div>

    {/* Pergunta */}
    <div className="mt-8">
      <h2 className="text-2xl font-semibold text-purple-300">
        {title}
      </h2>

      <p className="text-gray-300 mt-3">
        {text}
      </p>
    </div>

    {/* Respostas */}
    <div className="mt-6 space-y-3">
      {respostas.map((resp, i) => (
        <button
          key={i}
          onClick={() => setRespostaEscolhida(i)}
          className={`w-full text-left p-3 rounded-lg border transition
          ${
            respostaEscolhida === i
              ? "bg-purple-700 border-purple-500 text-white"
              : "bg-[#0f0f1a] border-gray-700 text-gray-300 hover:border-purple-500"
          }`}
        >
          {resp}
        </button>
      ))}
    </div>

    {/* Ação */}
    <button
      onClick={() => verificarResposta(respostaEscolhida, correta)}
      className="w-full mt-6 py-3 rounded-lg bg-green-600 hover:bg-green-500 transition text-white font-semibold"
    >
      Verificar resposta
    </button>

  </div>
</div>
  );
}
