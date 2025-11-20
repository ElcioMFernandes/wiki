"use client";

import { confirmVideo } from "@/actions/videos";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ConfirmVideoButtonProps {
  videoId: number;
}

export function ConfirmVideoButton({ videoId }: ConfirmVideoButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    try {
      setIsLoading(true);
      await confirmVideo(videoId);
      toast.success("Vídeo publicado com sucesso!");
    } catch (error) {
      toast.error("Erro ao publicar Vídeo");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="default"
      size="icon"
      onClick={handleConfirm}
      disabled={isLoading}
      className="bg-green-600 hover:bg-green-700"
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <CheckCircle2 className="h-4 w-4" />
      )}
    </Button>
  );
}
