'use client'
// GOOGLE LANG PWEDE RN
import runChat from '@/app/config/gemini'
import { FaArrowLeft } from 'react-icons/fa'
import { GoCopilot } from "react-icons/go";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaMicrophone } from "react-icons/fa";

declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}

const AiPage = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [chatHistory, setChatHistory] = useState<{ type: 'user' | 'ai'; message: string }[]>([]);

  const recognitionRef = useRef<any>(null);

  const startRecording = () => {
    setIsRecording(true);
    recognitionRef.current = new window.webkitSpeechRecognition();
    recognitionRef.current.continuous = false; // Stop recording when the user releases the button
    recognitionRef.current.interimResults = true;

    recognitionRef.current.onresult = (event: any) => {
      const interimTranscript = event.results[event.results.length - 1][0].transcript;
      setTranscript(interimTranscript);
    };

    recognitionRef.current.start();
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      onSent(transcript);
    }
  };

  const router = useRouter();

  const onSent = async (finalTranscript: string) => {
    // CATCH ERROR WHEN STRING IS 0
    if (!finalTranscript.trim()) return; 

    setChatHistory((prev) => [...prev, { type: 'user', message: finalTranscript }]);
    setTranscript(''); 

    try {
      const response = await runChat(finalTranscript);
      setChatHistory((prev) => [...prev, { type: 'ai', message: response }]);
    } catch (error) {
      console.error("Error communicating with the API:", error);
    }
  };

  return (
    // CHANGE A LOT OF NAMES HERE
    <main className="h-[100vh] overflow-y-hidden bg-background">
      <nav className='flex items-center justify-between bg-card px-5 py-4 mb-0 drop-shadow-md sticky top-0 z-10'>
        <button type='button' onClick={() => router.back()} className="">
          <FaArrowLeft className='text-lg' />
        </button>
        <span className="flex items-center justify-center gap-3 mx-auto">
          <GoCopilot className="text-2xl" />
          <h1 className="font-light text-white text-lg">wawawawaawaaawaw</h1>
        </span>
      </nav>
      {/* IDK HOW BUT THIS WORKS */}
      <section className="h-screen bg-background px-5 py-3 items-center justify-center">
  <section className="w-full h-[calc(84vh-5rem)] overflow-y-scroll">
    {/* CHAT HISTORY UPDATE PFPS*/}
    {/* INSTALL DAISY UI WHEN MAY STORAGE */}
    {chatHistory.map((chat, index) => (
      <div key={index} className={`chat ${chat.type === 'user' ? 'chat-start' : 'chat-end'} flex items-start pb-3 gap-10 text-white text-xl `}>
          <div className="w-[2.5rem] rounded-full">
            <img src={chat.type === 'user' ? "/USER.jpg" : '' }  className='h-[2rem] w-[5rem] object-cover rounded-full '/>
          </div>
        <p className="chat-bubble mr-3" dangerouslySetInnerHTML={{ __html: chat.message }}></p>
      </div>
    ))}
  </section>

  <footer className="fixed bottom-0 left-0 right-0 bg-none">
    <div className='flex p-3 items-center justify-between bg-card shadow-md rounded-lg mx-3 h-full'>
      <article className='flex-1 overflow-y-auto'>
        <div className="flex items-center w-full">
          <button
            onMouseDown={startRecording} 
            onMouseUp={stopRecording}   
            className="mt-10 m-auto flex items-center justify-center bg-green-400 hover:bg-green-500 rounded-full w-20 h-20 focus:outline-none"
          >
            <FaMicrophone className="text-4xl text-white" />
          </button>
        </div>
        <textarea
          value={transcript}
          placeholder="Listening"
          className='p-1 w-full bg-background focus:outline-none focus:border-none resize-none text-white'
          readOnly
        />
      </article>
    </div>
  </footer>
</section>
    </main>
  );
}

export default AiPage;
