"use client";
import { Music, Pause, Play, SkipBack, SkipForward } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

interface AudioPlayerProps {
  src: string;
  title?: string;
  artist?: string;
  cover?: string; // URL da imagem
}

export default function AudioPlayer({
  src,
  title = "Título da música",
  artist = "Artista",
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const togglePlay = async () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (err) {
        console.error("Erro ao tocar áudio:", err);
      }
    }
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const { currentTime, duration } = audioRef.current;
    if (!duration) return;
    setProgress((currentTime / duration) * 100);
  };

  return (
    <div className="w-full max-w-lg  text-white p-5 rounded-xl shadow-xl space-y-4 border">
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />

      {/* CAPA DO ÁLBUM */}
      <div className="w-full flex justify-center">
        <Music size={150} className="text-green-600" />
      </div>

      {/* TEXTO */}
      <div className="text-center ">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-sm text-gray-400">{artist}</p>
      </div>

      {/* CONTROLES */}
      <div className="flex items-center justify-center gap-6 mt-3">
        <button className="text-gray-400 hover:text-green-600 transition">
          <SkipBack size={28} />
        </button>

        <button
          onClick={togglePlay}
          className="bg-white text-green-600 w-14 h-14 rounded-full flex items-center justify-center hover:scale-105 transition"
        >
          {isPlaying ? <Pause size={32} /> : <Play size={32} />}
        </button>

        <button className="text-gray-400 hover:text-green-600 transition">
          <SkipForward size={28} />
        </button>
      </div>

      {/* BARRA DE PROGRESSO */}
      <div className="w-full bg-neutral-700 h-2 rounded-full overflow-hidden">
        <div
          className="h-full bg-green-600 transition-all duration-200"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
