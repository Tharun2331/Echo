import Vapi from "@vapi-ai/web";
import { useEffect, useState } from "react";

interface TranscriptMessage {
  role: "user" | "assistant";
  text: string;
}

export const useVapi = () => {
  const [vapi, setVapi] = useState<Vapi | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState<TranscriptMessage[]>([]);

useEffect(() => {
  // Only for testing the Vapi API, otherwise customers will provide their own API keys
  const vapiInstance = new Vapi("6a8a1c52-e2d3-4b78-8165-50839d8706d0");
  setVapi(vapiInstance);

  vapiInstance.on("call-start", () => {
    setIsConnected(true);
    setIsConnecting(false);
    setTranscript([]);
  })

  vapiInstance.on("call-end", () => {
    setIsConnected(false);
    setIsConnecting(false);
    setIsSpeaking(false);
  })

  vapiInstance.on("speech-start", () => {
    setIsSpeaking(true);
  })

  vapiInstance.on("speech-end", () => {
    setIsSpeaking(false);
  })

  vapiInstance.on("error", (error) => {
    console.log(error, "VAPI_ERROR");
    setIsConnecting(false);
  })

  vapiInstance.on("message", (message) => {
      if(message.type === "transcript" && message.transcriptType === "final") {
        setTranscript((prev) => [
          ...prev,
          {
            role: message.role === "user" ? "user": "assistant",
            text: message.transcript
          }
        ])
      }
  })

  return () => {
    vapiInstance?.stop();
  }

},[])

const startCall = () => {
  setIsConnecting(true)

  if(vapi) {
    // Only for testing the Vapi API, otherwise customers will provide their own Assistant IDs
    vapi.start("9f22cb15-fee3-470b-b353-68d426658937");
  }

}

const endCall = () => {
  if(vapi) {
    vapi.stop();
  }
}

return  {
  isSpeaking,
  isConnected,
  isConnecting,
  transcript,
  startCall,
  endCall
}

}

