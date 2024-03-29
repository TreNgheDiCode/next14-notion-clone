"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";
import { ImageIcon, X } from "lucide-react";
import { useCoverImage } from "@/hooks/use-cover-image";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useParams } from "next/navigation";
import { useEdgeStore } from "@/lib/edgestore";
import { useState } from "react";
import { Spinner } from "./spinner";
import { Skeleton } from "./ui/skeleton";

interface CoverProps {
  url?: string;
  preview?: boolean;
}

export const Cover = ({ url, preview }: CoverProps) => {
  const [loading, setLoading] = useState(false);
  const { edgestore } = useEdgeStore();
  const params = useParams();
  const coverImage = useCoverImage();
  const removeCoverImage = useMutation(api.documents.removeCoverImage);

  const onRemove = async () => {
    setLoading(true);
    if (url) {
      await edgestore.publicFiles.delete({
        url,
      });
    }
    removeCoverImage({
      id: params.documentId as Id<"documents">,
    });
    setLoading(false);
  };
  return (
    <div
      className={cn(
        "group relative h-[35vh] w-full",
        !url && "h-[12vh]",
        url && "bg-muted",
      )}
    >
      {!!url && <Image src={url} fill alt="cover" className="object-cover" />}
      {url && !preview && (
        <div className="absolute bottom-5 right-5 flex items-center gap-x-2 opacity-0 group-hover:opacity-100">
          <Button
            disabled={loading}
            onClick={() => coverImage.onReplace(url)}
            className="text-xs text-muted-foreground"
            variant={"outline"}
            size={"sm"}
          >
            {loading ? (
              <Spinner size={"icon"} />
            ) : (
              <ImageIcon className="mr-2 h-4 w-4" />
            )}
            Change cover
          </Button>
          <Button
            disabled={loading}
            onClick={onRemove}
            className="text-xs text-muted-foreground"
            variant={"outline"}
            size={"sm"}
          >
            {loading ? (
              <Spinner size={"icon"} />
            ) : (
              <X className="mr-2 h-4 w-4" />
            )}
            Remove
          </Button>
        </div>
      )}
    </div>
  );
};

Cover.Skeleton = function CoverSkeleton() {
  return <Skeleton className="h-[12vh] w-full" />;
};
