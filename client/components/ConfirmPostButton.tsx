"use client";

import { confirmPost } from "@/actions/posts";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ConfirmPostButtonProps {
  postId: number;
}

export function ConfirmPostButton({ postId }: ConfirmPostButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    try {
      setIsLoading(true);
      await confirmPost(postId);
      toast.success("Post publicado com sucesso!");
    } catch (error) {
      toast.error("Erro ao publicar post");
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