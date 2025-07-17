'use client';
import { useRef, useEffect, useState } from 'react';
import { FaVolumeUp } from 'react-icons/fa';

export default function EngineSoundButton() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      audioRef.current = new Audio('/sounds/ae86-loop.wav');
      audioRef.current.loop = true;
      audioRef.current.volume = 0.6;
      setReady(true);
    }
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };

  if (!ready) return null;

  return (
    <button
      onClick={togglePlay}
      className="fixed bottom-6 right-6 z-50 p-3 bg-black/70 text-white rounded-full shadow-lg hover:bg-blue-700 transition"
      title="引擎声播放/暂停"
    >
      <FaVolumeUp className="w-5 h-5" />
    </button>
  );
}
