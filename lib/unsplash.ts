
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

export const fetchImages = async (page: number) => {
  const res = await fetch(
    `https://api.unsplash.com/photos?page=${page}&client_id=${UNSPLASH_ACCESS_KEY}`
  );
  return res.json();
};

export const fetchImageById = async (id: string) => {
  const res = await fetch(
    `https://api.unsplash.com/photos/${id}?client_id=${UNSPLASH_ACCESS_KEY}`
  );
  return res.json();
};
