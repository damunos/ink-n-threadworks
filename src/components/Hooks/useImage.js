import { useEffect, useState } from "react";

export default function useImage(url) {
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (!url) return;

    const img = new window.Image();
    img.crossOrigin = "anonymous"; // To avoid CORS issues
    img.src = url;
    img.onload = () => setImage(img);

    return () => {
      setImage(null);
    };
  }, [url]);

  return [image];
}
