// import Image from "next/image";
// import { useState } from "react";
// import { ImageDetailModal } from "./ImageDetailModal";

// interface ImageItem {
//   id: string;
//   alt_description: string;
//   urls: { small: string; regular: string };
//   user: { name: string };
//   description?: string;
//   tags?: { title: string }[];
// }

// interface ImageGalleryProps {
//   initialImages?: ImageItem[];
// }

// export const ImageGallery = ({ initialImages = [] }: ImageGalleryProps) => {
//   const [images, setImages] = useState<ImageItem[]>(initialImages);
//   const [page, setPage] = useState(1);
//   const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | undefined>(undefined);

//   const fetchMoreImages = async () => {
//     setLoading(true);
//     setError("");
//     try {
//       const res = await fetch(
//         `https://api.unsplash.com/photos?page=${page + 1}&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`
//       );
//       const newImages = await res.json();
  
//       if (Array.isArray(newImages)) {
//         setImages((prev) => [...prev, ...newImages]);
//         setPage((prev) => prev + 1);
//       } else {
//         console.error("Unexpected response from Unsplash:", newImages);
//         setError("Unexpected response from Unsplash API.");
//       }
//     } catch (error) {
//       console.error("Failed to fetch images", error);
//       setError("Failed to load images. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };
  

//   return (
//     <div className="p-4">
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//         {images.map((image) => (
//           <div
//             key={image.id}
//             onClick={() => setSelectedImage(image)}
//             className="cursor-pointer hover:scale-105 transition"
//           >
//             <Image
//               src={image.urls.small}
//               alt={image.alt_description || "Image"}
//               width={300}
//               height={200}
//               className="rounded shadow"
//             />
//             <p className="text-sm mt-1 text-gray-700 truncate">{image.user.name}</p>
//           </div>
//         ))}
//       </div>

//       <div className="flex justify-center mt-6">
//         <button
//           onClick={fetchMoreImages}
//           className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//           disabled={loading}
//         >
//           {loading ? "Loading..." : "Load More"}
//         </button>
//       </div>

//       {selectedImage && (
//         <ImageDetailModal
//           image={selectedImage}
//           onClose={() => setSelectedImage(null)}
//         />
//       )}
//     </div>
//   );
// };

"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ImageDetailModal } from "./ImageDetailModal";

interface ImageItem {
  id: string;
  alt_description: string;
  urls: { small: string; regular: string };
  user: { name: string };
  description?: string;
  tags?: { title: string }[];
}

interface ImageGalleryProps {
  initialImages?: ImageItem[];
}

export const ImageGallery = ({ initialImages = [] }: ImageGalleryProps) => {
  const [images, setImages] = useState<ImageItem[]>(initialImages);
  const [page, setPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const loaderRef = useRef<HTMLDivElement>(null);

  const fetchMoreImages = async () => {
    if (loading) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `https://api.unsplash.com/photos?page=${page + 1}&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`
      );
      const newImages = await res.json();

      if (Array.isArray(newImages)) {
        setImages((prev) => [...prev, ...newImages]);
        setPage((prev) => prev + 1);
      } else {
        setError("Unexpected response from Unsplash.");
      }
    } catch (err) {
      setError("Failed to fetch images.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchMoreImages();
        }
      },
      { threshold: 1.0 }
    );

    const currentLoader = loaderRef.current;
    if (currentLoader) observer.observe(currentLoader);

    return () => {
      if (currentLoader) observer.unobserve(currentLoader);
    };
  }, [loaderRef.current]);

  return (
    <div className="p-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {images.map((image) => (
          <div
            key={image.id}
            onClick={() => setSelectedImage(image)}
            className="cursor-pointer hover:scale-105 transition"
          >
            <Image
              src={image.urls.small}
              alt={image.alt_description || "Image"}
              width={300}
              height={200}
              className="rounded shadow"
            />
            <p className="text-sm mt-1 text-gray-700 truncate">
              {image.user.name}
            </p>
          </div>
        ))}
      </div>

      {error && <p className="text-center text-red-500 mt-4">{error}</p>}

      <div ref={loaderRef} className="h-16 flex justify-center items-center mt-4">
        {loading && <p className="text-blue-500">Loading more...</p>}
      </div>

      {selectedImage && (
        <ImageDetailModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
};
