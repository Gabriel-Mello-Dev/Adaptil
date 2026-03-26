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
    <div className="bg-gray-600 h-[120vh]">
      <h1 className="text-[3rem] text-white">Adaptil</h1>
      <img
        className="h-30"
        src="https://images.vexels.com/media/users/3/251466/isolated/preview/fafde6dbfc92729d7f41feea95134849-chameleonhandraw-0.png"
        alt=""
      />
      <p  className="text-white">Pergunta</p>
      <input
        type="text"
        className="border-white border rounded-md bg-white text-black"
        onChange={(e) => setQuestao(e.target.value)}
      />
      <br />
      <br />
      <p className="text-white">Tema</p>
      <input
        type="text"
        className="border-white border rounded-md bg-white text-black"
        onChange={(e) => setTema(e.target.value)}
      />

      <br />
      <br />

{perguntando ? (
  <p className="text-pink-600">Pergunta sendo feita...</p>
) : (
  <button
    onClick={main}
    className="cursor-crosshair bg-green-300 rounded-md hover:bg-blue-400"
  >
    Perguntar
  </button>
)}

     
      <hr />
      <br />
      <br />
      <h1 className="text-4xl text-red-600"> {title}</h1>
      <br />
      <h2 className="text-2xl text-green-600"> {text}</h2>
      <br />
<div className="text-teal-500">
  {respostas.map((resp, i) => (
    <button
      key={i}
      onClick={() => setRespostaEscolhida(i)}
      className={`block w-full text-left p-2 rounded-md mb-2 
        ${respostaEscolhida === i ? "bg-blue-400" : "bg-gray-200"}
      `}
    >
      {resp}
    </button>
  ))}
</div>

<button onClick={(e)=>verificarResposta(respostaEscolhida, correta)}>Responder</button>
</div>
  );
}
