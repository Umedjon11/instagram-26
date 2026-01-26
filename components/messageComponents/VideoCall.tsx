"use client";
import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import { Mic, Video, Phone, MonitorUp, User } from "lucide-react";

interface VideoCallProps {
  openVideoCall: boolean;
  setOpenVideoCall: (open: boolean) => void;
  activeChat: any;
}

const VideoCall: React.FC<VideoCallProps> = ({
  openVideoCall,
  setOpenVideoCall,
  activeChat,
}) => {
  const webcamRef = useRef<Webcam>(null);
  const [cameraOn, setCameraOn] = useState(true);
  const [micMuted, setMicMuted] = useState(false);
  const [isSwapped, setIsSwapped] = useState(false);

  if (!openVideoCall) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center p-4">
      <div className="w-full flex justify-between items-center mb-4">
        <h2 className="text-white text-xl font-semibold">
          {activeChat?.receiveUserName || "Video Call"}
        </h2>
      </div>

      <div className="flex-1 w-full flex gap-4 md:flex-row max-h-[80vh]">
        {isSwapped ? (
          <>
            <div className="flex-1 rounded-2xl overflow-hidden relative bg-gray-800 max-h-[70vh]">
              {cameraOn ? (
                <Webcam
                  audio
                  ref={webcamRef}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-700 text-gray-300">
                  Camera Off
                </div>
              )}
              <span className="absolute bottom-1 left-1 text-white text-xs">
                You
              </span>
            </div>
            <div className="w-40 h-40 rounded-2xl overflow-hidden flex items-center justify-center bg-gray-900 self-end md:self-start">
              <video
                className="w-full h-full object-cover"
                autoPlay
                playsInline
                muted
                src=""
              />
              {!activeChat?.receiveUserName && (
                <span className="absolute text-gray-400">No video</span>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="flex-1 rounded-2xl overflow-hidden flex items-center justify-center bg-gray-900 max-h-[70vh]">
              <div className="flex ml-150">
                <div className="bg-gray-700 p-4 rounded-[100%]"> 
                    <User size={60} color="white" />
                </div>
              </div>
              <video
                className="w-full h-full object-cover"
                autoPlay
                playsInline
                muted
                src=""
              />
              {!activeChat?.receiveUserName && (
                <span className="absolute text-gray-400">No video</span>
              )}
            </div>
            <div className="w-40 h-40 rounded-2xl overflow-hidden relative bg-gray-800 self-end md:self-start">
              {cameraOn ? (
                <Webcam
                  audio
                  ref={webcamRef}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-700 text-gray-300">
                  Camera Off
                </div>
              )}
              <span className="absolute bottom-1 left-1 text-white text-xs">
                You
              </span>
            </div>
          </>
        )}
      </div>
      <div className="mt-4 flex gap-6">
        <button
          onClick={() => setMicMuted(!micMuted)}
          className={`w-14 h-14 rounded-full flex items-center justify-center ${
            micMuted ? "bg-red-600" : "bg-gray-700"
          } hover:bg-gray-600 transition`}
        >
          <Mic className="text-white" />
        </button>

        <button
          onClick={() => setCameraOn(!cameraOn)}
          className={`w-14 h-14 rounded-full flex items-center justify-center ${
            cameraOn ? "bg-gray-700" : "bg-red-600"
          } hover:bg-gray-600 transition`}
        >
          <Video className="text-white" />
        </button>

        <button
          onClick={() => setOpenVideoCall(false)}
          className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center hover:bg-red-500 transition"
        >
          <Phone className="text-white rotate-[135deg]" />
        </button>

        <button
          onClick={() => setIsSwapped(!isSwapped)}
          className="w-14 h-14 rounded-full bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition"
          title="Swap videos"
        >
          <MonitorUp className="text-white" />
        </button>
      </div>
    </div>
  );
};

export default VideoCall;
