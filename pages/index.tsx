// pages/index.tsx
import { GetServerSideProps } from "next";
import { ImageGallery } from "../components/ImageGallery";

interface UnsplashImage {
  id: string;
  alt_description: string;
  urls: { small: string; regular: string };
  user: { name: string };
  description?: string;
  tags?: { title: string }[];
}

interface HomePageProps {
  images: UnsplashImage[];
}

export default function HomePage({ images }: HomePageProps) {
  return (
    <main className="min-h-screen bg-gray-100">
      <h1 className="text-center text-3xl font-bold py-6">The Interactive Gallery</h1>
      <ImageGallery images={images} />
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(
    `https://api.unsplash.com/photos?client_id=${process.env.UNSPLASH_ACCESS_KEY}&per_page=12`
  );
  const images = await res.json();

  return {
    props: { images },
  };
};
