"use client";
import { useState } from "react";
import { useQuestion } from "./hooks/useQuestion";
import QuestionCard from "./components/QuestionCard";

export default function Home() {
  const { title, text, respostas, perguntando, gerarPergunta, verificar } =
    useQuestion();

  const [questao, setQuestao] = useState("");
  const [tema, setTema] = useState("");
  const [respostaEscolhida, setRespostaEscolhida] = useState(0);

  return (
    <QuestionCard
      title={title}
      text={text}
      respostas={respostas}
      perguntando={perguntando}
      respostaEscolhida={respostaEscolhida}
      setRespostaEscolhida={setRespostaEscolhida}
      setQuestao={setQuestao}
      setTema={setTema}
      onGerar={() => gerarPergunta(questao, tema)}
      onVerificar={() => {
        alert(verificar(respostaEscolhida) ? "Acertou" : "Errou");
      }}
    />
  );
}
