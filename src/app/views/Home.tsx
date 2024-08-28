"use client";
// API 1 - GOOGLE SPEECH RECOGNITION
//  

import { useEffect, useState, useRef } from "react";
import { FaMicrophone, FaPause } from "react-icons/fa";

declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}

export default function MicrophoneComponent() {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingComplete, setRecordingComplete] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [fullTranscript, setFullTranscript] = useState<string[]>([]);

  const recognitionRef = useRef<any>(null);

  const startRecording = () => {
    setIsRecording(true);
    recognitionRef.current = new window.webkitSpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;

    recognitionRef.current.onresult = (event: any) => {
      const { transcript } = event.results[event.results.length - 1][0];

      console.log(event.results);
      setTranscript(transcript);
    };

    recognitionRef.current.start();
  };

  const stopRecording = () => {
    setIsRecording(false);
    setRecordingComplete(true);
    recognitionRef.current.stop();
    handleNewRecording(transcript);
    setTranscript('');
  };

  const handleNewRecording = (newText: string) => {
    setFullTranscript((prevTranscript) => [...prevTranscript, newText]);
  };

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  return (
    <main className="w-1/4 m-auto rounded-md border p-4 bg-white">
      <div className="flex-1 flex w-full justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium leading-none">
            {recordingComplete ? "Recorded" : "Recording"}
          </p>
          <p className="text-sm text-muted-foreground">
            {recordingComplete ? "Lis." : "Start speaking..."}
          </p>
        </div>
        {isRecording && (
          <div className="rounded-full w-4 h-4 bg-red-400 animate-pulse" />
        )}
      </div>

       {/* Current Transcript */}
       {transcript && (
        <div className="border rounded-md p-2 h-[10rem] w-auto mt-4">
          <p className="mb-0">{transcript}</p>
        </div>
      )}

      {/* Full Transcript */}
      <section className="h-[10rem] overflow-y-auto mt-4">
        {fullTranscript.map((text, index) => (
          <p key={index}>{text}</p>
        ))}
      </section>

      <div className="flex items-center w-full">
        {isRecording ? (
          // Button for stopping recording
          <button
            onClick={stopRecording}
            className="mt-10 m-auto flex items-center justify-center bg-red-400 hover:bg-red-500 rounded-full w-20 h-20 focus:outline-none"
          >
            <FaPause className="text-4xl text-white" />
          </button>
        ) : (
          // Button for starting recording
          <button
            onClick={startRecording}
            className="mt-10 m-auto flex items-center justify-center bg-green-400 hover:bg-green-500 rounded-full w-20 h-20 focus:outline-none"
          >
            <FaMicrophone className="text-4xl text-white" />
          </button>
        )}
      </div>
    </main>
  );
}