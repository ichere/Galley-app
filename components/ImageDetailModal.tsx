// components/ImageDetailModal.tsx
import Image from "next/image";
import { useEffect } from "react";
import { CommentSection } from "./CommentSection";
import { LikeButton } from "./LikeButton";

interface ImageDetailModalProps {
  image: {
    id: string;
    urls: { regular: string };
    alt_description: string;
    user: { name: string };
    description?: string;
    tags?: { title: string }[];
  };
  onClose: () => void;
}

export const ImageDetailModal = ({ image, onClose }: ImageDetailModalProps) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-white max-w-3xl w-full rounded-lg p-6 relative overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-2xl font-bold text-gray-700 hover:text-red-500"
        >
          &times;
        </button>

        <Image
          src={image.urls.regular}
          alt={image.alt_description || "Unsplash image"}
          width={600}
          height={400}
          className="rounded-md mx-auto mb-4"
        />

        <h2 className="text-2xl font-bold mb-1">{image.alt_description || "Untitled"}</h2>
        <p className="text-gray-600 mb-2">By: {image.user.name}</p>

        {image.description && (
          <p className="text-gray-700 mb-4">{image.description}</p>
        )}

        {image.tags && image.tags.length > 0 && (
          <div className="mb-4">
            <strong>Tags:</strong>{" "}
            {image.tags.map((tag, i) => (
              <span
                key={i}
                className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-2 mb-1"
              >
                #{tag.title}
              </span>
            ))}
          </div>
        )}

        {/* Likes */}
        <div className="mb-6">
          <LikeButton imageId={image.id} />
        </div>

        {/* Comments */}
        <CommentSection imageId={image.id} />
      </div>
    </div>
  );
};
